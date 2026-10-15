
document.addEventListener('DOMContentLoaded',()=>{
 const form=document.querySelector('[data-search-form]');
 if(form){form.addEventListener('submit',e=>{e.preventDefault();const q=(form.querySelector('[name="q"]')?.value||'').trim();const g=form.querySelector('[name="genre"]')?.value||'';const box=document.querySelector('#search-result');if(box){box.style.display='block';box.innerHTML='<h2>検索条件</h2><p><strong>キーワード：</strong>'+escapeHtml(q||'指定なし')+'</p><p><strong>ジャンル：</strong>'+escapeHtml(g||'指定なし')+'</p><p class="muted">現在はサイト構成の確認用デモです。実在作品のデータベース連携は未実装です。実際の作品情報を確認・取得できるようになってから掲載します。</p>';}})}
 function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
});
