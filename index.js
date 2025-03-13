console.time('STT.');
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const redis = require("./redisConfig");
const axios = require("axios");
const path = require("path");

require("dotenv").config();

// Configuração do servidor Express
const app = express();
app.use(express.json()); // Middleware para processar JSON no corpo das requisições
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permite todas as origens (ajuste para produção)
    methods: ["GET", "POST"],
  },
});

// # Script de testes do webhook
app.use("/test", express.static(path.join(__dirname, "./test")));

// Serve os arquivos estáticos do diretório dist
app.use(express.static(path.join(__dirname, "./dist")));
// Rota para capturar qualquer UUID e redirecionar para index.html


app.get("/:uuid([a-f0-9-]{36})", (req, res, next) => {
  const requestedPath = req.path;

  // Verifica se o path solicitado aponta para um arquivo estático (com extensão)
  const isStaticResource = path.extname(requestedPath);
  if (isStaticResource) {
    return next(); // Deixa o middleware de arquivos estáticos lidar com o recurso
  }

  // Caso contrário, redireciona para index.html
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Porta do servidor
const PORT = 4000;

// Rota para teste
app.get("/", (req, res) => {
  res.send("Online");
});

// rota /scripts que carrega o index que está dentro de /scripts
app.get("/scripts", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});


// --------------------------------------------------------------------------
// Recebe o evento para enviar mensagens para o widget
// --------------------------------------------------------------------------

// Rota para receber mensagens do webhook
app.post("/webhook/sendMessage", async (req, res) => {

  try {
    const { message } = req.body;

    if (!message.external_id || !message.robot_id) {
      return res.status(400).json({ error: "external_id e message são obrigatórios" });
    }

    // Chave no Redis para armazenar sessões do usuário
    const redisKey = `wbuy_ai:widget:robots:${message.robot_id}:users:${message.external_id}`;
    const socketIds = await redis.smembers(redisKey);

    if (!socketIds || socketIds.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado ou desconectado" });
    }

    // Envia a mensagem para todas as conexões do usuário
    socketIds.forEach((socketId) => {
      io.to(socketId).emit("receiveMessage", message);
    });


    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// --------------------------------------------------------------------------
// Recebe o evento de typing
// --------------------------------------------------------------------------

app.post("/webhook/typing", async (req, res) => {
  try {
    const { external_id, robot_id, isTyping } = req.body;

    // Validação dos campos obrigatórios
    if (!external_id) {
      return res.status(400).json({ error: "external_id é obrigatório" });
    }

    if (typeof isTyping !== 'boolean') {
      return res.status(400).json({ error: "isTyping deve ser um valor booleano" });
    }

    if (!robot_id) {
      return res.status(400).json({ error: "robot_id é obrigatório" });
    }

    // Chave no Redis para armazenar sessões do usuário
    const redisKey = `wbuy_ai:widget:robots:${robot_id}:users:${external_id}`;
    const socketIds = await redis.smembers(redisKey);

    if (!socketIds || socketIds.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado ou desconectado" });
    }

    // Emite o evento 'typing' para todas as conexões do usuário
    socketIds.forEach((socketId) => {
      io.to(socketId).emit("typing", { isTyping });
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no webhook de typing:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// --------------------------------------------------------------------------


io.on("connection", async (socket) => {
  try {
    const { wbuy_ai_id: wbuy_aiId, user_id: userId, params } = socket.handshake.query;

    if (!wbuy_aiId || !userId) {
      console.log("Conexão recusada: faltando wbuy_ai_id ou user_id.");
      socket.disconnect();
      return;
    }

    console.log(`Novo cliente conectado - wbuy_ai ID: ${wbuy_aiId}, User ID: ${userId}`);

    // Verifica se o wbuy_ai_id existe no Redis
    const robotDataKey = `wbuy_ai:agents:${wbuy_aiId}:data`;
    if (!await redis.exists(robotDataKey)) {
      console.log(`wbuy_ai ID ${wbuy_aiId} não encontrado no Redis.`);
      socket.emit("notFound", { message: "wbuy_ai ID não encontrado" });
      socket.disconnect();
      return;
    }

    // Decodifica `params` se for uma string JSON válida
    let parsedParams = {};
    if (params && typeof params === "string") {
      try {
        parsedParams = JSON.parse(params);
      } catch (error) {
        console.error("Erro ao parsear params:", error);
      }
    }


    // Salva a sessão do usuário no Redis
    const redisKey = `wbuy_ai:widget:robots:${wbuy_aiId}:users:${userId}`;
    await redis.sadd(redisKey, socket.id);
    console.log(`Sessão ${socket.id} salva para o usuário ${userId}`);

    // Evento para envio de mensagens
    socket.on("sendMessage", async (message) => {
      try {
        const payload = { external_id: userId, wbuy_ai_id: wbuy_aiId, message };
        await axios.post(process.env.wbuy_ai_WEBHOOK_URL, payload);
      } catch (error) {
        console.error("Erro ao enviar mensagem para o webhook:", error);
      }
    });

    // Evento de desconexão
    socket.on("disconnect", async () => {
      try {
        await redis.srem(redisKey, socket.id);
        console.log(`Sessão ${socket.id} removida para o usuário ${userId}`);
      } catch (error) {
        console.error("Erro ao remover sessão do Redis:", error);
      }
    });

  } catch (error) {
    console.error("Erro na conexão WebSocket:", error);
  }
});



server.listen(process.env.APP_PORT, () => {
  console.log('------------------------------');
  console.log(`${process.env.APP_NAME} v.${process.env.APP_VERSION}`);
  console.log(`URL.: ${process.env.APP_HOST}:${process.env.APP_PORT}`);
  console.log(`PID.: ${process.pid} is running`);
  console.log(`MEM.: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(3)} MB`);
  console.timeEnd('STT.');
});



