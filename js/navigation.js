function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  const target = document.getElementById(sectionId);

  if (!target) {
    console.error('Seção não encontrada:', sectionId);
    return;
  }

  // Esconde todas as sections corretamente
  sections.forEach(section => {
    section.classList.remove('active', 'show');
    section.style.display = 'none';
  });

  // Mostra a section alvo
  target.style.display = 'block';
  target.classList.add('active');

  // Força reflow para garantir animação
  target.offsetHeight;

  target.classList.add('show');

  // Fecha menu mobile se existir
  const mobileMenu = document.querySelector('.menu-mobile');
  const overlay = document.querySelector('.menu-overlay');
  const toggle = document.querySelector('.menu-toggle');

  if (mobileMenu) mobileMenu.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  if (toggle) toggle.classList.remove('active');

  // Garante scroll no topo da section
  window.scrollTo({ top: 0, behavior: 'smooth' });
}