const configs = [
  {
    name: "Euler E1 (Collinear)",
    id: "euler-e1",
    sim: "rk2",
    scale: 150,
    bodies: [
      { m: 1, x: -1.0, y: 0.0, vx: 0.0, vy: -1.06066 },
      { m: 1, x: 0.0, y: 0.0, vx: 0.0, vy: 0.0 },
      { m: 1, x: 1.0, y: 0.0, vx: 0.0, vy: 1.06066 },
    ],
  },
  {
    name: "Euler E2 (Mass ratio of 3:2:1)",
    id: "euler-e2",
    scale: 200,
    sim: "cash-karp",
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
  }
];

export default configs;
