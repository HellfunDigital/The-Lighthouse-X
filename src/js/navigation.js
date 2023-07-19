const navLinks = [
  { name: 'Home', url: 'index.html' },
  { name: 'Lore', url: 'lore.html' },
  { name: 'Puzzles', url: 'puzzles.html' },
  { name: 'Clues', url: 'clues.html' },
];

function updateNavigation() {
  const navBar = document.getElementById('nav-bar');
  navBar.innerHTML = '';

  navLinks.forEach((link) => {
    const navItem = document.createElement('a');
    navItem.href = link.url;
    navItem.textContent = link.name;
    navBar.appendChild(navItem);
  });

  document.dispatchEvent(new CustomEvent('NAVIGATION_UPDATED'));
}

document.addEventListener('DOMContentLoaded', updateNavigation);