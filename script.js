document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}}));

const box=document.querySelector('.photo-placeholder');
if(box){
  const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.id='photoUpload'; input.style='margin-top':'14px';
  input.style.cssText='margin-top:14px;max-width:240px;color:#9da7b2;font-size:11px';
  box.appendChild(input);
  input.addEventListener('change',e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader(); reader.onload=ev=>{
      let img=box.querySelector('img');
      if(!img){img=document.createElement('img');box.prepend(img)}
      img.src=ev.target.result;
      box.querySelector('span').textContent='PHOTO PREVIEW';
    }; reader.readAsDataURL(file);
  });
}