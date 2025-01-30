import { fetchGitHubAbout } from './api/github.js';

// Resto do código...
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    console.log("Buscando descrição do repositório:", repoName);
    console.log("Descrição obtida:", projectDescription);

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