(() => {
  const map = document.querySelector('#homeScreen .map');
  const how = document.querySelector('#homeScreen .how-card');
  const read = text => { if (typeof speak === 'function') speak(text); };
  const missions = [
    { id:'pronoun', cls:'one', number:'MISSION 1', title:'Pronoun Quest', type:'Memory Meadow', desc:'Turn the cards and find every matching pair.', grammar:'I–my · he–his · she–her', how:'Turn two cards at a time. Find I and my, he and his, she and her to complete the meadow.' },
    { id:'dress', cls:'two', number:'MISSION 2', title:'Dress the Character', type:'Adventure Wardrobe', desc:'Read the word on the clothes and find the owner.', grammar:'his · her · their · its', how:'Look at the clothes, read the word and tap the correct owner. Earn three stars!' },
    { id:'pet', cls:'three', number:'MISSION 3', title:'Pet Match', type:'Trail Friends', desc:'Connect every pet with the right owner.', grammar:'my · your · his · her · our · their', how:'Tap a pet, then tap its owner. Connect all three correct pairs to finish the trail.' }
  ];
  Object.assign(missions[0], {
    desc:'Turn two cards and find every matching pronoun pair.',
    grammar:'I–my · you–your · he–his · she–her · it–its · we–our',
    how:'Turn over two cards at a time. Find all six pronoun pairs: I–my, you–your, he–his, she–her, it–its and we–our.'
  });
  Object.assign(missions[1], {
    desc:'Read the word on the item and choose its owner.',
    grammar:'his · her · their · its',
    how:'Read the word on the clothing. Then tap the correct owner: he, she, they or it. The item flies to its owner after a correct answer.'
  });
  Object.assign(missions[2], {
    title:'Whose Animal?', type:'Animal Meadow',
    desc:'Read the sentence, choose the person or group, then tap the animal.',
    grammar:'he · she · they · it · we',
    how:'Read the sentence. First choose the correct person, group or character. Then tap the animal that matches the description.'
  });
  const makeCard = mission => `<article class="adventure-card ${mission.cls} map-card-${mission.cls}"><span class="mission-banner">${mission.number}</span><div class="mission-art" role="img" aria-label="${mission.title} illustration"></div><h2>${mission.title}</h2><span class="game-type">${mission.type}</span><p>${mission.desc}</p><span class="grammar">${mission.grammar}</span><div class="card-actions"><button class="start-card" data-start="${mission.id}">START</button><button class="play-card" data-how="${mission.id}">HOW TO PLAY</button></div></article>`;
  map.innerHTML = `<svg class="route-line" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M250 190 C350 175 370 245 450 250 S590 315 660 305 S760 370 850 410"/><path class="route-glow" d="M250 190 C350 175 370 245 450 250 S590 315 660 305 S760 370 850 410"/></svg>${missions.map(makeCard).join('')}<span class="route-step one">1</span><span class="route-step two">2</span><span class="route-step three">3</span><article class="finish-card"><div class="finish-cup"></div><h2>You did it!</h2><p>Complete all missions to unlock your explorer reward.</p><button data-finish>VIEW REWARD</button></article>`;
  if (how) how.innerHTML = `<h2>How to play</h2><p><span class="how-icon">1</span>Choose a mission</p><p><span class="how-icon blue">2</span>Read or listen</p><p><span class="how-icon green">3</span>Play and learn</p><p><span class="how-icon gold">★</span>Earn stars</p><button class="listen-btn" data-read="Welcome, explorer. Choose a mission, listen carefully and earn stars on your adventure.">Read instructions</button>`;
  document.querySelectorAll('[data-start]').forEach(button => button.addEventListener('click', () => openMission(button.dataset.start)));
  document.querySelectorAll('[data-how]').forEach(button => button.addEventListener('click', () => {
    const mission = missions.find(item => item.id === button.dataset.how);
    document.getElementById('modalContent').innerHTML = `<h2>How to play</h2><p>${mission.how}</p><ul><li>Listen to the task.</li><li>Play, explore and collect three stars.</li><li>Return to the map at any time.</li></ul><button class="listen-btn" data-modal-read>Listen to instructions</button>`;
    document.getElementById('modal').hidden = false;
    document.querySelector('[data-modal-read]').onclick = () => read(mission.how);
  }));
  document.querySelector('[data-finish]').onclick = () => { const complete = Object.keys(state.missions).length >= 3; document.getElementById('modalContent').innerHTML = complete ? `<div class="certificate"><span>ENGLISH ADVENTURE PARK</span><h2>Champion Certificate</h2><p>This certificate celebrates a brilliant explorer who completed all three Adventure Park missions.</p><b>Well done, Explorer!</b><div class="certificate-stars">★ ★ ★</div></div>` : `<h2>Finish reward</h2><p>Complete all three missions to unlock the Adventure Park champion certificate.</p>`; document.getElementById('modal').hidden = false; };
  document.querySelectorAll('[data-read]').forEach(button => button.onclick = e => read(e.currentTarget.dataset.read));
  // Keep the toolbar help button in sync with the current version of every game.
  document.getElementById('helpBtn').onclick = () => {
    if (state.mission === 'dress') return document.querySelector('.wardrobe-instructions')?.click();
    if (state.mission === 'pet') return document.querySelector('.story-how')?.click();
    if (state.mission === 'pronoun') {
      document.getElementById('modalContent').innerHTML = '<h2>How to play: Memory Meadow</h2><p>Turn over two cards at a time and find all six matching pronoun pairs.</p><ul><li>Tap one card, then tap a second card.</li><li>Match I–my, you–your, he–his, she–her, it–its and we–our.</li><li>Find every pair to earn three stars.</li></ul><button class="listen-btn" id="toolbarMemoryRead">Listen to instructions</button>';
      document.getElementById('modal').hidden = false;
      document.getElementById('toolbarMemoryRead').onclick = () => read('Turn over two cards at a time. Match all six pronoun pairs: I and my, you and your, he and his, she and her, it and its, we and our.');
    }
  };
  // Toolbar artwork is supplied by CSS; keep the semantic controls text-free.
})();
