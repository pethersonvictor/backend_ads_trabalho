// Carregar as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Express é importado
const express = require('express');
const mongoose = require('mongoose');

// App é criada e inicia usando express
const app = express();

// Modelo do filme (Salvando os filmes no MongoDB)
const Filme = mongoose.model('Filme', new mongoose.Schema({
    titulo: { type: String, required: true }
}));

// Conectar com banco de dados MongoDB usando a URL do .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.error('Erro ao conectar no MongoDB:', err);
  } else {
    console.log('Conectado ao MongoDB');
  }
});

// JSON no Body
app.use(express.json());

// Endpoint GET - Todos os filmes
app.get('/filmes', function(req, res) {
  Filme.find({}, function(err, filmes) {
    if (err) {
      return res.status(500).send('Erro ao buscar filmes');
    }
    res.json(filmes);
  });
});

// Endpoint GET - Filme específico
app.get('/filmes/:id', function(req, res) {
  const id = req.params.id;
  Filme.findById(id, function(err, filme) {
    if (err || !filme) {
      return res.status(404).send('Filme não encontrado');
    }
    res.send(filme);
  });
});

// Endpoint POST - Adicionar novo filme
app.post('/filmes', function(req, res) {
  const body = req.body;
  const novoFilme = new Filme({
    titulo: body.titulo
  });

  novoFilme.save(function(err) {
    if (err) {
      return res.status(500).send('Erro ao adicionar filme');
    }
    res.status(201).send('Filme adicionado com sucesso: ' + novoFilme.titulo);
  });
});

app.listen(3000, function() {
  console.log('Servidor rodando em http://localhost:3000');
});
