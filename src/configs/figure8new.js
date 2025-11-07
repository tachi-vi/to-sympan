const configs = [
  // === 1. Chenciner–Montgomery / Simó Figure Eight ===
  {
    name: "Figure Eight",
    id: "figure-eight",
    bodies: [
      { m: 1, x: -0.97000436, y:  0.24308753, vx:  0.4662036850, vy:  0.4323657300 },
      { m: 1, x:  0.97000436, y: -0.24308753, vx:  0.4662036850, vy:  0.4323657300 },
      { m: 1, x:  0.0,        y:  0.0,        vx: -0.93240737,   vy: -0.86473146  },
    ],
  },

  // === 2. Simó “Butterfly I” (planar periodic) ===
  {
    name: "Butterfly I",
    id: "butterfly-i",
    bodies: [
      { m: 1, x: -0.97000436, y: -0.24308753, vx:  0.4662036850, vy: -0.4323657300 },
      { m: 1, x:  0.97000436, y:  0.24308753, vx:  0.4662036850, vy: -0.4323657300 },
      { m: 1, x:  0.0,        y:  0.0,        vx: -0.93240737,   vy:  0.86473146  },
    ],
  },

  // === 3. Simó “Butterfly II” (rotated variant) ===
  {
    name: "Butterfly II",
    id: "butterfly-ii",
    bodies: [
      { m: 1, x: -0.97000436, y:  0.24308753, vx: -0.4662036850, vy: -0.4323657300 },
      { m: 1, x:  0.97000436, y: -0.24308753, vx: -0.4662036850, vy: -0.4323657300 },
      { m: 1, x:  0.0,        y:  0.0,        vx:  0.93240737,   vy:  0.86473146  },
    ],
  },

  // === 4. Simó “Yin–Yang” ===
  {
    name: "Yin–Yang",
    id: "yin-yang",
    bodies: [
      { m: 1, x: -0.932, y:  0.174, vx:  0.452, vy:  0.514 },
      { m: 1, x:  0.932, y: -0.174, vx:  0.452, vy:  0.514 },
      { m: 1, x:  0.0,   y:  0.0,   vx: -0.904, vy: -1.028 },
    ],
  },

  // === 5. Simó “P12” (spatial orbit, small z-component) ===
  {
    name: "P12 (Spatial)",
    id: "p12",
    bodies: [
      { m: 1, x: -0.97000436, y:  0.24308753, z:  0.0,  vx:  0.4662036850, vy:  0.4323657300, vz:  0.304 },
      { m: 1, x:  0.97000436, y: -0.24308753, z:  0.0,  vx:  0.4662036850, vy:  0.4323657300, vz: -0.304 },
      { m: 1, x:  0.0,        y:  0.0,        z:  0.0,  vx: -0.93240737,   vy: -0.86473146,  vz:  0.0   },
    ],
  },
];

export default configs;
