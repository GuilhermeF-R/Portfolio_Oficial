// api/github.js
import fetch from 'node-fetch';

export default async (req, res) => {
    const { repoName } = req.query;

    if (!repoName) {
        return res.status(400).json({ error: 'O parâmetro repoName é obrigatório.' });
    }

    const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
    const githubToken = process.env.MYTOKEN; // Token do GitHub configurado no Vercel

    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `token ${githubToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados do repositório: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json({ description: data.description || "Nenhuma descrição disponível." });
    } catch (error) {
        console.error('Erro ao buscar descrição do GitHub:', error);
        res.status(500).json({ error: 'Erro ao buscar descrição do repositório.' });
    }
};