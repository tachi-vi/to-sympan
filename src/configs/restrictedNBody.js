const configs = [

    
  {
    name: "Our Solar System :3 (Home :3 :3)",
    id: "solar-system-g1",
    text: "Mess around with the scale and try to compare the time periods of each planets orbit!",
    scale: 60,
    spf: 60,
    bodies: [
      { name: "Sun", m: 1.0, x: 0.0, y: 0.0, vx: 0.0, vy: 0.0 },

      {
        name: "Mercury",
        m: 0.000000166047,
        x: 0.387,
        y: 0.0,
        vx: 0.0,
        vy: 1.60747607,
      },
      {
        name: "Venus",
        m: 0.000002447838,
        x: 0.723,
        y: 0.0,
        vx: 0.0,
        vy: 1.17606372,
      },
      { name: "Earth", m: 0.000003003489, x: 1.0, y: 0.0, vx: 0.0, vy: 1.0 },
      {
        name: "Mars",
        m: 0.000000322859,
        x: 1.524,
        y: 0.0,
        vx: 0.0,
        vy: 0.81004196,
      },

      {
        name: "Jupiter",
        m: 0.000954791913,
        x: 5.203,
        y: 0.0,
        vx: 0.0,
        vy: 0.43840257,
      },
      {
        name: "Saturn",
        m: 0.000285885671,
        x: 9.537,
        y: 0.0,
        vx: 0.0,
        vy: 0.32381287,
      },
      {
        name: "Uranus",
        m: 0.00004366244,
        x: 19.191,
        y: 0.0,
        vx: 0.0,
        vy: 0.22827124,
      },
      {
        name: "Neptune",
        m: 0.00005151389,
        x: 30.07,
        y: 0.0,
        vx: 0.0,
        vy: 0.18236155,
      },
    ],
  }, 
  {
    name: "Alpha Centauri",
    id: "alpha-centauri-system-g1-scaled",
    text: "Look at this with Recenter to COM turned off too!",
    com_drift: false,
    scale: 60,
    spf: 300,
    bodies: [
      // Primary stars
      { name: "Alpha Centauri A", m: 1.133, x: 0.0, y: -3, vx: 0.0, vy: 0.0 },
      {
        name: "Alpha Centauri B",
        m: 0.973,
        x: 2.368,
        y: 0.0-3,
        vx: 0.0,
        vy: 0.652,
      }, // 0.206 * √10

      // // Distant companion
      // { name: "Proxima Centauri", m: 0.12200000, x: -950.00000,  y: 0.00000000, vx: 0.0,      vy: -0.0316 }, // -0.010 * √10

      // // Confirmed planet (Proxima b)
      // // { name: "Proxima Centauri b", m: 0.10000317, x: -99.99515, y: 0.00000000, vx: 0.0, vy: 14.35 } // 4.54 * √10
    ],
  }, {
    name: 'Chaos',
    id: "Chaos",
    scale: 20,
    spf: 50,
    sim:  "rk4",
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
  },

  {
    name: 'Mini Solar System',
    id: "mini-solar",
      scale: 30,
    spf: 100,
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
    name: 'Binary Stars with Planets',
  scale: 50,
  spf: 40,

    id: "binary-stars",
    bodies: [
      { m: 500, x: -5, y: 0, vx: 0, vy: -1.5 },
      { m: 500, x: 5, y: 0, vx: 0, vy: 1.5 },
       { m: 1, x: 15, y: 0, vx: 0, vy: 2.5 },

    // Planet 2 – medium orbit (~10 units)
    // circular velocity ≈ sqrt(1000 / 10) ≈ 10
    { m: 0.0001, x: 12, y: 0, vx: 0, vy: 9.13 },

    // Planet B – r = 9 → v ≈ 10.54
    { m: 0.0001, x: 9,  y: 0, vx: 0, vy: 10.54 },

    // Planet C – r = 7 → v ≈ 11.95
    { m: 0.0001, x: 7,  y: 0, vx: 0, vy: 11.95 },

    // --- Planet orbiting Star 2 specifically (S-type orbit) ---
    // Star 2 at (5,0), choose orbit radius = 2
    // v = sqrt(500 / 2) ≈ 15.81
    { m: 0.0001, x: 7, y: 0, vx: 0, vy: 15.81 }   // Planet orbiting both
    ],
  },
   {
    name: 'Chaos 2',
    id: "chaotic",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },  // Sun
      { m: 1, x: 8, y: 3, vx: -1, vy: 3.2 },
      { m: 2, x: -12, y: -5, vx: 1, vy: 2.1 },
      { m: 0.7, x: 15, y: 7, vx: -0.5, vy: 2.6 },
      { m: 3, x: -20, y: 10, vx: 0.8, vy: -1.8 }
    ],
  }
  

];

export default configs;