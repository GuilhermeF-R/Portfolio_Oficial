document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalImage = document.getElementById('modal-image'); // Novo elemento para a imagem
    const closeModal = document.querySelector('.close-modal');

    // Função para abrir a modal
    function openModal(title, description, link, imageUrl) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;
        modalImage.src = imageUrl; // Define a imagem do projeto
        modal.style.display = 'block';
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
            const repoName = `${overlayText}`; // Ajuste conforme necessário
            const projectTitle = `Projeto: ${overlayText}`;
            const projectLink = `https://github.com/GuilhermeF-R/${repoName}`;
            const projectImage = img.style.backgroundImage.slice(5, -2); // Extrai a URL da imagem

            // Busca a descrição do campo "About"
            const projectDescription = await fetchGitHubAbout(repoName);

            openModal(projectTitle, projectDescription, projectLink, projectImage);
        });
    });

    // Função para buscar a descrição (About) do repositório no GitHub
    async function fetchGitHubAbout(repoName) {
        const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;

        try {
            const response = await fetch(apiUrl, {
                headers: { Accept: "application/vnd.github.v3+json" }
            });

            if (!response.ok) throw new Error("Não foi possível carregar a descrição.");

            const data = await response.json();

            // Retorna a descrição (About) do repositório
            return data.description || "Nenhuma descrição disponível.";
        } catch (error) {
            console.error("Erro ao buscar descrição do GitHub:", error);
            return "Erro ao carregar a descrição.";
        }
    }
});