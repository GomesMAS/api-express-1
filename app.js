import express from "express";

const app = expres();

const PORT = 3000;

const usuarios = [
	{id: 1, nome: "Kauã"},
	{id: 2, nome: "Fábio"},
	{id: 3, nome: "João"}
]

app.get('/', (req, res) => {
	res.send('Olá Express!');
});

app.get('/usuarios', (req, res) => {
	res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
	const novoUsuario = {
		id: usuarios.length + 1,
		nome: 'Miguel'
	}
	usuarios.push(novoUsuario);
	res.status(201).json(novoUsuario);
});

app.get('/usuario/:id', (req,res) => {
	const id = req.params.id;
	const usuario = usuarios.find(
		u => u.id === parseInt(id)
	);
	if (!usuario){
		return res.status(404).json({error: 'Usuário não encontrado!'});
	}
	res.status(200).json(usuario);
});

app.listen(PORT, () => {
	console.log(`Servidor funcionando http://localhost:${PORT}`);
});