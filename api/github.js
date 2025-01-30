async function fetchGitHubAbout(repoName) {
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
    console.log("Fazendo requisição para:", apiUrl); // Log da URL

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${process.env.MYTOKEN}`
            }
        });

        console.log("Resposta da API:", response.status, response.statusText); // Log do status da resposta

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro na resposta:", errorText); // Log do erro detalhado
            throw new Error("Não foi possível carregar a descrição.");
        }

        const data = await response.json();
        console.log("Dados recebidos:", data); // Log dos dados recebidos

        return data.description || "Nenhuma descrição disponível.";
    } catch (error) {
        console.error("Erro ao buscar descrição do GitHub:", error);
        return "Erro ao carregar a descrição.";
    }
}