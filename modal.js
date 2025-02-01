document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const modalDeploy = document.getElementById('modal-deploy'); // Botão Deploy

    // Objeto para armazenar contagens
    const viewCounts = {};

    // Função para abrir a modal
    function openModal(title, description, link, imageUrl) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;
        modalImage.src = imageUrl;
        modal.style.display = 'block';

        // Verifica se o projeto é um dos que precisam do botão Deploy
        const projectsWithDeploy = ['audiobook-service', 'profile-card', 'hashtaurante', 'notepad'];
        const projectName = title.replace('Projeto: ', '').toLowerCase();

        if (projectsWithDeploy.includes(projectName)) {
            // Mostra o botão Deploy e define o link
            modalDeploy.style.display = 'inline-block';
            modalDeploy.href = getDeployLink(projectName);
        } else {
            // Esconde o botão Deploy
            modalDeploy.style.display = 'none';
        }

        // Atualiza o contador de visualizações
        if (!viewCounts[title]) {
            viewCounts[title] = 0;
        }
        viewCounts[title]++;

        // Exibe a contagem no console
        console.log(`O projeto "${title}" foi aberto ${viewCounts[title]} vezes.`);
    }

    // Função para obter o link de deploy com base no nome do projeto
    function getDeployLink(projectName) {
        const deployLinks = {
            'audiobook-service': 'https://audiobook-service.vercel.app/',
            'hashtaurante': 'https://hashtaurante-devgferreira.vercel.app/',
            'profile-card': 'https://profile-card-iota-bice.vercel.app/',
            'notepad': 'https://notepad-devgferreira.vercel.app/'
        };
        return deployLinks[projectName] || `projectdeploylink-${projectName}`; // Fallback dinâmico
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

        try {
            const response = await fetch(apiUrl, {
                headers: { Accept: "application/vnd.github.v3+json" },
                signal: controller.signal
            });

            clearTimeout(timeoutId); // Limpa o timer se a resposta chegar a tempo

            if (response.status === 403) {
                // Verifica se o limite de requisições foi atingido
                const resetTime = response.headers.get('X-RateLimit-Reset');
                const resetDate = new Date(resetTime * 1000); // Convertendo o timestamp para uma data legível
                return `Limite de requisições atingido. Tente novamente às ${resetDate.toLocaleString()}.`;
            }

            if (!response.ok) throw new Error("Não foi possível carregar a descrição.");

            const data = await response.json();

            // Retorna a descrição (About) do repositório
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