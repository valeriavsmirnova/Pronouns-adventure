/* Restores the proportional people portrait in Mission 3 on mobile. */
(() => {
  const mount = () => {
    if (window.innerWidth > 760) return;
    document.querySelectorAll('.story-meadow .pronoun-choice[data-choice="they"] span.they').forEach((slot) => {
      if (slot.querySelector('.mobile-story-they-image')) return;
      const image = document.createElement('img');
      image.className = 'mobile-story-they-image';
      image.src = 'assets/owner-they-v3.png';
      image.alt = '';
      slot.append(image);
    });
  };
  new MutationObserver(mount).observe(document.getElementById('gameContent'), { childList: true, subtree: true });
  mount();
})();
