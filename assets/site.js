(function(){
 var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var prog=document.getElementById('progress');
 var toTop=document.getElementById('toTop');
 function onScroll(){
   var h=document.documentElement;
   var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
   if(prog)prog.style.width=(p*100)+'%';
   if(toTop)toTop.classList.toggle('show',h.scrollTop>500);
 }
 addEventListener('scroll',onScroll,{passive:true});onScroll();
 if(toTop)toTop.addEventListener('click',function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
 var els=document.querySelectorAll('.rv');
 if(!reduce&&'IntersectionObserver' in window){
   var io=new IntersectionObserver(function(es){
     es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
   },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
   els.forEach(function(el){io.observe(el)});
 } else { els.forEach(function(el){el.classList.add('in')}) }
 var hero=document.querySelector('.land-hero .poster-wrap img');
 if(hero&&!reduce){
   addEventListener('scroll',function(){
     var r=hero.getBoundingClientRect();
     if(r.bottom>0&&r.top<innerHeight){
       var off=(innerHeight-r.top)*0.06;
       hero.style.transform='translateY('+Math.min(off,90)+'px) scale(1.05)';
     }
   },{passive:true});
 }
 var counts=document.querySelectorAll('[data-count]');
 if(!reduce&&'IntersectionObserver' in window&&counts.length){
   var cio=new IntersectionObserver(function(es){
     es.forEach(function(e){
       if(!e.isIntersecting)return;cio.unobserve(e.target);
       var el=e.target,target=parseInt(el.dataset.count,10),t0=null;
       function step(t){if(!t0)t0=t;var k=Math.min((t-t0)/900,1);
         el.textContent=Math.round(target*(1-Math.pow(1-k,3)));
         if(k<1)requestAnimationFrame(step);}
       requestAnimationFrame(step);
     });
   },{threshold:.4});
   counts.forEach(function(el){cio.observe(el)});
 }
})();
