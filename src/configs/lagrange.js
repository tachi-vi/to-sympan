const config = [
 {
    name: "Lagrange Triangle",
    id: "lagrange-triangle",
    com_drift: true,
    sim: "cash-karp",
    bodies: [
      { m: 1, x: -0.5, y: 0, vx: 0, vy: 0.866 },
      { m: 1, x: 0.5, y: 0, vx: 0, vy: -0.866 },
      { m: 1, x: 0, y: 0.866, vx: -0.866, vy: 0 }
    ]
  }
];

export default config;