const configs = [
  {
    name: 'Butterfly',
    id: "butterfly",
    bodies: [
      { m: 1, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 1, y: 0, vx: 0, vy: 1 },
      { m: 1, x: -1, y: 0, vx: 0, vy: -1 }
    ],
  },
  {
    name: 'Earth-Sun',
    id: "earth-sun",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 }    // Earth
    ],
  },
  {
    name: 'Sun + 2 Planets',
    id: "sun-2planets",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },   // Planet A
      { m: 0.5, x: 15, y: 0, vx: 0, vy: 2.6 }  // Planet B
    ],
  },
  {
    name: 'Mini Solar System',
    id: "mini-solar",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      { m: 0.3, x: 5, y: 0, vx: 0, vy: 4.0 },  // Mercury-ish
      { m: 0.8, x: 7, y: 0, vx: 0, vy: 3.6 },  // Venus-ish
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },   // Earth-ish
      { m: 0.1, x: 12, y: 0, vx: 0, vy: 2.9 }, // Mars-ish
      { m: 5, x: 20, y: 0, vx: 0, vy: 2.0 }    // Jupiter-ish
    ],
  },
  {
    name: 'Binary Stars',
    id: "binary-stars",
    bodies: [
      { m: 500, x: -5, y: 0, vx: 0, vy: -1.5 },
      { m: 500, x: 5, y: 0, vx: 0, vy: 1.5 },
      { m: 1, x: 15, y: 0, vx: 0, vy: 2.5 }   // Planet orbiting both
    ],
  },
  {
    name: 'Triple Planets',
    id: "triple-planets",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },
      { m: 1, x: -12, y: 0, vx: 0, vy: -2.9 },
      { m: 0.5, x: 17, y: 0, vx: 0, vy: 2.4 }
    ],
  },
  {
    name: 'Chaotic System',
    id: "chaotic",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },  // Sun
      { m: 1, x: 8, y: 3, vx: -1, vy: 3.2 },
      { m: 2, x: -12, y: -5, vx: 1, vy: 2.1 },
      { m: 0.7, x: 15, y: 7, vx: -0.5, vy: 2.6 },
      { m: 3, x: -20, y: 10, vx: 0.8, vy: -1.8 }
    ],
  },
  {
    name: 'Planet with Moon',
    id: "planet-moon",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },   // Planet
      { m: 0.05, x: 11, y: 0, vx: 0, vy: 3.8 } // Moon
    ],
  },
  {
    name: 'Asteroid Belt',
    id: "asteroid-belt",
    bodies: [
      { m: 2000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      ...Array.from({ length: 20 }).map((_, i) => {
        const dist = 12 + Math.random() * 8; // random distance 12–20
        const angle = Math.random() * 2 * Math.PI;
        const speed = 2.5 + Math.random() * 0.5;
        return {
          m: 0.01,
          x: dist * Math.cos(angle),
          y: dist * Math.sin(angle),
          vx: -speed * Math.sin(angle),
          vy: speed * Math.cos(angle),
        };
      })
    ],
  }
];

export default configs;
