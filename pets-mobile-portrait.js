/* Keeps the Mission 3 "they" portrait proportional on mobile. */
(() => {
  const addPortrait = () => {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('.story-meadow .pronoun-choice[data-choice="they"] span.they').forEach((slot) => {
      const card = slot.closest('.pronoun-choice');
      card.style.setProperty('position', 'relative', 'important');
      card.style.setProperty('top', 'auto', 'important');
      card.style.setProperty('transform', 'none', 'important');
      card.style.setProperty('z-index', 'auto', 'important');
      card.style.setProperty('margin', '0', 'important');
      if (!card.querySelector('.mobile-story-they-label')) {
        const label = document.createElement('span');
        label.className = 'mobile-story-they-label';
        label.textContent = 'they';
        Object.assign(label.style, {
          position: 'absolute', zIndex: '20', bottom: '2px', left: '50%',
          transform: 'translateX(-50%)', padding: '0 6px', borderRadius: '99px',
          background: '#7548b1', color: '#fff', font: "800 11px 'Baloo 2'", lineHeight: '18px'
        });
        card.append(label);
      }
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
