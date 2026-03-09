export default async function handler(req, res) {
  // Разрешаем CORS для браузера
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'No path' });

  const apiPath = Array.isArray(path) ? path.join('/') : path;
  const url = `https://api.brawlstars.com/v1/${apiPath}`;

  // Пробрасываем query params (кроме path)
  const params = { ...req.query };
  delete params.path;
  const qs = new URLSearchParams(params).toString();
  const fullUrl = qs ? `${url}?${qs}` : url;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.BRAWL_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
