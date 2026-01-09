document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuMobile = document.querySelector('.menu-mobile');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuButtons = document.querySelectorAll('.menu-mobile button');

  // Função para abrir/fechar menu
  function toggleMenu() {
    menuToggle.classList.toggle('active');
    menuMobile.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Previne scroll quando menu aberto
    if (menuMobile.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Função para fechar menu
  function closeMenu() {
    menuToggle.classList.remove('active');
    menuMobile.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click no botão hamburguer
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Click no overlay (fundo escuro) fecha o menu
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  // Click em qualquer botão do menu fecha o menu
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeMenu();
      // A navegação entre seções será feita pela função original do seu site
    });
  });

  // Fecha menu ao pressionar ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuMobile.classList.contains('active')) {
      closeMenu();
    }
  });
});