(()=>{
const data={
'sample-a':{name:'出演者サンプル A',tags:['ドラマ','長編','高画質']},'sample-b':{name:'出演者サンプル B',tags:['ドラマ','シリーズ','高画質']},'sample-c':{name:'出演者サンプル C',tags:['VR','高画質','単体作品']},'sample-d':{name:'出演者サンプル D',tags:['総集編','長時間','シリーズ']},'sample-e':{name:'出演者サンプル E',tags:['ドキュメンタリー','単体作品','長編']},'sample-f':{name:'出演者サンプル F',tags:['ドラマ','長編','シリーズ']},'sample-g':{name:'出演者サンプル G',tags:['VR','高画質','シリーズ']},'sample-h':{name:'出演者サンプル H',tags:['ドキュメンタリー','単体作品','高画質']}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const select=document.getElementById('baseActor'),root=document.getElementById('relatedResults'),title=document.getElementById('relatedTitle');
function render(){const id=select.value,base=data[id];const list=Object.entries(data).filter(([k])=>k!==id).map(([key,item])=>({key,item,common:base.tags.filter(t=>item.tags.includes(t))})).filter(x=>x.common.length).sort((a,b)=>b.common.length-a.common.length||a.item.name.localeCompare(b.item.name,'ja'));
title.textContent=base.name+' と共通点のある出演者';root.innerHTML=list.map(x=>`<a class="actor-card" href="actor.html?id=${encodeURIComponent(x.key)}"><div class="actor-photo"><span class="portrait-placeholder">PHOTO</span><span class="sample">サンプル</span></div><div class="actor-name">${esc(x.item.name)}</div><div class="actor-meta">共通点 ${x.common.length}件：${esc(x.common.join('・'))}</div></a>`).join('')||'<p>共通点のある候補はありません。</p>'}
select.addEventListener('change',render);render();
})();
