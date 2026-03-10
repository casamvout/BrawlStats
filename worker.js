export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      const apiPath = url.pathname.replace('/api', '');
      const apiUrl = 'https://api.brawlstars.com/v1' + apiPath + url.search;
      const resp = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${env.BRAWL_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      const data = await resp.text();
      // Показываем ответ API как есть
      return new Response(data, {
        status: resp.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Debug-Token': env.BRAWL_TOKEN ? 'token-exists' : 'no-token'
        }
      });
    }
    return new Response('Not found', { status: 404 });
  }
};
