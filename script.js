const $=s=>document.querySelector(s);
const form=$('#birthdayForm'), recipient=$('#recipient'), sender=$('#sender'), message=$('#message'), date=$('#date'), theme=$('#theme');
const modal=$('#modal'), modalRecipient=$('#modalRecipient'), modalSender=$('#modalSender'), modalMessage=$('#modalMessage');
const passwordModal=$('#passwordModal'), passwordForm=$('#passwordForm'), videoPassword=$('#videoPassword'), passwordError=$('#passwordError'), videoCard=$('#videoCard'), birthdayVideo=$('#birthdayVideo');
const params=new URLSearchParams(location.search);

function decodeState(){
  if(params.get('r')) recipient.value=params.get('r');
  if(params.get('s')) sender.value=params.get('s');
  if(params.get('m')) message.value=params.get('m');
  if(params.get('d')) date.value=params.get('d');
  if(params.get('t')) theme.value=params.get('t');
  updateCounter();
}
function updateCounter(){ $('#counter').textContent=message.value.length; }
message.addEventListener('input',updateCounter);
function openSurprise(){
  const r=recipient.value.trim()||'you', s=sender.value.trim()||'me', m=message.value.trim()||'Wishing you a beautiful birthday filled with laughter, love, and all the little things that make you smile.';
  modalRecipient.textContent=r; modalSender.textContent=s; modalMessage.textContent=m;
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  for(let i=0;i<36;i++){const el=document.createElement('span');el.className='burst';el.textContent=['♥','✦','•','♡'][i%4];el.style.left=(Math.random()*100)+'%';el.style.top=(-10-Math.random()*20)+'%';el.style.animationDelay=(Math.random()*.6)+'s';document.querySelector('.confetti').appendChild(el)}
}
function closeSurprise(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';document.querySelectorAll('.burst').forEach(x=>x.remove())}
form.addEventListener('submit',e=>{e.preventDefault(); if(!form.reportValidity())return; history.replaceState({},'',buildUrl()); openSurprise(); document.querySelector('#surprise').scrollIntoView({behavior:'smooth',block:'center'});});
$('#revealBtn').addEventListener('click',openSurprise);
$('#closeModal').addEventListener('click',closeSurprise);
modal.addEventListener('click',e=>{if(e.target===modal)closeSurprise()});

// Password-protected birthday video. This is a client-side lock for a personal surprise.
function openPassword(){
  passwordError.textContent='';
  videoPassword.value='';
  passwordModal.classList.add('show');
  passwordModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>videoPassword.focus(),100);
}
function closePassword(){
  passwordModal.classList.remove('show');
  passwordModal.setAttribute('aria-hidden','true');
  if(!modal.classList.contains('show')) document.body.style.overflow='';
}
$('#videoLockBtn').addEventListener('click',openPassword);
$('#closePassword').addEventListener('click',closePassword);
passwordModal.addEventListener('click',e=>{if(e.target===passwordModal)closePassword()});
passwordForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(videoPassword.value === '1209'){
    closePassword();
    videoCard.hidden=false;
    videoCard.classList.add('video-unlocked');
    $('#videoLockBtn').textContent='🎬 Play Special Adorable Video';
    videoCard.scrollIntoView({behavior:'smooth',block:'center'});
  }else{
    passwordError.textContent='That password is not quite right. Try again. ❤️';
    videoPassword.select();
  }
});
$('#closeVideoBtn').addEventListener('click',()=>{birthdayVideo.pause(); videoCard.hidden=true; $('#videoLockBtn').textContent='🔒 Open Special Adorable Video';});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSurprise()});
function buildUrl(){const p=new URLSearchParams({r:recipient.value.trim(),s:sender.value.trim(),m:message.value.trim(),t:theme.value});if(date.value)p.set('d',date.value);return location.origin+location.pathname+'?'+p.toString()}
$('#shareBtn').addEventListener('click',async()=>{const url=buildUrl();try{await navigator.clipboard.writeText(url);$('#shareStatus').textContent='✓ Birthday link copied! Send it to your special person.'}catch{prompt('Copy your birthday link:',url)}});
// Gentle floating hearts
const fh=$('.floating-hearts'); for(let i=0;i<14;i++){const h=document.createElement('span');h.className='heart';h.textContent=['♡','♥','✦'][i%3];h.style.left=(Math.random()*100)+'%';h.style.animationDelay=(-Math.random()*8)+'s';h.style.animationDuration=(6+Math.random()*6)+'s';fh.appendChild(h)}
// Theme variations
function applyTheme(v){const root=document.documentElement;if(v==='sunset'){root.style.setProperty('--accent','#d85a38');root.style.setProperty('--accent2','#f07c4e');root.style.setProperty('--bg','#fff1e4')}else if(v==='midnight'){root.style.setProperty('--accent','#a955c7');root.style.setProperty('--accent2','#d56ce5');root.style.setProperty('--bg','#f3eafa')}else{root.style.setProperty('--accent','#c5284d');root.style.setProperty('--accent2','#ef4c68');root.style.setProperty('--bg','#fff2ed')}}
theme.addEventListener('change',()=>applyTheme(theme.value));decodeState();applyTheme(theme.value);
