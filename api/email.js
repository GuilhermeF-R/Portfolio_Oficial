const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();  // Certifique-se de carregar o dotenv no início

const app = express();

// Habilita o CORS para todas as origens (isso pode ser configurado para permitir apenas origens específicas)
app.use(cors());
app.use(express.json());  // Para que o body do request seja analisado como JSON

app.post('/api/email.js', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).send('Todos os campos são obrigatórios: nome, e-mail, telefone e mensagem.');
    }

    const cleanedPhone = phone.replace(/\D/g, '');  // Remove qualquer caractere não numérico

    if (!/^\d+$/.test(cleanedPhone)) {
        return res.status(400).send('O campo de telefone deve conter apenas números.');
    }

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Usando o e-mail do .env
        to: process.env.EMAIL_TO,      // Usando o e-mail do destinatário do .env
        subject: `Mensagem de ${name}`,
        html: `<h1>Mensagem de ${name}</h1><p>Email: ${email}</p><p>Celular: ${phone}</p><p>Mensagem: ${message}</p>`,
        text: `Mensagem de ${name}\nEmail: ${email}\nCelular: ${phone}\nMensagem: ${message}`,
    };

    try {
        await transport.sendMail(mailOptions);
        res.status(200).send('E-mail enviado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao enviar e-mail: ' + err);
        console.error(err);
    }
});

// Iniciar o servidor na porta 3000 (ou outra de sua preferência)
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
