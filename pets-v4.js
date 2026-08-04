/* Mission 3 — person first, animal second. */
(() => {
  const stories = [
    ['His animal is white and can hop.', 'he', 'rabbit', '0 0'],
    ['Her animal is big, grey and has got a long nose.', 'she', 'elephant', '100% 0'],
    ['Their animal is orange with black stripes.', 'they', 'tiger', '0 100%'],
    ['Its animal is small, green and can hop.', 'it', 'frog', '100% 100%'],
    ['Our animal is black and white and has got stripes.', 'we', 'zebra', 'kids']
  ];
  const choices = [['they', '0 100%'], ['it', '100% 100%'], ['he', '0 0'], ['we', 'kids'], ['she', '100% 0']];
  const animals = [['elephant', 47, 54], ['tiger', 40, 70], ['zebra', 29, 87], ['rabbit', 20, 72], ['frog', 58, 71], ['monkey', 27, 54], ['dog', 76, 86], ['cat', 47, 85], ['giraffe', 68, 52], ['lion', 63, 85]];
  let round = 0, phase = 'person', locked = false;

  function how() {
    document.getElementById('modalContent').innerHTML = '<h2>Instructions</h2><p>Read the sentence. Choose the right person or group. Then tap the right animal.</p><button class="listen-btn" id="storyRead">Listen to instructions</button>';
    document.getElementById('modal').hidden = false;
    document.getElementById('storyRead').onclick = () => speak('Read the sentence. Choose the right person or group. Then tap the right animal.');
  }

  function render() {
    const story = stories[round];
    const stars = [0, 1, 2].map(i => `<i class="${state.roundStars > i ? 'on' : ''}">★</i>`).join('');
    const owners = choices.map(choice => {
      const word = choice[0];
      const className = choice[1] === 'kids' ? 'kids' : word;
      const position = choice[1] === 'kids' || word === 'they' ? '' : `background-position:${choice[1]}`;
      const theyArt = word === 'they' ? '<img class="mobile-story-they" src="assets/owner-they-v3.png" alt="">' : '';
      const theyLabel = word === 'they' ? '<span class="they-visible-label">they</span>' : '';
      return `<button class="pronoun-choice" data-choice="${word}"><span class="${className}" style="${position}">${theyArt}</span><b>${word}</b>${theyLabel}</button>`;
    }).join('');
    const targets = animals.map(animal => `<button class="story-target ${animal[0]}" data-animal="${animal[0]}" style="left:${animal[1]}%;top:${animal[2]}%" aria-label="${animal[0]}"></button>`).join('');
    common('Whose Animal Is This?', 'Read the sentence. Choose the right person or group, then choose the animal!', `<div class="story-status"><button class="story-how">Instructions</button><span>${stars}</span><b>${round + 1} / 5</b></div><div class="story-meadow"><div class="story-sentence"><p>${story[0]}</p><div class="story-result" aria-live="polite"></div></div>${targets}<div class="pronoun-choices">${owners}</div><div class="story-tip">Choose the person and then tap the animal!</div></div>`);
    document.querySelector('.story-how').onclick = how;
    document.querySelector('.speaker').onclick = () => speak(story[0]);
    document.querySelectorAll('.pronoun-choice').forEach(card => card.onclick = () => choosePerson(card, story));
    document.querySelectorAll('.story-target').forEach(target => target.onclick = () => chooseAnimal(target, story));
  }

  function choosePerson(card, story) {
    if (locked || phase !== 'person') return;
    if (card.dataset.choice !== story[1]) { card.classList.add('story-wrong'); sound('bad'); setTimeout(() => card.classList.remove('story-wrong'), 450); return; }
    sound('good'); phase = 'animal'; card.classList.add('story-correct');
    document.querySelectorAll('.pronoun-choice').forEach(card => card.disabled = true);
    const result = document.querySelector('.story-result');
    result.innerHTML = `<div class="story-person ${story[3] === 'kids' ? 'kids' : story[1]}" style="${story[3] === 'kids' || story[1] === 'they' ? '' : `background-position:${story[3]}`}"></div><div class="story-animal pending">?</div>`;
    requestAnimationFrame(() => { result.classList.add('show'); document.querySelector('.story-meadow').classList.add('choose-animal'); });
  }

  function chooseAnimal(target, story) {
    if (locked || phase !== 'animal') return;
    if (target.dataset.animal !== story[2]) { target.classList.add('animal-wrong'); sound('bad'); setTimeout(() => target.classList.remove('animal-wrong'), 420); return; }
    locked = true; sound('good'); target.classList.add('animal-picked');
    const box = document.querySelector('.story-animal');
    box.className = `story-animal ${story[2]} arrive`; box.textContent = '';
    state.roundStars = Math.min(3, state.roundStars + 1); document.getElementById('roundStars').textContent = state.roundStars;
    setTimeout(() => { round++; if (round === stories.length) { state.round = 3; finish(); } else { phase = 'person'; locked = false; render(); } }, 1250);
  }

  renderPets = () => { round = 0; phase = 'person'; locked = false; render(); dots(5); };
  games.pet.title = 'Whose Animal Is This?';
  document.getElementById('helpBtn').onclick = () => state.mission === 'pet' && how();
})();
