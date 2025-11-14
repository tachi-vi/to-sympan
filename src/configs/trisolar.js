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
    // Planet A: +X side
    { m: 0.001, x: 2.5, y: 0, vx: 0, vy: 0.75 },

    // Planet B: -X side
    { m: 0.001, x: -2.5, y: 0, vx: 0, vy: -0.75 },

    // Planet C: above system
    { m: 0.001, x: 0, y: 2.2, vx: -0.85, vy: 0 }

    ]
  }]

export default configs;