const configs = [{
    name: "Henon 29 with 1 Planet",
    id: "henon-29",
      scale: 200,
    spf: 40,
    sim: "rk4",
    bodies: [
      { m: 1, x: -0.2142473852, y: 0, vx: 0, vy: 1.2218112279 },
      { m: 1, x: 1.2193274145, y: 0, vx: 0, vy: -0.1089634117 },
      { m: 1, x: -1.0050800294, y: 0, vx: 0, vy: -1.1128478162 },
       // --- Added planets ---
    { name: "Trisolaris", m: 0.0001, x:  1.378731, y:  0.243107, vx: -0.254195, vy:  1.441611 },

    // Planet 2 (r ~ 1.6, angle 130°)
    // { m: 0.0001, x: -1.028460, y:  1.225671, vx: -1.048950, vy: -0.880173 },

    // // Planet 3 (r ~ 1.8, angle 250°)
    // { m: 0.0001, x: -0.615636, y: -1.691447, vx:  1.213138, vy: -0.441546 }

    ]
  }, {
  name: "Euler E1 (Collinear + tiny planet)",
  id: "euler-e1",
  sim: "rk4",
  scale: 150,
  spf: 70,
  bodies: [
    {m: 1, x: -1.0, y: 0.0, vx: 0.0, vy: -1.06066 },
    { m: 1, x:  0.0, y: 0.0, vx: 0.0, vy:  0.0 },
    { m: 1, x:  1.0, y: 0.0, vx: 0.0, vy:  1.06066 },

    // NEW tiny orbiting planet
    {name: "Trisolaris",
      m: 0.000001,
      x: -1.0,
      y: 0.15,           // slightly above the left mass
      vx: 2.58199,       // tangential velocity
      vy: 0.0
    }
  ]
}, {
  name: "Figure 8 - V.7.D with Planet",
  id: "v-7-d",
  show: true,
  sim: "rk4",
  spf: 50,
  bodies: [
    {
      m: 1,
      x: -1,
      y: 0,
      vx: 0.410355,
      vy: 0.551985,
    },
    {
      m: 1,
      x: 1,
      y: 0,
      vx: 0.410355,
      vy: 0.551985,
    },
    {
      m: 1,
      x: 0,
      y: 0,
      vx: -0.82071,
      vy: -1.10397,
    },

    // 🌙 very close tiny orbiting moon around the left body
    {
      m: 0.00001,
      x: -1.0,
      y: 0.15,
      vx: 2.58199,
      vy: 0
    }
  ]
}, {
  name: "Butterfly I.2.A",
  id: "i-2-a",
  show: true,
  scale: 300,
  sim: "cash-karp",
  spf: 60,
  bodies: [
    { m: 1, x: -1, y: 0, vx: 0.306893, vy: 0.125507 },
    { m: 1, x:  0, y: 0, vx: -0.613786, vy: -0.251014 },
    { m: 1, x:  1, y: 0, vx: 0.306893, vy: 0.125507 },

    // 🌙 Tiny close orbiting moon (G = 1)
    {
      m: 0.00001,
      x: -1.0,
      y: 0.15,
      vx: 2.888883,
      vy: 0.125507
    }
  ]
}

]

export default configs;