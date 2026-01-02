const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados em memória (apenas para teste rápido)
// No Render, você pode conectar um banco PostgreSQL gratuito em 1 clique
let ranking = [
  { name: 'Clara_MAPRO', tries: 3, difficulty: 'medium' }
];

// Rota para ver o Ranking
app.get('/ranking', (req, res) => {
  res.json(ranking.sort((a, b) => a.tries - b.tries).slice(0, 10));
});

// Rota para salvar novo recorde
app.post('/ranking', (req, res) => {
  const { name, tries, difficulty } = req.body;
  if (!name || !tries) return res.status(400).send("Faltam dados");
  
  ranking.push({ name, tries, difficulty, date: new Date() });
  res.status(201).send("Recorde salvo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));