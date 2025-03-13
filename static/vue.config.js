const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../dist'),
  chainWebpack: (config) => {
    // Hook no final do processo de build para copiar o arquivo correto
    config.plugin('done').use({
      apply: (compiler) => {
        compiler.hooks.done.tap('Copywbuy_aiWidget', () => {
          // Verifica a variável de ambiente para determinar o arquivo a ser copiado
          const isProduction = process.env.VUE_APP_PRODUCTION === 'true';
          const sourceFile = isProduction
            ? path.resolve(__dirname, './src/wbuy_ai-widget.js')
            : path.resolve(__dirname, './src/wbuy_ai-widget_dev.js');
          const destination = path.resolve(__dirname, '../dist/wbuy_ai-widget.js');

          try {
            // Copia o arquivo selecionado para o diretório de destino
            fs.copyFileSync(sourceFile, destination);
            console.log(`Arquivo ${isProduction ? 'wbuy_ai-widget.js' : 'wbuy_ai-widget_dev.js'} copiado para o diretório de build!`);
          } catch (err) {
            console.error('Erro ao copiar o arquivo:', err);
          }
        });
      },
    });
  },
});
