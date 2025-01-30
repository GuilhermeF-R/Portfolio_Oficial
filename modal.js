document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    const viewCounts = {};

    function openModal(title, description, link, imageUrl) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;
        modalImage.src = imageUrl;
        modal.style.display = 'block';

        if (!viewCounts[title]) {
            viewCounts[title] = 0;
        }
        viewCounts[title]++;
        console.log(`O projeto "${title}" foi aberto ${viewCounts[title]} vezes.`);
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', closeModalHandler);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    const portfolioImages = document.querySelectorAll('.img-port');

    portfolioImages.forEach((img) => {
        img.addEventListener('click', async () => {
            const overlayText = img.querySelector('.overlay').textContent.trim();
            const repoName = `${overlayText}`;
            const projectTitle = `Projeto: ${overlayText}`;
            const projectLink = `https://github.com/GuilhermeF-R/${repoName}`;
            const projectImage = img.style.backgroundImage.slice(5, -2);

            // Busca a descrição do repositório via função serverless
            try {
                const response = await fetch(`/api/github?repoName=${repoName}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar descrição do repositório.');
                }
                const data = await response.json();
                const projectDescription = data.description;
                openModal(projectTitle, projectDescription, projectLink, projectImage);
            } catch (error) {
                console.error('Erro ao buscar descrição do GitHub:', error);
                openModal(projectTitle, 'Erro ao carregar a descrição.', projectLink, projectImage);
            }
        });
    });
});