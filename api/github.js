// import fetch from 'node-fetch';

// export default async (req, res) => {
//     const { repoName } = req.query;

//     console.log(`Recebida requisição para o repositório: ${repoName}`);

//     if (!repoName) {
//         console.error('Parâmetro repoName não fornecido.');
//         return res.status(400).json({ error: 'O parâmetro repoName é obrigatório.' });
//     }

//     const apiUrl = `https://api.github.com/repos/GuilhermeF-R/${repoName}`;
//     const githubToken = process.env.MYTOKEN;

//     console.log(`Fazendo requisição para: ${apiUrl}`);

//     try {
//         const response = await fetch(apiUrl, {
//             headers: {
//                 "Accept": "application/vnd.github.v3+json",
//                 "Authorization": `token ${githubToken}`,
//             },
//         });

//         console.log(`Resposta da API do GitHub: ${response.status} ${response.statusText}`);

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Erro na resposta da API do GitHub:', errorData);
//             throw new Error(`Erro ao buscar dados do repositório: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log('Descrição do repositório:', data.description);

//         res.status(200).json({ description: data.description || "Nenhuma descrição disponível." });
//     } catch (error) {
//         console.error('Erro ao buscar descrição do GitHub:', error);
//         res.status(500).json({ error: 'Erro ao buscar descrição do repositório.' });
//     }
// };