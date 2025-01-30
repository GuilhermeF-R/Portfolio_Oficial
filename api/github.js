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