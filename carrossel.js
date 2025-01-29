let currentIndexPortfolio = 0; // Índice atual dos projetos do portfólio
let currentIndexEspecialidades = 0; // Índice atual das especialidades

// Seleciona os elementos de projetos do portfólio e especialidades
const portfolioItems = document.querySelectorAll('.img-port'); // Todos os projetos
const totalPortfolioItems = portfolioItems.length; // Total de projetos

const especialidadesItems = document.querySelectorAll('.especialidades-box'); // Todas as especialidades
const totalEspecialidadesItems = especialidadesItems.length; // Total de especialidades

// Inicializa o display dos portfólios
portfolioItems.forEach((item, index) => {
    if (index >= 3) {
        item.style.display = 'none'; // Esconde os projetos 4, 5, 6
    } else {
        item.classList.add('project-visible'); // Adiciona animação nos primeiros
    }
});

// Inicializa o display das especialidades
especialidadesItems.forEach((item, index) => {
    if (index >= 3) {
        item.style.display = 'none'; // Esconde as especialidades 4, 5, 6
    } else {
        item.classList.add('project-visible'); // Adiciona animação nos primeiros
    }
});

// Função para mover o carrossel (geral)
function moveCarousel(direction, type) {
    let items, totalItems, currentIndex;

    // Verifica se o tipo é portfólio ou especialidades
    if (type === 'portfolio') {
        items = portfolioItems;
        totalItems = totalPortfolioItems;
        currentIndex = currentIndexPortfolio;
    } else if (type === 'especialidades') {
        items = especialidadesItems;
        totalItems = totalEspecialidadesItems;
        currentIndex = currentIndexEspecialidades;
    }

    // Remove a animação e esconde os itens atuais
    for (let i = 0; i < 3; i++) {
        const itemIndex = (currentIndex + i) % totalItems;
        items[itemIndex].style.display = 'none';
        items[itemIndex].classList.remove('project-visible');
    }

    // Ajusta o índice com base na direção
    if (direction === 'direita') {
        currentIndex = (currentIndex + 3) >= totalItems ? 0 : currentIndex + 1;
    } else if (direction === 'esquerda') {
        currentIndex = (currentIndex - 1) < 0 ? totalItems - 3 : currentIndex - 1;
    }

    // Exibe os próximos 3 itens e adiciona a animação
    for (let i = 0; i < 3; i++) {
        const itemIndex = (currentIndex + i) % totalItems;
        items[itemIndex].style.display = 'block';
        items[itemIndex].classList.add('project-visible');
    }

    // Atualiza o índice atual para o tipo correspondente
    if (type === 'portfolio') {
        currentIndexPortfolio = currentIndex;
    } else if (type === 'especialidades') {
        currentIndexEspecialidades = currentIndex;
    }
}
