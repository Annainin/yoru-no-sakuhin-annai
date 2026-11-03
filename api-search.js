(function () {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const form = document.getElementById('officialSearchForm');
  if (!form) return;
  const input = document.getElementById('officialQuery');
  const button = document.getElementById('officialSearchButton');
  const status = document.getElementById('officialSearchStatus');
  const results = document.getElementById('officialResults');
  const empty = document.getElementById('officialNoResults');
  const notice = document.getElementById('apiSetupNotice');
  const base = (window.YORU_API_BASE_URL || '').trim().replace(/\/$/, '');
  if (!base) notice.innerHTML = '現在、API接続先が未設定です。<a href="api-integration-guide.html">API連携ガイド</a>の手順でWorkerを設定すると、ここで公式データを検索できます。';

  function getItems(data) {
    const raw = data && data.result && data.result.items && data.result.items.item;
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [raw];
  }
  function card(item) {
    const title = item.title || 'タイトル未取得';
    const image = item.imageURL && (item.imageURL.large || item.imageURL.list || item.imageURL.small);
    const link = item.affiliateURL || item.URL;
    const actors = item.iteminfo && item.iteminfo.actress;
    const names = Array.isArray(actors) ? actors.map(a => a.name).filter(Boolean).join('、') : '';
    const genre = item.iteminfo && item.iteminfo.genre;
    const genres = Array.isArray(genre) ? genre.map(g => g.name).filter(Boolean).slice(0, 3).join('・') : '';
    const date = item.date || '';
    const imageHtml = image ? '<img loading="lazy" src="' + esc(image) + '" alt="' + esc(title) + '">' : '<div class="api-image-placeholder">画像なし</div>';
    const body = '<div class="api-card-image">' + imageHtml + '</div><div class="info"><h3>' + esc(title) + '</h3><p>' + esc(names || '出演者情報なし') + '</p><p>' + esc(genres || 'ジャンル情報なし') + '</p><p>' + esc(date) + '</p></div>';
    return link ? '<a class="work api-work-card" href="' + esc(link) + '" target="_blank" rel="sponsored noopener noreferrer">' + body + '</a>' : '<article class="work api-work-card">' + body + '</article>';
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    if (!base) {
      status.textContent = 'API接続先が未設定です。先にAPI連携ガイドの設定を行ってください。';
      return;
    }
    button.disabled = true;
    results.innerHTML = '';
    empty.hidden = true;
    status.textContent = '公式データを検索しています…';
    try {
      const response = await fetch(base + '/?q=' + encodeURIComponent(q) + '&hits=12');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '検索に失敗しました。');
      const items = getItems(data);
      results.innerHTML = items.map(card).join('');
      status.textContent = '検索結果：' + items.length + '件';
      empty.hidden = items.length !== 0;
    } catch (error) {
      status.textContent = '検索できませんでした：' + error.message;
    } finally {
      button.disabled = false;
    }
  });
})();
