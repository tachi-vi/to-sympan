const configs = [{
    name: "Henon 29 with 1 Planet",
    id: "henon-29",
      scale: 150,
    spf: 200,
    sim: "cash-karp",
    bodies: [
      { m: 1, x: -0.2142473852, y: 0, vx: 0, vy: 1.2218112279 },
      { m: 1, x: 1.2193274145, y: 0, vx: 0, vy: -0.1089634117 },
      { m: 1, x: -1.0050800294, y: 0, vx: 0, vy: -1.1128478162 },
       // --- Added planets ---
    { m: 0.0001, x:  1.378731, y:  0.243107, vx: -0.254195, vy:  1.441611 },

    // Planet 2 (r ~ 1.6, angle 130°)
    { m: 0.0001, x: -1.028460, y:  1.225671, vx: -1.048950, vy: -0.880173 },

    // Planet 3 (r ~ 1.8, angle 250°)
    { m: 0.0001, x: -0.615636, y: -1.691447, vx:  1.213138, vy: -0.441546 }

    ]
  }]

export default configs;