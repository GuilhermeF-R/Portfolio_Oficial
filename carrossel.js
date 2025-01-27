let currentIndex = 0; // Começa com o primeiro conjunto visível (1, 2, 3)
const projects = document.querySelectorAll('.img-port'); // Todos os projetos
const totalProjects = projects.length; // Total de projetos no carrossel

// Inicializa os projetos com display: none, exceto os primeiros 3
projects.forEach((project, index) => {
    if (index >= 3) {
        project.style.display = 'none'; // Esconde os projetos 4, 5, 6 inicialmente
    } else {
        project.classList.add('project-visible'); // Adiciona a animação nos primeiros
    }
});

// Função para mover o carrossel para a direita ou para a esquerda
function moveCarousel(direction) {
    // Remove a animação dos projetos atuais
    for (let i = 0; i < 3; i++) {
        const projectIndex = (currentIndex + i) % totalProjects;
        projects[projectIndex].style.display = 'none'; // Esconde todos os projetos inicialmente
        projects[projectIndex].classList.remove('project-visible'); // Remove a animação
    }

    // Avançar para a direita
    if (direction === 'direita') {
        if (currentIndex === 3) { // Se estamos no conjunto 4, 5, 6
            currentIndex = 0; // Vai para 1, 2, 3
        } else {
            currentIndex++; // Caso contrário, avança um índice
        }
    } 

    // Retroceder para a esquerda
    else if (direction === 'esquerda') {
        if (currentIndex === 0) { // Se estamos no conjunto 1, 2, 3
            currentIndex = 3; // Vai para 6, 5, 4
        } else {
            currentIndex--; // Caso contrário, retrocede um índice
        }
    }

    // Exibe os 3 projetos atuais, com base no índice e adiciona animação
    for (let i = 0; i < 3; i++) {
        const projectIndex = (currentIndex + i) % totalProjects;
        
        // Exibe o projeto atual
        projects[projectIndex].style.display = 'block';
        projects[projectIndex].classList.add('project-visible'); // Adiciona a animação
    }
}
