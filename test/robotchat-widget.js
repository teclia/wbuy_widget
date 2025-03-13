(function() {
    const wbuy_ai_scriptTag = document.currentScript;

    // Obter parâmetros do script
    const wbuy_ai_wbuy_aiId = wbuy_ai_scriptTag.getAttribute("wbuy_ai_id");
    if (!wbuy_ai_wbuy_aiId) {
        console.error("wbuy_ai_id is required");
        return;
    }

    // Função para verificar o estado da janela
    const wbuy_ai_isWindowOpen = () => localStorage.getItem("wbuy_ai_window_state") === "open";
    const wbuy_ai_setWindowState = (state) => localStorage.setItem("wbuy_ai_window_state", state);

    // Verificar se é dispositivo móvel
    const isMobile = () => window.innerWidth <= 768;

    // Ajustar janela com base no dispositivo
    const adjustWindowForDevice = (container, resizeButton) => {
        if (isMobile()) {
            container.style.position = "fixed";
            container.style.top = "0";
            container.style.left = "0";
            container.style.right = "0";
            container.style.bottom = "0";
            container.style.width = "100%";
            container.style.height = "100%";
            if (resizeButton) resizeButton.style.display = "none";
        } else {
            container.style.position = "fixed";
            container.style.bottom = "13px";
            container.style.right = "13px";
            container.style.width = "380px";
            container.style.height = "550px";
            container.style.top = "auto";
            container.style.left = "auto"; // Corrigir posição no modo desktop
            if (resizeButton) resizeButton.style.display = "block";
        }
    };

    // Adicionar listener para mudanças de tamanho de tela
    window.addEventListener("resize", () => {
        const container = document.querySelector("#wbuy_ai_container");
        const resizeButton = document.querySelector("#wbuy_ai_resize_button");
        if (container) {
            adjustWindowForDevice(container, resizeButton);
        }
    });

    // Carregar configurações
    fetch(`http://localhost:9070/robots/${wbuy_ai_wbuy_aiId}.json`)
        .then(response => response.json())
        .then(wbuy_ai_config => {
            const wbuy_ai_buttonImage = wbuy_ai_config.buttonImage || "https://widget.wbuy_ai.com.br/img/wbuy_ai.svg";
            const wbuy_ai_buttonGradientStart = wbuy_ai_config.buttonGradientStart || "#4760a6";
            const wbuy_ai_buttonGradientEnd = wbuy_ai_config.buttonGradientEnd || "#344678";

            // Criar botão flutuante
            const wbuy_ai_button = document.createElement("div");
            wbuy_ai_button.style.position = "fixed";
            wbuy_ai_button.style.bottom = "13px";
            wbuy_ai_button.style.right = "13px";
            wbuy_ai_button.style.width = "50px";
            wbuy_ai_button.style.height = "50px";
            wbuy_ai_button.style.background = `linear-gradient(${wbuy_ai_buttonGradientStart}, ${wbuy_ai_buttonGradientEnd})`;
            wbuy_ai_button.style.borderRadius = "50%";
            wbuy_ai_button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            wbuy_ai_button.style.cursor = "pointer";
            wbuy_ai_button.style.transition = "transform 0.3s ease-out";
            wbuy_ai_button.style.backgroundImage = `url(${wbuy_ai_buttonImage})`;
            wbuy_ai_button.style.backgroundSize = "cover";
            wbuy_ai_button.style.backgroundPosition = "center";
            wbuy_ai_button.style.zIndex = "1000";

            document.body.appendChild(wbuy_ai_button);

            // Animação de entrada
            wbuy_ai_button.style.transform = "translateY(100px)";
            setTimeout(() => {
                wbuy_ai_button.style.transform = "translateY(0)";
            }, 100);

            // Função para abrir o iframe
            const wbuy_ai_openIframe = () => {
                wbuy_ai_button.style.display = "none";

                // Criar container para o iframe
                const wbuy_ai_container = document.createElement("div");
                wbuy_ai_container.id = "wbuy_ai_container";
                wbuy_ai_container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                wbuy_ai_container.style.zIndex = "1001";

                // Criar iframe
                const wbuy_ai_iframe = document.createElement("iframe");
                wbuy_ai_iframe.src = `http://localhost:8080/${wbuy_ai_wbuy_aiId}`;
                wbuy_ai_iframe.style.width = "100%";
                wbuy_ai_iframe.style.height = "100%";
                wbuy_ai_iframe.style.border = "none";
                wbuy_ai_iframe.style.overflow = "hidden";
                wbuy_ai_iframe.style.borderRadius = "15px";
                wbuy_ai_iframe.allow = "microphone; camera; display-capture";
                wbuy_ai_iframe.style.overflow = "hidden";


                // Criar botão para fechar iframe
                const wbuy_ai_closeButton = document.createElement("div");
                wbuy_ai_closeButton.innerText = "×";
                wbuy_ai_closeButton.style.fontSize = "35px";
                wbuy_ai_closeButton.style.position = "absolute";
                wbuy_ai_closeButton.style.top = "15px";
                wbuy_ai_closeButton.style.right = "15px";
                wbuy_ai_closeButton.style.width = "30px";
                wbuy_ai_closeButton.style.height = "30px";
                wbuy_ai_closeButton.style.backgroundColor = "#ffffff";
                wbuy_ai_closeButton.style.color = "#545454";
                wbuy_ai_closeButton.style.borderRadius = "50%";
                wbuy_ai_closeButton.style.textAlign = "center";
                wbuy_ai_closeButton.style.lineHeight = "30px";
                wbuy_ai_closeButton.style.cursor = "pointer";
                wbuy_ai_closeButton.style.zIndex = "1002";
                wbuy_ai_closeButton.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";

                // Criar botão para alternar tamanho
                const wbuy_ai_resizeButton = document.createElement("div");
                wbuy_ai_resizeButton.id = "wbuy_ai_resize_button";
                wbuy_ai_resizeButton.innerText = "⤡";
                wbuy_ai_closeButton.style.fontSize = "30px";
                wbuy_ai_resizeButton.style.position = "absolute";
                wbuy_ai_resizeButton.style.top = "15px";
                wbuy_ai_resizeButton.style.right = "50px";
                wbuy_ai_resizeButton.style.width = "30px";
                wbuy_ai_resizeButton.style.height = "30px";
                wbuy_ai_resizeButton.style.backgroundColor = "#ffffff";
                wbuy_ai_resizeButton.style.color = "#545454";
                wbuy_ai_resizeButton.style.borderRadius = "50%";
                wbuy_ai_resizeButton.style.textAlign = "center";
                wbuy_ai_resizeButton.style.lineHeight = "30px";
                wbuy_ai_resizeButton.style.cursor = "pointer";
                wbuy_ai_resizeButton.style.zIndex = "1002";
                wbuy_ai_resizeButton.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";

                let isResized = false;
                wbuy_ai_resizeButton.addEventListener("click", () => {
                    if (!isResized) {
                        wbuy_ai_container.style.width = `${window.innerWidth * 0.5}px`;
                        wbuy_ai_container.style.height = `${window.innerHeight * 0.8}px`;
                        wbuy_ai_container.style.bottom = "13px";
                        wbuy_ai_container.style.right = "13px";
                        isResized = true;
                    } else {
                        adjustWindowForDevice(wbuy_ai_container, wbuy_ai_resizeButton);
                        isResized = false;
                    }
                });

                wbuy_ai_container.appendChild(wbuy_ai_iframe);
                wbuy_ai_container.appendChild(wbuy_ai_closeButton);
                wbuy_ai_container.appendChild(wbuy_ai_resizeButton);
                document.body.appendChild(wbuy_ai_container);

                wbuy_ai_closeButton.addEventListener("click", () => {
                    document.body.removeChild(wbuy_ai_container);
                    wbuy_ai_button.style.display = "block";
                    wbuy_ai_setWindowState("closed");
                });

                adjustWindowForDevice(wbuy_ai_container, wbuy_ai_resizeButton);

                // Atualizar estado no localStorage
                wbuy_ai_setWindowState("open");

                // Adicionar função para fechar o iframe globalmente
                window.closewbuy_ai = function() {
                    document.body.removeChild(wbuy_ai_container);
                    wbuy_ai_button.style.display = "block";
                    wbuy_ai_setWindowState("closed");
                };
            };

            // Evento de clique no botão
            wbuy_ai_button.addEventListener("click", wbuy_ai_openIframe);

            // Restaurar estado ao carregar a página
            if (wbuy_ai_isWindowOpen()) {
                wbuy_ai_openIframe();
            }
        })
        .catch(error => {
            console.error("Failed to load configuration:", error);
        });
})();
