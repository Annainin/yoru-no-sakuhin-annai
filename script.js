
const demoWorks = [
{tags:["ドラマ","長編"]},{tags:["高画質","単体作品"]},{tags:["VR","映像形式"]},{tags:["総集編","長時間"]},{tags:["ドキュメンタリー","単体作品"]},{tags:["シリーズ","長編"]},{tags:["新着","高画質"]},{tags:["人気","シリーズ"]},{tags:["ドラマ","シリーズ"]},{tags:["VR","高画質"]},{tags:["総集編","長時間"]},{tags:["ドキュメンタリー","単体作品"]}
];
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(filter){let nodes=[...document.querySelectorAll('.work')];nodes.forEach((n,i)=>{n.style.display=(filter==='all'||demoWorks[i].tags.includes(filter))?'':'none';});}
document.addEventListener('DOMContentLoaded',()=>{
 const params=new URLSearchParams(location.search), g=params.get('genre')||'', q=params.get('q')||'';
 const title=document.querySelector('#page-title'), subtitle=document.querySelector('#page-subtitle'), rt=document.querySelector('#result-title'), form=document.querySelector('#search-form');
 if(g){document.querySelector('#genre').value=g;if(title)title.textContent='ジャンル：'+g;if(subtitle)subtitle.textContent='選択したジャンルの作品一覧';if(rt)rt.textContent='ジャンル：'+g+' の作品';}
 if(q){document.querySelector('#q').value=q;if(title)title.textContent='検索結果：'+q;}
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const p=new URLSearchParams();let term=document.querySelector('#q').value.trim(),gen=document.querySelector('#genre').value;if(term)p.set('q',term);if(gen)p.set('genre',gen);location.href='search.html?'+p.toString();});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter);if(rt)rt.textContent=(b.dataset.filter==='all'?'作品一覧':b.dataset.filter+'の作品')+'（表示見本）';}));
});

\n// 4.1.1: performer directory name search
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("actorSearch");
  const clear = document.getElementById("actorSearchClear");
  const grid = document.getElementById("actorGrid");
  if (!input || !grid) return;
  const cards = Array.from(grid.querySelectorAll(".actor-card"));
  const status = document.getElementById("actorSearchStatus");
  const empty = document.getElementById("actorNoResults");
  function filterActors() {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
      const name = (card.dataset.actorName || card.textContent).toLocaleLowerCase();
      const match = !query || name.includes(query);
      card.hidden = !match;
      if (match) visible++;
    });
    if (status) status.textContent = query
      ? "検索結果：" + visible + "件"
      : "出演者サンプル " + visible + "件を表示中";
    if (empty) empty.hidden = visible !== 0;
  }
  input.addEventListener("input", filterActors);
  if (clear) clear.addEventListener("click", function () {
    input.value = "";
    filterActors();
    input.focus();
  });
});
