// Função para buscar a descrição (About) do repositório no GitHub
async function fetchGitHubAbout(repoName) {
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
    const token = process.env.MYTOKEN;  // Obtendo o token da variável de ambiente

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${token}`  // Usando o token para autenticação
            }
        });

        if (!response.ok) throw new Error("Não foi possível carregar a descrição.");

        const data = await response.json();
        return data.description || "Nenhuma descrição disponível.";
    } catch (error) {
        console.error("Erro ao buscar descrição do GitHub:", error);
        return "Erro ao carregar a descrição.";
    }
}

// O restante do código permanece o mesmo, incluindo os ouvintes de eventos para o modal.
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

            openModal(projectTitle, 'Carregando descrição...', projectLink, projectImage);

            const projectDescription = await fetchGitHubAbout(repoName);
            openModal(projectTitle, projectDescription, projectLink, projectImage);
        });
    });
});
