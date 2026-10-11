/* EDIÇÃO MÉXICO: páginas exportadas integralmente do PDF original.
   Nenhuma imagem apresentada é uma receita fotografada e testada em cozinha. */
const sets={
  hero:[
    {page:1,alt:'Portada del libro Recetas ligeras para quienes usan tirzepatida'},
    {page:19,alt:'Omelette de espinaca y queso panela, página original'},
    {page:38,alt:'Ensalada de nopales, frijoles y huevo, página original'},
    {page:55,alt:'Sopa de tortilla con pollo, página original'},
    {page:74,alt:'Tostadas horneadas de tinga de pollo, página original'},
    {page:92,alt:'Calabacitas con elote y panela, página original'},
    {page:107,alt:'Albóndigas de pollo con puré de papa, página original'},
    {page:114,alt:'Combinaciones para siete días, página original'}],
  secondary:[
    {page:36,alt:'Pollo a la plancha con verduras, página original'},
    {page:20,alt:'Cinco pasos de preparación del omelette, página original'},
    {page:27,alt:'Huevos a la mexicana, página original'},
    {page:39,alt:'Pasos de la ensalada de nopales, página original'},
    {page:92,alt:'Calabacitas con elote y panela, página original'},
    {page:114,alt:'Combinaciones de comidas, página original'},
    {page:115,alt:'Combinaciones cuatro a siete, página original'}],
  included:[
    {page:1,alt:'Portada del libro, edición México'},
    {page:4,alt:'Índice interactivo de recetas'},
    {page:13,alt:'Cómo compartir bases de la cocina'},
    {page:66,alt:'Receta de cottage con jitomate y hierbas'},
    {page:81,alt:'Receta de textura suave'},
    {page:100,alt:'Apertura del capítulo cocina práctica'},
    {page:114,alt:'Propuestas para siete días'},
    {page:119,alt:'Contraportada del recetario'}]
};
const uri=p=>`assets/pag-${String(p).padStart(3,'0')}.webp`;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function bootStack(root){
  const name=root.dataset.stack,items=sets[name], slots=['left','center','right'].map(s=>root.querySelector(`[data-slot="${s}"]`));
  let index=0,timer=null,paused=false,timeout=null;
  function update(){
    const count=root.querySelector('.stack-count');
    // Páginas laterais atualizadas juntamente com a página central.
    const positions=[(index+items.length-1)%items.length,index,(index+1)%items.length];
    slots.forEach((slot,k)=>{
      const obj=items[positions[k]],img=slot.querySelector('img');
      if(img.getAttribute('src')!==uri(obj.page)){
        slot.classList.add('shifting');
        img.src=uri(obj.page);img.alt=obj.alt;
        if(img.complete){requestAnimationFrame(()=>slot.classList.remove('shifting'));}
        else img.onload=()=>slot.classList.remove('shifting');
      }
    });
    count.textContent=`${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
  }
  const start=()=>{clearInterval(timer);if(!reduced.matches&&!paused&&!document.hidden)timer=setInterval(()=>{index=(index+1)%items.length;update()},2500)};
  const stop=()=>clearInterval(timer);
  const manual=d=>{index=(index+d+items.length)%items.length;update();paused=true;stop();clearTimeout(timeout);timeout=setTimeout(()=>{paused=false;start()},9000)};
  root.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>manual(+b.dataset.dir)));
  root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);
  root.addEventListener('focusin',stop);root.addEventListener('focusout',start);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  reduced.addEventListener?.('change',start);
  update();start();
}
function bootCarousel(root){
  const viewport=root.querySelector('.carousel-window'),cards=[...root.querySelectorAll('.preview-card')],dots=document.querySelector('.carousel-dots');
  let index=0,timer=null,paused=false,resume=null;
  cards.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ver ficha ${i+1}`);b.addEventListener('click',()=>go(i,true));dots.appendChild(b)});
  const marks=[...dots.children];
  function go(i,manual=false){index=(i+cards.length)%cards.length;const c=cards[index];viewport.scrollTo({left:c.offsetLeft-cards[0].offsetLeft-(viewport.clientWidth-c.offsetWidth)/2,behavior:reduced.matches?'instant':'smooth'});marks.forEach((b,j)=>{b.classList.toggle('active',j===index);b.setAttribute('aria-current',j===index?'true':'false')});if(manual){paused=true;stop();clearTimeout(resume);resume=setTimeout(()=>{paused=false;start()},10000)}}
  function stop(){clearInterval(timer)}
  function start(){stop();if(!reduced.matches&&!paused&&!document.hidden)timer=setInterval(()=>go(index+1),2500)}
  root.querySelector('[data-carousel-prev]').addEventListener('click',()=>go(index-1,true));root.querySelector('[data-carousel-next]').addEventListener('click',()=>go(index+1,true));
  viewport.addEventListener('pointerdown',()=>{paused=true;stop();clearTimeout(resume);resume=setTimeout(()=>{paused=false;start()},10000)},{passive:true});
  root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);root.addEventListener('focusin',stop);root.addEventListener('focusout',start);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());reduced.addEventListener?.('change',start);
  addEventListener('resize',()=>go(index),{passive:true});go(0);start();
}
document.querySelectorAll('[data-stack]').forEach(bootStack);document.querySelectorAll('[data-carousel]').forEach(bootCarousel);
const sticky=document.getElementById('sticky'),offer=document.getElementById('oferta'),foot=document.querySelector('.page-footer');
let raf=0;function checkSticky(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const y=scrollY,off=offer.getBoundingClientRect(),ft=foot.getBoundingClientRect();sticky.classList.toggle('visible',y>680&&off.top>innerHeight*.3&&ft.top>innerHeight)})}
addEventListener('scroll',checkSticky,{passive:true});addEventListener('resize',checkSticky,{passive:true});checkSticky();
