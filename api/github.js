import fetch from 'node-fetch';

export default async function fetchGitHubAbout(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { repoName } = req.query;
    if (!repoName) {
        return res.status(400).json({ error: 'Nome do repositório é obrigatório' });
    }

    const GITHUBTOKEN = process.env.MYTOKEN; // O token é armazenado no ambiente do Vercel
    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Bearer ${GITHUBTOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error("Não foi possível carregar a descrição.");
        }

        const data = await response.json();
        return res.status(200).json({ description: data.description || "Nenhuma descrição disponível." });
    } catch (error) {
        console.error("Erro ao buscar descrição do GitHub:", error);
        return res.status(500).json({ error: "Erro ao carregar a descrição." });
    }
}
