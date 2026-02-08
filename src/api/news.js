export default async function handler(req, res) {
  const API_KEY = process.env.NEWSAPI_KEY; // store key in env
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 12;

  const API_URL = `https://newsapi.org/v2/everything?q=cars OR automotive&language=en&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
