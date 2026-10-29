const toggle=document.querySelector('.mobile-toggle');
const mobile=document.querySelector('#mobile-nav');
function closeNav(){toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation');if(mobile)mobile.hidden=true;}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');mobile.hidden=open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile&&!mobile.hidden){closeNav();toggle.focus();}});
const hero=document.querySelector('.hero');
if(hero){
 const slides=[
  {category:'MEET YOUR NEXT COFFEE BREAK',title:'Good company.<br>Even better drinks.',copy:'Coffee, matcha, and something sweet.<br>Take your pick. Take your time.',color:'#01539d',ink:'#f7f4e9',letter:'#f9d644',name:'Iced coffee'},
  {category:'A LITTLE GREEN. A LITTLE PINK.',title:'Your matcha<br>kind of afternoon.',copy:'Strawberry Matcha Cream.<br>A good reason to take a break.',color:'#b8c99b',ink:'#0d174c',letter:'#01539d',name:'Strawberry Matcha Cream'},
  {category:'SOMETHING SWEET',title:'Chocolate.<br>Just because.',copy:'Snooze Chocolate.<br>For your non-coffee kind of day.',color:'#e8bfb5',ink:'#0d174c',letter:'#01539d',name:'Snooze Chocolate'}
 ];
 const cups=[...hero.querySelectorAll('[data-drink]')];
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,timer=null;
 function showSlide(index){
  current=(index+slides.length)%slides.length;
  cups.forEach((cup,i)=>{
   const offset=(i-current+slides.length)%slides.length;
   const position=offset===0?'center':offset===1?'right':'left';
   cup.classList.remove('drink--center','drink--left','drink--right');
   cup.classList.add(`drink--${position}`);
   cup.setAttribute('aria-pressed',String(offset===0));
   cup.setAttribute('aria-label',offset===0?`${slides[i].name}, featured drink`:`Feature ${slides[i].name}`);
  });
  const data=slides[current];
  hero.style.backgroundColor=data.color;
  hero.style.setProperty('--hero-ink',data.ink);
  hero.style.setProperty('--hero-letter',data.letter);
  document.querySelector('#slide-category').textContent=data.category;
  document.querySelector('#slide-title').innerHTML=data.title;
  document.querySelector('#slide-copy').innerHTML=data.copy;
  hero.dataset.activeDrink=String(current);
 }
 function syncTimer(){
  clearInterval(timer);timer=null;
  if(!motion.matches&&!document.hidden)timer=setInterval(()=>showSlide(current+1),4500);
 }
 function manualSlide(i){showSlide(i);syncTimer();}
 cups.forEach(cup=>cup.addEventListener('click',()=>manualSlide(Number(cup.dataset.drink))));
 document.addEventListener('visibilitychange',syncTimer);
 motion.addEventListener('change',syncTimer);
 hero.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();manualSlide(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();manualSlide(current-1);}});
 let touchX=0,touchY=0;
 hero.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX;touchY=e.changedTouches[0].screenY;},{passive:true});
 hero.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX,dy=e.changedTouches[0].screenY-touchY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy))manualSlide(current+(dx<0?1:-1));},{passive:true});
 showSlide(0);syncTimer();
}
for(const button of document.querySelectorAll('[data-filter]')){
 button.addEventListener('click',()=>{
  const cat=button.dataset.filter;
  for(const b of document.querySelectorAll('[data-filter]')){b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));}
  let count=0;
  for(const card of document.querySelectorAll('[data-category]')){card.hidden=cat!=='all'&&card.dataset.category!==cat;if(!card.hidden)count++;}
  const grid=document.querySelector('.menu-grid');
  grid.classList.toggle('single-result',count===1);grid.classList.toggle('two-results',count===2);
  document.querySelector('#result-count').textContent=`${count} ${count===1?'good reason':'good reasons'} to stop by`;
 });
}
