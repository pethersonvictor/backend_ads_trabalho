//Express é importado
const express = require('express');

//App é criada e inicia usando express
const app = express();

//Cria uma lista de livros
const filmes = ['O Poderoso Chefão', 'A Espera de um Milagre', 'O Senhor dos Anéis'];

//JSON no Body
app.use(express.json());

//Endpoint get - todos os filmes
app.get('/filmes', function(req, res) {
    res.send(filmes);
});

//Endpoint get - filme especifico
app.get('/filmes/:id', function(req, res) {
    const id = req.params.id;
    const filme = filmes[id - 1]; // Acessa o filme pela posição do array

    if (!filme) {
        return res.status(404).send('Filme não encontrado');
    }

    res.send(filme);
});

//Endpoint post - adicionar novo filme
app.post('/filmes', function(req, res) {
    const body = req.body;
    const novoFilme = body.titulo;

    filmes.push(novoFilme); 

    res.send('Filme adicionado com sucesso: ' + novoFilme);
});

//Endpoint delete - excluir filme
app.delete('/filmes/:id', function(req, res) {
    const id = req.params.id;
    delete filmes[id - 1]; 

    if (!filmes[id - 1]) {
        return res.status(404).send('Filme não encontrado');
    }

    res.send('Filme removido com sucesso: ' + filmes[id - 1]);

});

app.listen(3000, function() {
    console.log('Servidor rodando em http://localhost:3000');
});
