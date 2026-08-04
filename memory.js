/* Pronoun Quest: a twelve-card adventure memory game. */
(() => {
  const cardsForGame = [
    {pair:'i-my',word:'I',asset:0},{pair:'i-my',word:'my',asset:1},
    {pair:'you-your',word:'you',asset:2},{pair:'you-your',word:'your',asset:3},
    {pair:'he-his',word:'he',asset:4},{pair:'he-his',word:'his',asset:5},
    {pair:'she-her',word:'she',asset:6},{pair:'she-her',word:'her',asset:7},
    {pair:'it-its',word:'it',asset:8},{pair:'it-its',word:'its',asset:9},
    {pair:'we-our',word:'we',asset:10},{pair:'we-our',word:'our',asset:11}
  ];
  let firstCard = null, isLocked = false;
  const updateMissionCard = () => { const card=document.querySelector('.mission-one'); if(!card)return; card.querySelector('h2').textContent='Pronoun Quest'; card.querySelector('p').textContent='Turn the cards and match each pronoun pair.'; card.querySelector('.meta span').textContent='Grammar: I–my · you–your · he–his'; };
  const renderMemory = () => {
    const cards=[...cardsForGame].sort(()=>Math.random()-.5); firstCard=null; isLocked=true;
    common('Pronoun Quest','Memory Meadow — look carefully, then match each pronoun with its special word: I–my, you–your, he–his, she–her, it–its, we–our.',`<div class="memory-tip"><b>1</b> Find all six pronoun pairs</div><div class="memory-board memory-board-v2">${cards.map((card,index)=>`<button class="memory-card open" data-pair="${card.pair}" data-index="${index}" aria-label="Memory card"><span class="face back"></span><span class="face front"><span class="card-word">${card.word}</span><span class="memory-picture" style="background-image:url('assets/memory-card-${card.asset}.png')"></span></span></button>`).join('')}</div>`);
    dots(6);
    setTimeout(()=>{document.querySelectorAll('.memory-card').forEach(card=>card.classList.remove('open'));isLocked=false},1700);
    document.querySelectorAll('.memory-card').forEach(card=>card.addEventListener('click',()=>selectMemoryCard(card)));
  };
  const selectMemoryCard = card => { if(isLocked||card.classList.contains('open')||card.classList.contains('matched'))return; sound('click');card.classList.add('open');if(!firstCard){firstCard=card;return}isLocked=true;const match=firstCard.dataset.pair===card.dataset.pair;if(match){setTimeout(()=>{firstCard.classList.add('matched');card.classList.add('matched');state.roundStars++;state.round++;document.getElementById('roundStars').textContent=state.roundStars;dots(6);sound('good');firstCard=null;isLocked=false;if(!document.querySelector('.memory-card:not(.matched)'))setTimeout(finish,550)},350)}else{sound('bad');card.classList.add('wrong');firstCard.classList.add('wrong');setTimeout(()=>{card.classList.remove('open','wrong');firstCard.classList.remove('open','wrong');firstCard=null;isLocked=false},850)}};
  games.pronoun.title='Pronoun Quest'; renderPronoun=renderMemory; updateMissionCard();
  document.getElementById('helpBtn').onclick=()=>{document.getElementById('modalContent').innerHTML=`<h2>How to play: Memory Meadow</h2><p>Remember every card. Turn two cards at a time to match all six pairs: I–my, you–your, he–his, she–her, it–its and we–our.</p><ul><li>Watch the cards before they turn over.</li><li>Match all six pairs.</li><li>Complete the meadow to earn three stars.</li></ul><button class="listen-btn" data-read="Match all six pronoun pairs: I and my, you and your, he and his, she and her, it and its, we and our.">Listen to instructions</button>`;document.getElementById('modal').hidden=false;document.querySelector('#modalContent [data-read]').onclick=e=>speak(e.currentTarget.dataset.read)};
})();
