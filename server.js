
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    message: "API funcionando 🚀"
  });
});

// Banco de dados temporário
let usuarios = [
  { id: 1, nome: "João", email: "joao@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" },
  { id: 3, nome: "Ana", email: "Ana@email.com" },
  { id: 4, nome: "Pedro", email: "Pedro@email.com" }
];

// Listar usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Buscar usuário por ID
app.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find(
    u => u.id === Number(req.params.id)
  );

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  res.json(usuario);
});

// Criar usuário
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      erro: "Nome e email são obrigatórios"
    });
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// Atualizar usuário
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  usuarios[index] = {
    ...usuarios[index],
    ...req.body,
    id
  };

  res.json(usuarios[index]);
});

// Excluir usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe = usuarios.some(u => u.id === id);

  if (!existe) {
    return res.status(404).json({
      erro: "Usuário não encontrado"
    });
  }

  usuarios = usuarios.filter(u => u.id !== id);

  res.json({
    message: "Usuário excluído com sucesso"
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
