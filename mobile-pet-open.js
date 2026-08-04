/* Mobile fallback for opening Mission 3 from the adventure map. */
document.addEventListener('click', (event) => {
  const start = event.target.closest('[data-start="pet"]');
  if (!start || window.innerWidth > 760) return;
  setTimeout(() => {
    if (!document.getElementById('gameScreen').classList.contains('active')) openMission('pet');
  }, 0);
}, true);
