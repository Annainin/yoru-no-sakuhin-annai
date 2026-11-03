/**
 * Cloudflare Worker proxy for the official DMM Web Service ItemList API.
 * Set DMM_API_ID, DMM_AFFILIATE_ID and ALLOWED_ORIGIN as Worker secrets/vars.
 * Never place API credentials in browser JavaScript or a public GitHub repository.
 */
const API_ENDPOINT = 'https://api.dmm.com/affiliate/v3/ItemList';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    const corsOrigin = origin === allowed ? origin : 'null';
    const headers = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (origin !== allowed || !allowed) return new Response(JSON.stringify({ error: 'Origin is not allowed.' }), { status: 403, headers });
    if (request.method !== 'GET') return new Response(JSON.stringify({ error: 'GET only.' }), { status: 405, headers });
    if (!env.DMM_API_ID || !env.DMM_AFFILIATE_ID) return new Response(JSON.stringify({ error: 'DMM API credentials are not configured on the Worker.' }), { status: 503, headers });

    const incoming = new URL(request.url);
    const keyword = (incoming.searchParams.get('q') || '').trim().slice(0, 80);
    const hits = Math.min(20, Math.max(1, Number(incoming.searchParams.get('hits') || 12)));
    if (!keyword) return new Response(JSON.stringify({ error: '検索キーワードを入力してください。' }), { status: 400, headers });

    const api = new URL(API_ENDPOINT);
    api.search = new URLSearchParams({
      api_id: env.DMM_API_ID,
      affiliate_id: env.DMM_AFFILIATE_ID,
      site: 'FANZA',
      service: 'digital',
      floor: 'videoa',
      keyword,
      hits: String(hits),
      sort: 'date',
      output: 'json'
    }).toString();

    try {
      const response = await fetch(api.toString(), { headers: { 'Accept': 'application/json' } });
      const body = await response.text();
      if (!response.ok) return new Response(JSON.stringify({ error: 'DMM API returned an error.', status: response.status }), { status: 502, headers });
      let data;
      try { data = JSON.parse(body); } catch { return new Response(JSON.stringify({ error: 'DMM API response was not valid JSON.' }), { status: 502, headers }); }
      return new Response(JSON.stringify(data), { status: 200, headers });
    } catch {
      return new Response(JSON.stringify({ error: 'DMM API could not be reached.' }), { status: 502, headers });
    }
  }
};
