export default async function handler(req, res) {
    const repoName = req.query.repo || req.body.repo;

    if (!repoName) {
        return res.status(400).json({ error: "Nome do repositório não fornecido." });
    }

    console.log("Buscando repositório:", repoName); // Debug

    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;

    try {
        const response = await fetch(apiUrl, {
            headers: { Accept: "application/vnd.github.v3+json" }
        });

        if (!response.ok) {
            console.log('Erro na requisição GitHub:', response.statusText); // Debug
            return res.status(response.status).json({ error: "Erro ao buscar repositório no GitHub." });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).json({ error: "Erro interno no servidor", details: error.message });
    }
}
