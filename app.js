import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

const tarefas = [
  { id: 1, titulo: "Matematica", concluida: "true" },
  { id: 2, titulo: "engenharia", concluida: "true" },
  { id: 3, titulo: "fisica", concluida: "true" },
  { id: 4, titulo: "ingles", concluida: "false" },
];

app.get("/", (req, res) => {
  res.send("API de tarefas no ar!");
});

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});
app.get("/tarefas/:id", (req, res) => {
  const id = req.params.id;
  const tarefaencontrada = tarefas.find((p) => p.id === parseInt(id));
  if (!tarefas) {
    return res.status(404).json({ error: "tarefa não encontrado!" });
  }
  res.status(200).json(tarefaencontrada);
});

app.post("/tarefas", (req, res) => {
  const titulo = req.body.titulo;
  const concluida = req.body.concluida;

  if (!titulo || typeof titulo !== "string") {
    return res
      .status(400)
      .json({ erro: 'O campo "titulo" é obrigatório e deve ser uma string' });
  }

  if (concluida === undefined || typeof concluida !== Boolean) {
    return res
      .status(400)
      .json({
        erro: 'O campo "concluida" é obrigatório e deve ser um booleano ',
      });
  }

  const novatarefa = {
    id:tarefas.length + 1,
    titulo,
    concluida,
  };

tarefas.push(novatarefa);

  res.status(201).json(novatarefa);
});


app.get("tarefas/busca", (req, res) => {
  const concluida = req.query.concluida;
  const ordenar = req.query.ordenar;

  let resultado =tarefas;

  if (concluida) {
    resultado = resultado.filter((produto) => {
      produto.concluida === true;
    });
  }

  res.json(resultado);
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando http://localhost:${PORT}`);
});
