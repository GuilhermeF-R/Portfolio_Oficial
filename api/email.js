const nodemailer = require('nodemailer');
require('dotenv').config(); // Certifique-se de carregar o dotenv no início do script


module.exports = async (req, res) => {
    // Verifica se a requisição é POST
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;

        // Verificar se todos os dados necessários estão presentes
        if (!name || !email || !phone || !message) {
            return res.status(400).send('Todos os campos são obrigatórios: nome, e-mail, telefone e mensagem.');
        }

        // Limpar o número de telefone para garantir que ele contenha apenas números
        const cleanedPhone = phone.replace(/\D/g, '');  // Remove qualquer caractere que não seja número
        
        // Verificar se o telefone contém apenas números
        if (!/^\d+$/.test(cleanedPhone)) {
            return res.status(400).send('O campo de telefone deve conter apenas números.');
        }

        // Configuração do transporte do e-mail
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
            from: 'testerdeveloper45@gmail.com',
            to: 'frodriguesguilherme18@gmail.com',  // Substitua pelo e-mail para o qual você quer enviar
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
    } else {
        // Retorna um erro caso o método não seja POST
        res.status(405).send('Método não permitido');
    }
};