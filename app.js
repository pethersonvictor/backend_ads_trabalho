const express = require('express');
const mysql = require('mysql2');
const app = express();

// conectar com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'petherson',
    password: '32z44gf5',
    database: 'filmes_db'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

app.use(express.json());

// listar filmes
app.get('/filmes', (req, res) => {
    db.query('SELECT * FROM filmes', (err, results) => {
        if (err) return res.status(500).send('Erro ao consultar filmes');
        res.json(results);
    });
});

// adicionar filme
app.post('/filmes', (req, res) => {
    const { titulo, ano } = req.body;
    if (!titulo || !ano) return res.status(400).send('Título e ano são obrigatórios');
    
    db.query('INSERT INTO filmes (titulo, ano) VALUES (?, ?)', [titulo, ano], err => {
        if (err) return res.status(500).send('Erro ao adicionar o filme');
        res.status(201).send('Filme adicionado!');
    });
});

// servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
