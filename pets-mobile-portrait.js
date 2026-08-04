/* Keeps the Mission 3 "they" portrait proportional on mobile. */
(() => {
  const addPortrait = () => {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('.story-meadow .pronoun-choice[data-choice="they"] span.they').forEach((slot) => {
      const card = slot.closest('.pronoun-choice');
      card.style.setProperty('position', 'static', 'important');
      card.style.setProperty('top', 'auto', 'important');
      card.style.setProperty('transform', 'none', 'important');
      card.style.setProperty('z-index', 'auto', 'important');
      card.style.setProperty('margin', '0', 'important');
      if (slot.querySelector('.mobile-story-they')) return;
      const image = document.createElement('img');
      image.className = 'mobile-story-they';
      image.src = 'assets/owner-they-v3.png';
      image.alt = '';
      slot.append(image);
    });
  };

  new MutationObserver(addPortrait).observe(document.body, { childList: true, subtree: true });
  addPortrait();
})();
