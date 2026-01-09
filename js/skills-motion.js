const items = document.querySelectorAll(".skills-icons .skill-item");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let time = 0;

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  time += 0.08;

  items.forEach((item) => {
    const icon = item.querySelector("img");
    const rect = item.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const distance = Math.hypot(dx, dy);

    const radius = 300;   // mais largo = mais ícones reagem
    const maxLift = 30;  // sobe mais
    const maxScale = 0.8;    // escala estilo dock

    let influence = 0;

    if (distance < radius) {
      // curva exponencial (efeito dock)
      influence = Math.pow(1 - distance / radius, 3);
    }

    const lift = -influence * maxLift;
    const scale = 1 + influence * maxScale;

    icon.style.transform = `
      translateY(${lift}px)
      scale(${scale})
    `;
  });

  requestAnimationFrame(animate);
}

animate();
