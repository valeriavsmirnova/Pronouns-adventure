/* Direct touch launcher for Mission 3 on mobile. */
(() => {
  const launchPet = (event) => {
    const start = event.target.closest('[data-start="pet"]');
    if (!start || window.innerWidth > 760) return;
    event.preventDefault();
    state.mission = 'pet';
    state.round = 0;
    state.roundStars = 0;
    document.getElementById('roundStars').textContent = '0';
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    renderPets();
  };
  document.addEventListener('touchend', launchPet, { capture: true, passive: false });
  document.addEventListener('click', launchPet, true);
})();
