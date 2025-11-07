// Corrected CR3BP configs (G = 1), μ = 0.001, rotating barycentric frame.
// Primary at x = -μ, Secondary at x = 1 - μ, separation = 1.

const mu = 0.001;
const sqrt3over2 = Math.sqrt(3) / 2;

const configs = [
  {
    name: "Lagrange L4 (Equilateral Stable) - μ=0.001",
    id: "lagrange-l4-mu0.001",
    description: "Triangular equilibrium (60° ahead). G = 1, rotating barycentric frame.",
    bodies: [
      { name: "Primary",   m: 1 - mu, x: -mu,      y: 0, vx: 0, vy: 0 },
      { name: "Secondary", m: mu,     x: 1 - mu,   y: 0, vx: 0, vy: 0 },
      { name: "Test Body", m: 0,      x: 0.5 - mu,  y:  sqrt3over2, vx: 0, vy: 0 }
    ]
  },

  {
    name: "Lagrange L5 (Equilateral Stable) - μ=0.001",
    id: "lagrange-l5-mu0.001",
    description: "Triangular equilibrium (60° behind). G = 1, rotating barycentric frame.",
    bodies: [
      { name: "Primary",   m: 1 - mu, x: -mu,      y: 0, vx: 0, vy: 0 },
      { name: "Secondary", m: mu,     x: 1 - mu,   y: 0, vx: 0, vy: 0 },
      { name: "Test Body", m: 0,      x: 0.5 - mu,  y: -sqrt3over2, vx: 0, vy: 0 }
    ]
  },

  {
    name: "Tadpole Orbit around L4 - μ=0.001",
    id: "tadpole-l4-mu0.001",
    description: "Small-amplitude libration near L4 (small offset + small velocity).",
    bodies: [
      { name: "Primary",   m: 1 - mu, x: -mu,      y: 0, vx: 0, vy: 0 },
      { name: "Secondary", m: mu,     x: 1 - mu,   y: 0, vx: 0, vy: 0 },
      // small offset from true L4 position, small initial velocity to start libration
      { name: "Test Body", m: 0,
        x: (0.5 - mu) + 0.01, y: sqrt3over2 + 0.01,
        vx: -0.0008, vy: 0.0006 }
    ]
  },

  {
    name: "Horseshoe Orbit (Co-orbital) - μ=0.001",
    id: "horseshoe-mu0.001",
    description: "Large-amplitude co-orbital (initial condition chosen to trace a horseshoe-like path).",
    bodies: [
      { name: "Primary",   m: 1 - mu, x: -mu,      y: 0, vx: 0, vy: 0 },
      { name: "Secondary", m: mu,     x: 1 - mu,   y: 0, vx: 0, vy: 0 },
      // bigger offset to produce horseshoe-like motion
      { name: "Test Body", m: 0,
        x: -0.05, y: 0.9,
        vx: -0.02, vy: 0.01 }
    ]
  },

  {
    name: "Retrograde near-secondary (example) - μ=0.001",
    id: "retrograde-secondary-mu0.001",
    description: "Test body started near the secondary (inside Hill region) with retrograde initial tangential velocity (example).",
    bodies: [
      { name: "Primary",   m: 1 - mu, x: -mu,      y: 0, vx: 0, vy: 0 },
      { name: "Secondary", m: mu,     x: 1 - mu,   y: 0, vx: 0, vy: 0 },
      // placed slightly outside the secondary, give a retrograde tangential velocity (in rotating frame)
      { name: "Test Body", m: 0,
        x: 1 - mu + 0.015, y: 0.0,
        vx: 0.0, vy: -0.12 }
    ]
  }
];

export default configs;
