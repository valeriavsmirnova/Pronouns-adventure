/* Extra hands-on part of Mission 3: bring friends to their animals. */
(() => {
  const friends=[['he','rabbit','0 0'],['she','elephant','100% 0'],['they','tiger','0 100%'],['it','frog','100% 100%'],['we','zebra','0 100%']];
  function addFriends(){const board=document.querySelector('.animal-board');if(!board||board.querySelector('.friend-row'))return;const row=document.createElement('div');row.className='friend-row';row.innerHTML=friends.map(([name,animal,pos])=>`<button class="friend-token" data-animal="${animal}"><span style="background-position:${pos}"></span><b>${name}</b></button>`).join('');board.append(row);row.querySelectorAll('.friend-token').forEach(token=>token.addEventListener('pointerdown',dragStart));}
  let drag=null, friendsFound=0, secondStage=false;
  function dragStart(e){e.preventDefault();drag=e.currentTarget;drag.classList.add('dragging');document.addEventListener('pointermove',dragMove);document.addEventListener('pointerup',dragEnd,{once:true});}
  function dragMove(e){if(!drag)return;const r=drag.closest('.animal-board').getBoundingClientRect();drag.style.transform=`translate(${e.clientX-r.left-drag.offsetLeft-drag.offsetWidth/2}px,${e.clientY-r.top-drag.offsetTop-drag.offsetHeight/2}px) scale(1.08)`;}
  function dragEnd(e){document.removeEventListener('pointermove',dragMove);if(!drag)return;const token=drag;drag=null;token.style.pointerEvents='none';const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.animal-target');if(target&&target.dataset.animal===token.dataset.animal){token.classList.remove('dragging');token.classList.add('friend-found');target.classList.add('celebrate');friendsFound++;try{sound('good')}catch(_){}if(friendsFound===5)setTimeout(()=>originalFinish(),650)}else{token.style.pointerEvents='';token.classList.remove('dragging');token.style.transform='';try{sound('bad')}catch(_){}}}
  new MutationObserver(addFriends).observe(document.getElementById('gameContent'),{childList:true,subtree:true});
  const originalRenderPets=renderPets;
  renderPets=()=>{secondStage=false;friendsFound=0;originalRenderPets()};
  const originalFinish=finish;
  finish=()=>{if(state.mission!=='pet'||secondStage)return originalFinish();secondStage=true;friendsFound=0;const board=document.querySelector('.animal-board');board.classList.add('part-two');document.querySelectorAll('.animal-clue').forEach(card=>card.classList.add('completed-clue'));const banner=document.createElement('div');banner.className='part-two-banner';banner.textContent='Part 2 — Move each friend to their animal!';board.append(banner);try{speak('Part two. Move each friend to their animal.')}catch(_){}};
})();
