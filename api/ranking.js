// Banco de dados temporário (para teste)
let ranking = [
  { name: "Clara_MAPRO", tries: 5, difficulty: "medium" }
];

export default function handler(req, res) {
  // Configura o CORS para o seu site conseguir ler a API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(ranking.sort((a, b) => a.tries - b.tries).slice(0, 10));
  }

  if (req.method === 'POST') {
    const { name, tries, difficulty } = req.body;
    ranking.push({ name, tries, difficulty, date: new Date() });
    return res.status(201).json({ message: "Recorde Salvo!" });
  }
}