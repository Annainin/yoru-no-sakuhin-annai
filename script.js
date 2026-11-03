
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


// 4.1.2: performer directory name search
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


// 4.2 performer profile and linked sample works
const sampleActors = {
  "sample-a": { tags:["ドラマ","長編","高画質"], name: "出演者サンプル A", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"a-01",title:"作品サンプル A-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"a-02",title:"作品サンプル A-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-b": { tags:["ドラマ","シリーズ","高画質"], name: "出演者サンプル B", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"b-01",title:"作品サンプル B-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"b-02",title:"作品サンプル B-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-c": { tags:["VR","高画質","単体作品"], name: "出演者サンプル C", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"c-01",title:"作品サンプル C-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"c-02",title:"作品サンプル C-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-d": { tags:["総集編","長時間","シリーズ"], name: "出演者サンプル D", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"d-01",title:"作品サンプル D-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"d-02",title:"作品サンプル D-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-e": { tags:["ドキュメンタリー","単体作品","長編"], name: "出演者サンプル E", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"e-01",title:"作品サンプル E-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"e-02",title:"作品サンプル E-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-f": { tags:["ドラマ","長編","シリーズ"], name: "出演者サンプル F", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"f-01",title:"作品サンプル F-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"f-02",title:"作品サンプル F-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-g": { tags:["VR","高画質","シリーズ"], name: "出演者サンプル G", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"g-01",title:"作品サンプル G-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"g-02",title:"作品サンプル G-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
  "sample-h": { tags:["ドキュメンタリー","単体作品","高画質"], name: "出演者サンプル H", intro: "プロフィール表示のサンプルです。実在の人物情報ではありません。", facts: ["プロフィール項目：準備中", "関連作品：サンプル2件"], works: [
    {id:"h-01",title:"作品サンプル H-01",summary:"作品情報カードの表示サンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"},
    {id:"h-02",title:"作品サンプル H-02",summary:"作品詳細ページへの遷移を確認するサンプルです。",genre:"ジャンルサンプル",date:"公開情報未登録",duration:"未登録"}
  ]},
};
function renderActorProfile(){
 const root=document.getElementById("actorWorks"); if(!root)return;
 const id=new URLSearchParams(location.search).get("id")||"sample-a";
 const actor=sampleActors[id];
 if(!actor){document.getElementById("actorName").textContent="出演者が見つかりません";document.getElementById("actorIntro").textContent="一覧ページから出演者を選び直してください。";root.innerHTML='<a class="link" href="actors.html">出演者一覧へ戻る</a>';return;}
 document.title=actor.name+"｜出演者詳細｜夜の作品案内所";
 document.getElementById("actorName").textContent=actor.name;document.getElementById("actorCrumb").textContent=actor.name;document.getElementById("actorIntro").textContent=actor.intro;
 document.getElementById("actorFacts").innerHTML=actor.facts.map(x=>'<span>'+esc(x)+'</span>').join("");
 document.getElementById("workCount").textContent=actor.works.length+"件（サンプル）";
 root.innerHTML=actor.works.map(w=>'<a class="work" href="work-detail.html?id='+encodeURIComponent(w.id)+'&actor='+encodeURIComponent(id)+'"><div class="thumb"><span>作品画像</span><span class="sample">サンプル</span></div><div class="info"><h3>'+esc(w.title)+'</h3><p>'+esc(w.genre)+' · '+esc(w.date)+'</p></div></a>').join("");
 const relatedRoot=document.getElementById("relatedActors");
 if(relatedRoot){
   const ranked=Object.entries(sampleActors).filter(([otherId])=>otherId!==id).map(([otherId,other])=>{
     const common=(actor.tags||[]).filter(tag=>(other.tags||[]).includes(tag));
     return {otherId,other,common,score:common.length};
   }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.other.name.localeCompare(b.other.name,"ja")).slice(0,4);
   relatedRoot.innerHTML=ranked.map(x=>'<a class="actor-card" href="actor.html?id='+encodeURIComponent(x.otherId)+'"><div class="actor-photo"><span class="portrait-placeholder">PHOTO</span><span class="sample">サンプル</span></div><div class="actor-name">'+esc(x.other.name)+'</div><div class="actor-meta">共通点 '+x.score+'件：'+esc(x.common.join("・"))+'</div></a>').join("")||'<p>共通データがありません。</p>';
 }
}
function renderWorkDetail(){
 const title=document.getElementById("workTitle");if(!title)return;
 const params=new URLSearchParams(location.search), wid=params.get("id")||"a-01", aid=params.get("actor")||"sample-a", actor=sampleActors[aid]||sampleActors["sample-a"];
 const work=actor.works.find(w=>w.id===wid)||actor.works[0];
 document.title=work.title+"｜作品詳細｜夜の作品案内所";title.textContent=work.title;document.getElementById("workSummary").textContent=work.summary;
 document.getElementById("workActorLink").textContent=actor.name;document.getElementById("workActorLink").href="actor.html?id="+encodeURIComponent(aid);document.getElementById("backToActor").href="actor.html?id="+encodeURIComponent(aid);
 const specs=[["出演者",actor.name],["ジャンル",work.genre],["配信・発売日",work.date],["収録時間",work.duration]];document.getElementById("workSpecs").innerHTML=specs.map(([k,v])=>'<div><dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd></div>').join("");
}
document.addEventListener("DOMContentLoaded",()=>{renderActorProfile();renderWorkDetail();});

// 4.3: searchable all-works directory built from the shared performer/work data.
function renderAllWorksDirectory() {
  const grid = document.getElementById('allWorksGrid');
  if (!grid) return;
  const input = document.getElementById('workSearch');
  const clear = document.getElementById('workSearchClear');
  const status = document.getElementById('workDirectoryStatus');
  const empty = document.getElementById('workNoResults');
  const all = [];
  Object.entries(sampleActors).forEach(([actorId, actor]) => {
    actor.works.forEach(work => all.push({ ...work, actorId, actorName: actor.name }));
  });
  function paint() {
    const q = (input ? input.value : '').trim().toLocaleLowerCase();
    const shown = all.filter(w => [w.title, w.actorName, w.genre, w.summary].join(' ').toLocaleLowerCase().includes(q));
    grid.innerHTML = shown.map(w => '<a class="work" href="work-detail.html?id=' + encodeURIComponent(w.id) + '&actor=' + encodeURIComponent(w.actorId) + '"><div class="thumb"><span>作品画像</span><span class="sample">サンプル</span></div><div class="info"><h3>' + esc(w.title) + '</h3><p>' + esc(w.actorName) + ' · ' + esc(w.genre) + '</p></div></a>').join('');
    if (status) status.textContent = q ? '検索結果 ' + shown.length + '件' : '作品一覧 ' + shown.length + '件';
    if (empty) empty.hidden = shown.length !== 0;
  }
  if (input) input.addEventListener('input', paint);
  if (clear) clear.addEventListener('click', () => { input.value = ''; paint(); input.focus(); });
  paint();
}
document.addEventListener('DOMContentLoaded', renderAllWorksDirectory);
