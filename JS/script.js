function showSection(id) {
  const sections = document.querySelectorAll('.section');

  sections.forEach(sec => {
    sec.classList.remove('active', 'show');
    sec.style.display = 'none';
  });

  const section = document.getElementById(id);

  section.style.display = 'block';
  section.classList.add('active');

  requestAnimationFrame(() => {
    section.classList.add('show');
  });
}