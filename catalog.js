/* 4.7: public catalog renderer. catalog.json contains only verified, permitted data. */
(function(){
"use strict";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const tags=x=>Array.isArray(x)?x:[];
async function getCatalog(){
 try{const r=await fetch("catalog.json?v=47",{cache:"no-store"});if(!r.ok)throw 0;const d=await r.json();return {performers:Array.isArray(d.performers)?d.performers:[],works:Array.isArray(d.works)?d.works:[]};}
 catch(e){return {performers:[],works:[]};}
}
function card(p){return `<a class="actor-card" href="actor.html?id=${encodeURIComponent(p.id)}"><div class="actor-photo">${p.imageUrl?`<img src="${esc(p.imageUrl)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">`:'<span class="portrait-placeholder">PHOTO</span>'}</div><div class="actor-name">${esc(p.name)}</div><div class="actor-meta">${tags(p.tags).map(esc).join("・")||"登録情報"}</div></a>`}
function workCard(w,p){return `<a class="work" href="work-detail.html?id=${encodeURIComponent(w.id)}&actor=${encodeURIComponent((w.performerIds||[])[0]||"")}"><div class="thumb">${w.imageUrl?`<img src="${esc(w.imageUrl)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">`:"作品情報"}</div><div class="info"><h3>${esc(w.title)}</h3><p>${esc(p?.name||"出演者情報")}${tags(w.genres).length?" · "+tags(w.genres).map(esc).join("・"):""}</p></div></a>`}
function replaceNote(selector,msg){const n=document.querySelector(selector);if(n)n.textContent=msg}
document.addEventListener("DOMContentLoaded",async()=>{
 const d=await getCatalog();if(!d.performers.length&&!d.works.length)return;
 const byId=new Map(d.performers.map(p=>[p.id,p]));
 const actorsGrid=document.getElementById("actorGrid");
 if(actorsGrid){
  actorsGrid.innerHTML=d.performers.map(card).join("");
  const input=document.getElementById("actorSearch"),clear=document.getElementById("actorSearchClear"),status=document.getElementById("actorSearchStatus"),empty=document.getElementById("actorNoResults");
  const filter=()=>{const q=(input?.value||"").trim().toLocaleLowerCase();let n=0;[...actorsGrid.children].forEach(el=>{const ok=!q||el.textContent.toLocaleLowerCase().includes(q);el.hidden=!ok;if(ok)n++});if(status)status.textContent=`出演者 ${n}件を表示中`;if(empty)empty.hidden=n>0};
  input?.addEventListener("input",filter);clear?.addEventListener("click",()=>{input.value="";filter()});filter();
  replaceNote(".note","掲載情報は出典・確認日を記録した登録データです。画像は利用条件を確認したものだけを掲載しています。");
 }
 const profile=document.getElementById("actorWorks");
 if(profile){
  const id=new URLSearchParams(location.search).get("id"),p=byId.get(id);
  if(p){
   document.getElementById("actorName").textContent=p.name;document.getElementById("actorCrumb").textContent=p.name;
   document.getElementById("actorIntro").textContent=p.profile||"確認できたプロフィール情報はありません。";
   document.getElementById("actorFacts").innerHTML=tags(p.tags).map(t=>`<span>${esc(t)}</span>`).join("");
   const works=d.works.filter(w=>(w.performerIds||[]).includes(id));
   document.getElementById("workCount").textContent=`${works.length}件`;
   profile.innerHTML=works.map(w=>workCard(w,p)).join("")||"<p>登録作品はありません。</p>";
   const related=document.getElementById("relatedActors");
   if(related){
    const ranked=d.performers.filter(x=>x.id!==id).map(x=>{const common=tags(p.tags).filter(t=>tags(x.tags).includes(t));return {x,common}}).filter(x=>x.common.length).sort((a,b)=>b.common.length-a.common.length).slice(0,8);
    related.innerHTML=ranked.map(({x,common})=>`<a class="actor-card" href="actor.html?id=${encodeURIComponent(x.id)}"><div class="actor-photo">${x.imageUrl?`<img src="${esc(x.imageUrl)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">`:'<span class="portrait-placeholder">PHOTO</span>'}</div><div class="actor-name">${esc(x.name)}</div><div class="actor-meta">共通点 ${common.length}件：${common.map(esc).join("・")}</div></a>`).join("")||"<p>共通タグのある出演者はまだ登録されていません。</p>";
   }
   replaceNote(".note","関連候補は登録タグの一致数で表示しています。外見の類似を判定する機能ではありません。");
  }
 }
 const allGrid=document.getElementById("allWorksGrid");
 if(allGrid){
  const all=d.works.map(w=>({w,p:byId.get((w.performerIds||[])[0])}));const input=document.getElementById("workSearch"),clear=document.getElementById("workSearchClear"),status=document.getElementById("workDirectoryStatus"),empty=document.getElementById("workNoResults");
  const paint=()=>{const q=(input?.value||"").trim().toLocaleLowerCase();const shown=all.filter(({w,p})=>[w.title,(p?.name||""),tags(w.genres).join(" "),w.summary||""].join(" ").toLocaleLowerCase().includes(q));allGrid.innerHTML=shown.map(({w,p})=>workCard(w,p)).join("");if(status)status.textContent=`作品一覧 ${shown.length}件`;if(empty)empty.hidden=shown.length>0};
  input?.addEventListener("input",paint);clear?.addEventListener("click",()=>{input.value="";paint()});paint();
 }
 const title=document.getElementById("workTitle");
 if(title){
  const params=new URLSearchParams(location.search),w=d.works.find(x=>x.id===params.get("id"));
  if(w){const p=byId.get((w.performerIds||[]).find(id=>byId.has(id)));title.textContent=w.title;document.getElementById("workSummary").textContent=w.summary||"作品の紹介情報はありません。";const link=document.getElementById("workActorLink");if(p){link.textContent=p.name;link.href="actor.html?id="+encodeURIComponent(p.id);document.getElementById("backToActor").href=link.href;}const specs=[["出演者",p?.name||"未登録"],["ジャンル",tags(w.genres).join("・")||"未登録"],["発売・配信日",w.releaseDate||"未登録"],["収録時間",w.durationMinutes?`${w.durationMinutes}分`:"未登録"]];document.getElementById("workSpecs").innerHTML=specs.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");}
 }
});
})();