document.addEventListener('DOMContentLoaded', function () {
    const techIcons = document.querySelector('.tech-icons');
    const icons = techIcons.children;
    const totalIcons = icons.length;
    const iconWidth = icons[0].offsetWidth + 30; // Largura de cada ícone (incluindo margem)

    // Clone os ícones para permitir o loop contínuo
    for (let i = 0; i < totalIcons; i++) {
        const clone = icons[i].cloneNode(true);
        techIcons.appendChild(clone);
    }

    let offset = 0; // Inicializa a posição de movimento
    let direction = 1; // 1 significa mover para a direita, -1 significa mover para a esquerda

    function moveIcons() {
        offset += direction; // Incrementa a posição dependendo da direção

        // Quando o último ícone sair da tela (ao mover para a direita)
        if (offset >= iconWidth * (totalIcons -20)) {
            direction = -1; // Muda a direção para a esquerda
        }

        // Quando o primeiro ícone sair da tela (ao mover para a esquerda)
        if (offset <= 0) {
            direction = 1; // Muda a direção para a direita
        }

        // Aplica a transição para mover os ícones
        techIcons.style.transform = `translateX(-${offset}px)`;
    }

    setInterval(moveIcons, 20); // Move os ícones a cada 20ms
});
