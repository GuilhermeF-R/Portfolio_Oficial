document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    // Objeto para armazenar contagens
    const viewCounts = {};

    // Função para abrir a modal
    function openModal(title, description, link, imageUrl) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;
        modalImage.src = imageUrl;
        modal.style.display = 'block';

        // Atualiza o contador de visualizações
        if (!viewCounts[title]) {
            viewCounts[title] = 0;
        }
        viewCounts[title]++;

        // Exibe a contagem no console
        console.log(`O projeto "${title}" foi aberto ${viewCounts[title]} vezes.`);
    }

    // Função para fechar a modal
    function closeModalHandler() {
        modal.style.display = 'none';
    }

    // Adiciona evento de clique para fechar a modal
    closeModal.addEventListener('click', closeModalHandler);

    // Adiciona evento de clique fora da modal para fechar
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    // Adiciona evento de clique nas imagens do portfólio
    const portfolioImages = document.querySelectorAll('.img-port');

    portfolioImages.forEach((img) => {
        img.addEventListener('click', async () => {
            const overlayText = img.querySelector('.overlay').textContent.trim();
            const repoName = `${overlayText}`;
            const projectTitle = `Projeto: ${overlayText}`;
            const projectLink = `https://github.com/GuilhermeF-R/${repoName}`;
            const projectImage = img.style.backgroundImage.slice(5, -2);

            // Exibe a modal com uma mensagem de carregamento
            openModal(projectTitle, 'Carregando descrição...', projectLink, projectImage);

            // Busca a descrição do repositório
            const projectDescription = await fetchGitHubAbout(repoName);

            // Atualiza a modal com a descrição obtida
            openModal(projectTitle, projectDescription, projectLink, projectImage);
        });
    });

    // Função para buscar a descrição (About) do repositório no GitHub
    async function fetchGitHubAbout(repoName) {
        const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
        const timeout = 10000; // 10 segundos
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
    
        const token = process.env.MYTOKEN; // Pega o token do ambiente
        console.log('Token usado:', token ? 'Token aceito' : 'Token não encontrado');
    
        try {
            const response = await fetch(apiUrl, {
                headers: { 
                    Accept: "application/vnd.github.v3+json", 
                    Authorization: `token ${token}`  // Adiciona o token de autenticação
                },
                signal: controller.signal
            });
    
            clearTimeout(timeoutId); // Limpa o timer se a resposta chegar a tempo
    
            // Verifica a resposta para ver se o token foi aceito
            if (response.status === 401) {
                console.log("Token recusado: A autenticação falhou.");
                return "Erro: Token de autenticação inválido.";
            }
    
            if (response.status === 403) {
                console.log("Limite de requisições atingido.");
                const resetTime = response.headers.get('X-RateLimit-Reset');
                const resetDate = new Date(resetTime * 1000); // Convertendo o timestamp para uma data legível
                return `Limite de requisições atingido. Tente novamente às ${resetDate.toLocaleString()}.`;
            }
    
            if (!response.ok) {
                console.log("Erro ao acessar o repositório. Status:", response.status);
                throw new Error("Não foi possível carregar a descrição.");
            }
    
            const data = await response.json();
    
            // Retorna a descrição (About) do repositório
            console.log("Token aceito. Descrição carregada com sucesso.");
            return data.description || "Nenhuma descrição disponível.";
        } catch (error) {
            if (error.name === 'AbortError') {
                return "Erro: Tempo de espera excedido. Tente novamente mais tarde.";
            } else {
                console.error("Erro ao buscar descrição do GitHub:", error);
                return "Erro ao carregar a descrição. Tente novamente mais tarde.";
            }
        }
    }
    
});
 