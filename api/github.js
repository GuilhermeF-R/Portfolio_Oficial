// Função para buscar a descrição (About) do repositório no GitHub
async function fetchGitHubAbout(repoName) {
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${process.env.MYTOKEN}` // Adiciona o token de autenticação
            }
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
});