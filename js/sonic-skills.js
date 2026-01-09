const sonic = document.getElementById("sonic");
const skills = document.querySelectorAll(".skill-item");
const statsCard = document.querySelector(".stats-card");
const donuts = document.querySelectorAll(".donut");

/* ===============================
   ESTADO
================================ */
let normalPasses = 0;
let superPasses = 0;
let isSuperSonic = false;
let isShaking = false;
let ignoreNextIteration = false;

/* ===============================
   CONFIGURAÇÕES
================================ */
const NORMAL_PASSES_TO_SUPER = 3;
const SUPER_PASSES_LIMIT = 2;

const IMPACT_RADIUS = 120;
const BASE_LIFT = 18;
const SUPER_MULTIPLIER = 1.8;

/* ===============================
   UTIL
================================ */
function getExperienceMultiplier(skill) {
  const level = skill.dataset.level || "";
  if (level.includes("3")) return 1.3;
  if (level.includes("5")) return 1.6;
  return 1.1;
}

/* ===============================
   IMPACTO NAS SKILLS
================================ */
function animateSonicImpact() {
  const sonicRect = sonic.getBoundingClientRect();
  const sonicCenterX = sonicRect.left + sonicRect.width / 2;

  skills.forEach(skill => {
    const rect = skill.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(centerX - sonicCenterX);

    if (distance < IMPACT_RADIUS) {
      const influence = 1 - distance / IMPACT_RADIUS;
      const exp = getExperienceMultiplier(skill);

      const power =
        BASE_LIFT *
        influence *
        exp *
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

animateSonicImpact();

/* ===============================
   CONTROLE DE VOLTAS
================================ */
sonic.addEventListener("animationiteration", () => {

   if (ignoreNextIteration) {
    ignoreNextIteration = false;
    return;
  }

   /* ===============================
     MODO NORMAL
  ============================== */
  if (!isSuperSonic) {
    normalPasses++;

    if (normalPasses === 3) {
      isSuperSonic = true;
      isShaking = true;

      normalPasses = 0;
      superPasses = 0;

      ignoreNextIteration = true;

      sonic.style.animationDuration = "4s";
      sonic.style.filter = "drop-shadow(0 0 12px gold)";

      console.log("⚡ SUPER SONIC ATIVADO");
    }

    return;
  }


  /* ===============================
     MODO SUPER
  ============================== */
  superPasses++;

  if (superPasses === 2) {
    isSuperSonic = false;
    isShaking = false;

    superPasses = 0;

    ignoreNextIteration = true;

    sonic.style.animationDuration = "8s";
    sonic.style.filter = "drop-shadow(0 6px 8px rgba(0,0,0,.7))";

    resetShake();

    console.log("🟦 Sonic voltou ao normal");
  }
});

/* ===============================
   SHAKE CONTROLADO (SÓ NO TURBO)
================================ */
function turboShake() {
  if (!isShaking) {
    requestAnimationFrame(turboShake);
    return;
  }

  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 6;
  const r = (Math.random() - 0.5) * 2;

  if (statsCard) {
    statsCard.style.transform = `
      translateX(-20px)
      translate(${x}px, ${y}px)
      rotate(${r}deg)
      scale(1.03)
    `;
  }

  donuts.forEach(donut => {
    const dx = (Math.random() - 0.5) * 8;
    const dy = (Math.random() - 0.5) * 8;

    donut.style.transform = `
      translate(${dx}px, ${dy}px)
      scale(1.08)
    `;
  });

  requestAnimationFrame(turboShake);
}

function resetShake() {
  if (statsCard) {
    statsCard.style.transform = "translateX(-20px)";
  }

  donuts.forEach(donut => {
    donut.style.transform = "none";
  });
}

turboShake();

/* ===============================
   DONUTS
================================ */
document.querySelectorAll(".donut").forEach(donut => {
  donut.style.setProperty("--percent", donut.dataset.percent);
});
