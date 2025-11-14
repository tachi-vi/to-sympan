const configs = [

    
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
  }

];

export default configs;