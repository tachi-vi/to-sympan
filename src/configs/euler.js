const configs = [
  {
    name: "Euler E1",
    id: "euler-e1",
    bodies: [
      { m: 1, x: -1, y: 0, vx: 0, vy: -1.06066 },
      { m: 1, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 1, y: 0, vx: 0, vy: 1.06066 },
    ],
  },
  {
    name: "Euler E2",
    id: "euler-e2",
    bodies: [
      { m: 1, x: -1.2, y: 0, vx: 0, vy: -1.158 },
      { m: 1, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 1.2, y: 0, vx: 0, vy: 1.158 },
    ],
  },
  {
    name: "Solar System (G=1)",
    id: "solar-system-g1",
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
    name: "Alpha Centauri System (G=1, Scaled ×0.1)",
    id: "alpha-centauri-system-g1-scaled",
    bodies: [
      // Primary stars
      { name: "Alpha Centauri A", m: 1.133, x: 0.0, y: 0.0, vx: 0.0, vy: 0.0 },
      {
        name: "Alpha Centauri B",
        m: 0.973,
        x: 2.368,
        y: 0.0,
        vx: 0.0,
        vy: 0.652,
      }, // 0.206 * √10

      // // Distant companion
      // { name: "Proxima Centauri", m: 0.12200000, x: -950.00000,  y: 0.00000000, vx: 0.0,      vy: -0.0316 }, // -0.010 * √10

      // // Confirmed planet (Proxima b)
      // // { name: "Proxima Centauri b", m: 0.10000317, x: -99.99515, y: 0.00000000, vx: 0.0, vy: 14.35 } // 4.54 * √10
    ],
  },
  // === 1. Euler E1 (Collinear Configuration 1) ===
  {
    name: "Euler E1 (Collinear)",
    id: "euler-e1",
    description:
      "Three equal masses on a line, equally spaced; each moving to maintain collinearity under G = 1.",
    bodies: [
      { m: 1, x: -1.0, y: 0.0, vx: 0.0, vy: -1.06066 },
      { m: 1, x: 0.0, y: 0.0, vx: 0.0, vy: 0.0 },
      { m: 1, x: 1.0, y: 0.0, vx: 0.0, vy: 1.06066 },
    ],
  },
  {
    name: "Euler !1111",
    id: "euler-e11",
    description:
      "Three equal masses on a line, equally spaced; each moving to maintain collinearity under G = 1.",
    bodies: [
      {
        m: 3,
        x: -0.8520980041,
        y: -0.2283189721,
        vx: -0.2792477603,
        vy: 0.6557964988,
      },
      {
        m: 2,
        x: 0.5001981527,
        y: 0.1340276911,
        vx: 0.1639238834,
        vy: -0.3849653392,
      },
      {
        m: 1,
        x: 1.5558977071,
        y: 0.4169015341,
        vx: 0.5098955142,
        vy: -1.1974588179,
      },
    ],
  },
  {
    name: "Euler !1111 (scaled ×25)",
    id: "euler-e11-scaled-25",
    description:
      "Scaled variant (positions ×25, velocities ÷√25) — same relative motion, larger numbers.",
    bodies: [
      {
        m: 3,
        x: -21.3024501025,
        y: -5.7079743025,
        vx: -0.05584955206,
        vy: 0.13115929976,
      },
      {
        m: 2,
        x: 12.5049538175,
        y: 3.3506922775,
        vx: 0.03278477668,
        vy: -0.07699306784,
      },
      {
        m: 1,
        x: 38.8974426775,
        y: 10.4225383525,
        vx: 0.10197910284,
        vy: -0.23949176358,
      },
    ],
  },

  // === 2. Euler E2 (Collinear Configuration 2, Scaled Variant) ===
  {
    name: "Euler E2 (Collinear, Scaled)",
    id: "euler-e2",
    description:
      "Another scaled collinear variant where outer bodies orbit symmetrically around the center mass.",
    bodies: [
      { m: 1, x: -0.5, y: 0.0, vx: 0.0, vy: -1.5 },
      { m: 1, x: 0.0, y: 0.0, vx: 0.0, vy: 0.0 },
      { m: 1, x: 0.5, y: 0.0, vx: 0.0, vy: 1.5 },
    ],
  },

  // === 3. Lagrange L4 (Equilateral Triangle, Stable) ===
  {
    name: "Lagrange L4 (Equilateral Stable)",
    id: "lagrange-l4",
    description:
      "Stable equilateral configuration, 60° ahead of secondary — discovered by Lagrange (1772).",
    bodies: [
      { m: 1, x: -0.5, y: -Math.sqrt(3) / 2, vx: 0.866, vy: -0.5 },
      { m: 1, x: 0.5, y: -Math.sqrt(3) / 2, vx: 0.866, vy: -0.5 },
      { m: 1, x: 0.0, y: Math.sqrt(3) / 2, vx: -1.732, vy: 1.0 },
    ],
  },

  // === 4. Lagrange L5 (Equilateral Triangle, Mirror Stable) ===
  {
    name: "Lagrange L5 (Equilateral Stable, Mirror)",
    id: "lagrange-l5",
    description:
      "Stable equilateral configuration mirrored across the x-axis — 60° behind the secondary.",
    bodies: [
      { m: 1, x: -0.5, y: Math.sqrt(3) / 2, vx: 0.866, vy: 0.5 },
      { m: 1, x: 0.5, y: Math.sqrt(3) / 2, vx: 0.866, vy: 0.5 },
      { m: 1, x: 0.0, y: -Math.sqrt(3) / 2, vx: -1.732, vy: -1.0 },
    ],
  },
];

export default configs;
