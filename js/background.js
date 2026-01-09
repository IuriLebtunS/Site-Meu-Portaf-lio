tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: {
    color: "#0f172a"
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#38bdf8"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.6
    },
    size: {
      value: { min: 1, max: 3 }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#38bdf8",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: {
        default: "out"
      }
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 120
      }
    }
  },
  detectRetina: true
});
