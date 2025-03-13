(function () {
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
            container.style.left = "auto";
            if (resizeButton) resizeButton.style.display = "block";
        }
    };

    // Listener para mudanças de tamanho de tela
    window.addEventListener("resize", () => {
        const container = document.querySelector("#wbuy_ai_container");
        const resizeButton = document.querySelector("#wbuy_ai_resize_button");
        if (container) {
            adjustWindowForDevice(container, resizeButton);
        }
    });


    // Escuta mensagens enviadas pelo iframe
    window.addEventListener("message", (event) => {
        const allowedOrigins = ["https://widget.wbuy_ai.com.br"];
        if (allowedOrigins.includes(event.origin)) {
            if (event.data === "removeLoadingLayer") {
                removewbuy_aiLoadingLayer();
            }
        } else {
            console.warn("Mensagem bloqueada de origem não confiável:", event.origin);
        }
    });


    // Função global para remover o layer de loading
    window.removewbuy_aiLoadingLayer = function () {
        const loadingLayer = document.querySelector("#wbuy_ai_loading_layer");
        if (loadingLayer) {
            loadingLayer.style.opacity = "0";
            setTimeout(() => loadingLayer.parentElement.removeChild(loadingLayer), 500);
        }
    };

    // Função para criar o layer de loading
    const createLoadingLayer = (parentContainer) => {
        const loadingLayer = document.createElement("div");
        loadingLayer.id = "wbuy_ai_loading_layer";
        loadingLayer.style.position = "absolute";
        loadingLayer.style.top = "0";
        loadingLayer.style.left = "0";
        loadingLayer.style.width = "100%";
        loadingLayer.style.height = "100%";
        loadingLayer.style.borderRadius = "15px";
        loadingLayer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        loadingLayer.style.zIndex = "1003";
        loadingLayer.style.display = "flex";
        loadingLayer.style.alignItems = "center";
        loadingLayer.style.justifyContent = "center";
        loadingLayer.style.transition = "opacity 0.5s ease-in-out";

        const loadingSymbol = document.createElement("div");
        loadingSymbol.style.width = "40px";
        loadingSymbol.style.height = "40px";
        loadingSymbol.style.border = "4px solid #cccccc";
        loadingSymbol.style.borderTop = "4px solid #007bff";
        loadingSymbol.style.borderRadius = "50%";
        loadingSymbol.style.animation = "spin 1s linear infinite";

        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        loadingLayer.appendChild(loadingSymbol);
        parentContainer.appendChild(loadingLayer);

        // Remover o layer automaticamente após 2.5 segundos
        setTimeout(() => {
            try {
                loadingLayer.style.opacity = "0";
                setTimeout(() => {
                    try {
                        parentContainer.removeChild(loadingLayer);
                    } catch (error) { }
                }, 500); // Aguarda a transição antes de remover
            } catch (error) { }
        }, 5000); // Tempo total de exibição do layer

        return loadingLayer;
    };

    // Carregar configurações
    fetch(`https://server.wbuy_ai.com.br/robots/${wbuy_ai_wbuy_aiId}.json`)
        .then(response => response.json())

        .then(wbuy_ai_config => {

            const wbuy_ai_buttonImage = wbuy_ai_config.buttonImage || "https://widget.wbuy_ai.com.br/img/wbuy_ai_icon.png";
            const wbuy_ai_buttonGradientStart = wbuy_ai_config.buttonGradientStart || "#ffffff";
            const wbuy_ai_buttonGradientEnd = wbuy_ai_config.buttonGradientEnd || "#ffffff";

            // Criar botão flutuante
            const wbuy_ai_button = document.createElement("div");
            wbuy_ai_button.style.position = "fixed";
            wbuy_ai_button.style.bottom = "13px";
            wbuy_ai_button.style.right = "13px";
            wbuy_ai_button.style.width = "50px";
            wbuy_ai_button.style.height = "50px";
            wbuy_ai_button.style.background = `linear-gradient(to bottom, ${wbuy_ai_buttonGradientStart}, ${wbuy_ai_buttonGradientEnd})`;
            wbuy_ai_button.style.backgroundSize = "cover";
            wbuy_ai_button.style.backgroundPosition = "center";
            wbuy_ai_button.style.borderRadius = "50%";
            wbuy_ai_button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            wbuy_ai_button.style.cursor = "pointer";
            wbuy_ai_button.style.transition = "transform 0.3s ease-out";
            wbuy_ai_button.style.zIndex = "1000";

            // Criar imagem para sobreposição
            const wbuy_ai_image = document.createElement("img");
            wbuy_ai_image.src = wbuy_ai_buttonImage;
            wbuy_ai_image.alt = "wbuy_ai Icon";
            wbuy_ai_image.style.position = "absolute";
            wbuy_ai_image.style.top = "0";
            wbuy_ai_image.style.left = "0";
            wbuy_ai_image.style.width = "100%";
            wbuy_ai_image.style.height = "100%";
            wbuy_ai_image.style.borderRadius = "50%";
            wbuy_ai_image.style.pointerEvents = "none"; // Garante que o clique só funcione no botão, não na imagem

            // Adicionar a imagem ao botão
            wbuy_ai_button.appendChild(wbuy_ai_image);

            // Adicionar o botão ao corpo do documento
            document.body.appendChild(wbuy_ai_button);


            wbuy_ai_button.style.transform = "translateY(100px)";
            setTimeout(() => {
                wbuy_ai_button.style.transform = "translateY(0)";
            }, 100);

            const wbuy_ai_openIframe = () => {
                wbuy_ai_button.style.display = "none";

                const wbuy_ai_container = document.createElement("div");
                wbuy_ai_container.id = "wbuy_ai_container";
                wbuy_ai_container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                wbuy_ai_container.style.zIndex = "1001";
                wbuy_ai_container.style.position = "fixed"; // Garantir posição fixa
                wbuy_ai_container.style.resize = "both"; // Permitir redimensionamento
                wbuy_ai_container.style.overflow = "hidden"; // Necessário para resize


                // Adicionar o botão de redimensionamento
                const resizeHandle = document.createElement("div");
                resizeHandle.style.position = "absolute";
                resizeHandle.style.top = "2";
                resizeHandle.style.left = "2";
                resizeHandle.style.width = "20px";
                resizeHandle.style.height = "20px";
                resizeHandle.style.cursor = "move";
                resizeHandle.style.backgroundColor = "#ffffff";
                resizeHandle.style.borderRadius = "50%";
                resizeHandle.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";
                resizeHandle.style.zIndex = "1003";


                // Adicionar ícone de resize
                resizeHandle.innerHTML = "⤡";
                resizeHandle.style.display = "flex";
                resizeHandle.style.alignItems = "center";
                resizeHandle.style.justifyContent = "center";
                resizeHandle.style.fontSize = "12px";
                resizeHandle.style.color = "#545454";


                // Lógica de redimensionamento
                let isResizing = false;
                let startX, startY, startWidth, startHeight, startLeft, startTop;

                resizeHandle.addEventListener('mousedown', initResize);

                function initResize(e) {
                    isResizing = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    startWidth = parseInt(document.defaultView.getComputedStyle(wbuy_ai_container).width, 10);
                    startHeight = parseInt(document.defaultView.getComputedStyle(wbuy_ai_container).height, 10);
                    startLeft = wbuy_ai_container.offsetLeft;
                    startTop = wbuy_ai_container.offsetTop;

                    document.addEventListener('mousemove', resize);
                    document.addEventListener('mouseup', stopResize);
                    e.preventDefault();
                }

                function resize(e) {
                    if (!isResizing) return;

                    // Calcular as novas dimensões
                    const newWidth = startWidth + (startX - e.clientX);
                    const newHeight = startHeight + (startY - e.clientY);
                    const newLeft = startLeft - (startX - e.clientX);
                    const newTop = startTop - (startY - e.clientY);

                    // Aplicar limites mínimos
                    const minWidth = 300;
                    const minHeight = 400;

                    // Atualizar dimensões e posição
                    if (newWidth > minWidth) {
                        wbuy_ai_container.style.width = `${newWidth}px`;
                        wbuy_ai_container.style.left = `${newLeft}px`;
                    }
                    if (newHeight > minHeight) {
                        wbuy_ai_container.style.height = `${newHeight}px`;
                        wbuy_ai_container.style.top = `${newTop}px`;
                    }
                }

                function stopResize() {
                    isResizing = false;
                    document.removeEventListener('mousemove', resize);
                    document.removeEventListener('mouseup', stopResize);
                }

                const wbuy_ai_iframe = document.createElement("iframe");
                wbuy_ai_iframe.src = `https://widget.wbuy_ai.com.br/${wbuy_ai_wbuy_aiId}`;
                wbuy_ai_iframe.style.width = "100%";
                wbuy_ai_iframe.style.height = "100%";
                wbuy_ai_iframe.style.border = "none";
                wbuy_ai_iframe.style.overflow = "hidden";
                wbuy_ai_iframe.style.borderRadius = "15px";
                wbuy_ai_iframe.allow = "microphone; camera; display-capture";
                //wbuy_ai_iframe.allow = "cross-origin";
                wbuy_ai_iframe.sandbox = "allow-scripts allow-same-origin";

                const wbuy_ai_closeButton = document.createElement("div");
                wbuy_ai_closeButton.innerText = "×";
                wbuy_ai_closeButton.style.fontSize = "30px";
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
                wbuy_ai_closeButton.style.opacity = "1";
                wbuy_ai_closeButton.style.transition = "opacity 0.5s ease-in-out";


                const wbuy_ai_resizeButton = document.createElement("div");
                wbuy_ai_resizeButton.id = "wbuy_ai_resize_button";


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

                wbuy_ai_container.appendChild(resizeHandle);

                wbuy_ai_container.appendChild(wbuy_ai_iframe);
                wbuy_ai_container.appendChild(wbuy_ai_closeButton);
                wbuy_ai_container.appendChild(wbuy_ai_resizeButton);

                document.body.appendChild(wbuy_ai_container);

                createLoadingLayer(wbuy_ai_container);

                // Ajuste automático do iframe
                setTimeout(() => {
                    const rect = wbuy_ai_container.getBoundingClientRect();
                    if (rect.top <= 0) {
                        wbuy_ai_container.style.position = "fixed";
                        wbuy_ai_container.style.top = "0";
                        wbuy_ai_container.style.left = "0";
                        wbuy_ai_container.style.width = "100%";
                        wbuy_ai_container.style.height = "100%";
                    }
                }, 100); // Verifica a posição após 100ms

                // setTimeout(() => {
                //     //wbuy_ai_closeButton.style.opacity = "1";
                //     //wbuy_ai_resizeButton.style.opacity = "1";
                // }, 1000);

                wbuy_ai_closeButton.addEventListener("click", () => {
                    document.body.removeChild(wbuy_ai_container);
                    wbuy_ai_button.style.display = "block";
                    wbuy_ai_setWindowState("closed");
                });

                adjustWindowForDevice(wbuy_ai_container, wbuy_ai_resizeButton);
                wbuy_ai_setWindowState("open");

                window.closewbuy_ai = function () {
                    document.body.removeChild(wbuy_ai_container);
                    wbuy_ai_button.style.display = "block";
                    wbuy_ai_setWindowState("closed");
                };
            };


            wbuy_ai_button.addEventListener("click", wbuy_ai_openIframe);

            if (wbuy_ai_isWindowOpen()) {
                wbuy_ai_openIframe();
            }
        })
        .catch(error => {
            console.error("Failed to load configuration:", error);
        });
})();