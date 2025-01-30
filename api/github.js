// Função para buscar a descrição (About) do repositório no GitHub
async function fetchGitHubAbout(repoName) {
    const apiUrl = `https://github.com/GuilhermeF-R/${repoName}`;
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
