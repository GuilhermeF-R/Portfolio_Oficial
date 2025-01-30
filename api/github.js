module.exports.fetchGitHubAbout = async function(repoName) {
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
    const MYTOKEN = process.env.MYTOKEN; // Acessa a variável de ambiente

    try {
        const response = await fetch(apiUrl, {
            headers: { 
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${MYTOKEN}` // Adiciona o token no cabeçalho
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
