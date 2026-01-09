function showSection(sectionId) {
  console.log('Navegando para seção:', sectionId); // Debug

  // Remove active e show de todas as seções
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active', 'show');
  });

  // Ativa a seção clicada
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.classList.add('active');

    // Pequeno delay para animação suave
    setTimeout(() => {
      targetSection.classList.add('show');
    }, 10);
  } else {
    console.error('Seção não encontrada:', sectionId);
  }
}