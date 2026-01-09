/* =====================================================
   ELEMENTOS
===================================================== */
const isMobile = window.matchMedia('(max-width: 768px)').matches;

const items = document.querySelectorAll(".skills-icons .skill-item");
const sonic = document.getElementById("sonic");
const skills = document.querySelectorAll(".skill-item");
const statsCard = document.querySelector(".stats-card");
const donuts = document.querySelectorAll(".donut");

/* =====================================================
   MOUSE DOCK EFFECT (SKILLS)
===================================================== */
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
let time = 0;

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animateDock() {
  time += 0.08;

  items.forEach(item => {
    const icon = item.querySelector("img");
    const rect = item.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const distance = Math.hypot(dx, dy);

    const radius = 300;
    const maxLift = 30;
    const maxScale = 0.8;

    let influence = 0;
    if (distance < radius) {
      influence = Math.pow(1 - distance / radius, 3);
    }

    icon.style.transform = `
      translateY(${-influence * maxLift}px)
      scale(${1 + influence * maxScale})
    `;
  });

  requestAnimationFrame(animateDock);
}

if (!isMobile) {
  animateDock();
}

/* =====================================================
   SONIC – ESTADO
===================================================== */
let normalPasses = 0;
let superPasses = 0;
let isSuperSonic = false;
let isShaking = false;
let ignoreNextIteration = false;

/* =====================================================
   CONFIG
===================================================== */
const NORMAL_PASSES_TO_SUPER = 3;
const SUPER_PASSES_LIMIT = 2;

const IMPACT_RADIUS = 120;
const BASE_LIFT = 18;
const SUPER_MULTIPLIER = 1.8;

/* =====================================================
   UTIL
===================================================== */
function getExperienceMultiplier(skill) {
  const level = skill.dataset.level || "";
  if (level.includes("3")) return 1.3;
  if (level.includes("5")) return 1.6;
  return 1.1;
}

/* =====================================================
   SONIC IMPACT NAS SKILLS
===================================================== */
function animateSonicImpact() {
  const sonicRect = sonic.getBoundingClientRect();
  const sonicCenterX = sonicRect.left + sonicRect.width / 2;

  skills.forEach(skill => {
    const rect = skill.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(centerX - sonicCenterX);

    if (distance < IMPACT_RADIUS) {
      const influence = 1 - distance / IMPACT_RADIUS;
      const power =
        BASE_LIFT *
        influence *
        getExperienceMultiplier(skill) *
        (isSuperSonic ? SUPER_MULTIPLIER : 1);

      skill.style.transform = `
        translateY(${-power}px)
        rotate(${(Math.random() - 0.5) * 6}deg)
      `;
    } else {
      skill.style.transform = "translateY(0)";
    }
  });

  requestAnimationFrame(animateSonicImpact);
}

if (!isMobile && sonic) {
  animateSonicImpact();
}

/* =====================================================
   CONTROLE DE VOLTAS DO SONIC
===================================================== */
if (!isMobile && sonic) {
sonic.addEventListener("animationiteration", () => {

  if (ignoreNextIteration) {
    ignoreNextIteration = false;
    return;
  }

  if (!isSuperSonic) {
    normalPasses++;

    if (normalPasses === NORMAL_PASSES_TO_SUPER) {
      isSuperSonic = true;
      isShaking = true;

      normalPasses = 0;
      superPasses = 0;
      ignoreNextIteration = true;

      sonic.style.animationDuration = "4s";
      sonic.style.filter = "drop-shadow(0 0 12px gold)";
    }
    return;
  }

  superPasses++;

  if (superPasses === SUPER_PASSES_LIMIT) {
    isSuperSonic = false;
    isShaking = false;
    superPasses = 0;
    ignoreNextIteration = true;

    sonic.style.animationDuration = "8s";
    sonic.style.filter = "drop-shadow(0 6px 8px rgba(0,0,0,.7))";
    resetShake();
  }
});}

const runner = document.querySelector(".skills-runner");
const sonic2 = document.getElementById("sonic");

function updateSonicTrack() {
  const trackWidth = runner.offsetWidth;
  const sonicWidth = sonic.offsetWidth;

  const speedPxPerSecond = 260; // velocidade REAL do Sonic

  const distance = trackWidth + sonicWidth * 2;
  const duration = distance / speedPxPerSecond;

  runner.style.setProperty("--sonic-start", `-${sonicWidth}px`);
  runner.style.setProperty("--sonic-end", `${trackWidth}px`);

  sonic.style.animationDuration = `${duration}s`;
}

if (!isMobile && runner && sonic) {
  updateSonicTrack();
  window.addEventListener("resize", updateSonicTrack);
}

/* =====================================================
   SHAKE (SÓ NO SUPER SONIC)
===================================================== */
function turboShake() {
  if (!isShaking) {
    requestAnimationFrame(turboShake);
    return;
  }

  statsCard.style.transform = `
    translateX(-20px)
    translate(${(Math.random() - .5) * 10}px, ${(Math.random() - .5) * 6}px)
    rotate(${(Math.random() - .5) * 2}deg)
    scale(1.03)
  `;

  donuts.forEach(donut => {
    donut.style.transform = `
      translate(${(Math.random() - .5) * 8}px, ${(Math.random() - .5) * 8}px)
      scale(1.08)
    `;
  });

  requestAnimationFrame(turboShake);
}

function resetShake() {
  statsCard.style.transform = "translateX(-20px)";
  donuts.forEach(d => d.style.transform = "none");
}

if (!isMobile) {
  turboShake();
}

/* =====================================================
   DONUTS – percent via CSS var
===================================================== */
donuts.forEach(donut => {
  donut.style.setProperty("--percent", donut.dataset.percent);
});
