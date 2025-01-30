// Função para buscar a descrição (About) do repositório no GitHub
export async function fetchGitHubAbout(repoName) {
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
    const MYTOKEN = process.env.MYTOKEN; // Acessa a variável de ambiente
    console.log("Token:", MYTOKEN); // Verifique se o token está sendo carregado
    
    try {
        const response = await fetch(apiUrl, {
            headers: { 
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${MYTOKEN}` // Adiciona o token no cabeçalho
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