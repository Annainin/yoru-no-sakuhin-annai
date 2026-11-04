document.addEventListener('DOMContentLoaded',()=>{const y=document.querySelectorAll('[data-current-year]');y.forEach(n=>n.textContent=String(new Date().getFullYear()));});
