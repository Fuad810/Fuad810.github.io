// Smooth scroll for in-page links (also closes mobile menu if open)
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const el=document.querySelector(a.getAttribute("href"));
  if(el){
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth"});
    document.body.classList.remove('menu-open');
  }
}));

// Mobile hamburger menu
const navEl=document.querySelector('.nav');
const menuBtn=document.querySelector('.menu-toggle');
if(menuBtn&&navEl){
  menuBtn.addEventListener('click',()=>{
    document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded',document.body.classList.contains('menu-open'));
  });
}

// Sticky nav shadow + scroll-spy active link
const sections=[...document.querySelectorAll('main section[id], main [id]')].filter(s=>s.id);
const navLinks=[...document.querySelectorAll('.nav nav a[href^="#"]')];
const onScroll=()=>{
  navEl.classList.toggle('scrolled',window.scrollY>10);
  let current=sections[0]?.id;
  for(const s of sections){
    if(window.scrollY+120>=s.offsetTop) current=s.id;
  }
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
};
document.addEventListener('scroll',onScroll,{passive:true});
onScroll();

// Reveal-on-scroll animation
const revealTargets=document.querySelectorAll('.section, .expertise, .contact');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  revealTargets.forEach(el=>{el.classList.add('reveal');io.observe(el)});
}

// Back-to-top button
const topBtn=document.querySelector('.to-top');
if(topBtn){
  window.addEventListener('scroll',()=>{
    topBtn.classList.toggle('show',window.scrollY>500);
  },{passive:true});
  topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
