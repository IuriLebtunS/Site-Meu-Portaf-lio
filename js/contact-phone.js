document.addEventListener('DOMContentLoaded', () => {
  const phoneEl = document.querySelector('.contact-phone');
  if (!phoneEl) return;

  const phoneImg = phoneEl.querySelector('img');
  const phoneText = phoneEl.querySelector('.phone-number');
  const phoneNumber = phoneEl.dataset.phone;

  let buzzInterval;

  function startBuzz() {
    phoneEl.style.cursor = 'copy';

    buzzInterval = setInterval(() => {
      const x = Math.random() * 22 - 11;
      const y = Math.random() * 22 - 11;
      const r = Math.random() * 30 - 15;  // rotação forte

      phoneImg.style.transform =
        `translate(${x}px, ${y}px) rotate(${r}deg) scale(1.15)`;
    }, 30); // mais rápido = mais agressivo
  }

  function stopBuzz() {
    clearInterval(buzzInterval);

    phoneImg.style.transform =
      'translate(0, 0) rotate(0) scale(1)';
    phoneEl.style.cursor = 'default';
  }

  function copyPhone() {
    navigator.clipboard.writeText(phoneNumber);

    phoneText.textContent = 'NÚMERO COPIADO ✓';
    phoneText.classList.add('tech-text');

    setTimeout(() => {
      phoneText.textContent = 'COPIAR NÚMERO';
      phoneText.classList.remove('tech-text');
    }, 1500);
  }

  phoneEl.addEventListener('mouseenter', startBuzz);
  phoneEl.addEventListener('mouseleave', stopBuzz);
  phoneEl.addEventListener('click', copyPhone);
});
