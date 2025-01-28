// Para usar variáveis de ambiente em nosso código, podemos usar o pacote dotenv
// O dotenv carrega variáveis de ambiente de um arquivo .env, o que facilita a configuração
// de variáveis secretas sem precisar hardcodá-las no código fonte (ex: senhas, chaves de API, etc.)

// Primeiro, instalaríamos o pacote dotenv com o comando:
// npm install dotenv

// Se estivéssemos usando o dotenv, faríamos algo assim:
// require('dotenv').config();  // Carrega o arquivo .env com as variáveis de ambiente

// No Vercel, as variáveis de ambiente são configuradas diretamente no painel do Vercel
// e são injetadas automaticamente nas funções serverless durante a execução. Portanto, o uso de dotenv é desnecessário.
// Configuramos as variáveis de ambiente no painel do Vercel nas configurações do projeto.


// Configuração do transporte para envio de e-mails usando o Nodemailer
// A diferença é que no Vercel, as variáveis de ambiente são configuradas diretamente
// nas configurações do projeto, então basta referenciá-las com process.env sem a necessidade de carregar o dotenv.
// /api/email.js
import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).send('Todos os campos são obrigatórios: nome, e-mail, telefone e mensagem.');
        }

        const cleanedPhone = phone.replace(/\D/g, '');  // Remove qualquer caractere não numérico

        if (!/^\d+$/.test(cleanedPhone)) {
            return res.status(400).send('O campo de telefone deve conter apenas números.');
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Mensagem de ${name}`,
            html: `<h1>Mensagem de ${name}</h1><p>Email: ${email}</p><p>Celular: ${phone}</p><p>Mensagem: ${message}</p>`,
            text: `Mensagem de ${name}\nEmail: ${email}\nCelular: ${phone}\nMensagem: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).send('E-mail enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar e-mail: ' + error.message);
        }
    } else {
        return res.status(405).send('Método não permitido');
    }
};
// Ao usar o Vercel, você pode criar funções serverless (sem a necessidade de rodar um servidor Express)
// e o Vercel vai automaticamente lidar com a criação de rotas, como /api/email.js.
// Dessa forma, o código que normalmente seria executado no Express é agora executado dentro do ambiente do Vercel como uma função serverless.