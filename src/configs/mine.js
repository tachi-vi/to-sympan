const configs = [ {
    name: "Flower - 1",
    id: "mine1",
    text: "Try speeding this up further(spf ~= 800)",
    sim: "cash-karp",
    spf: 500,
    bodies: [
      { m: 1, x: -1, y: 0, vx: 0, vy: 0.559 },
      { m: 1, x: 0,  y: 0, vx: 0, vy: -1.118 },
      { m: 1, x: 1,  y: 0, vx: 0, vy: 0.559 }
    ]
  },
  {
    name: "Flower - 2",
    id: "euler-e2",
    text: "Try speeding this up further(spf ~= 800)",
    sim: "cash-karp",
    spf: 500,
    bodies: [
      { m: 1, x: -1.2, y: 0, vx: 0, vy: 0.537 },
      { m: 1, x: 0,    y: 0, vx: 0, vy: -1.074 },
      { m: 1, x: 1.2,  y: 0, vx: 0, vy: 0.537 }
    ]
  },
  {
    name: "Elliptical Triangle",
    id: "triangle",
    com_drift: true,
    sim: "cash-karp",
    bodies: [
      { m: 1, x: -0.5, y: 0, vx: 0, vy: 0.866 },
      { m: 1, x: 0.5, y: 0, vx: 0, vy: -0.866 },
      { m: 1, x: 0, y: 0.866, vx: -0.866, vy: 0 }
    ]
  }
 ]

export default configs;