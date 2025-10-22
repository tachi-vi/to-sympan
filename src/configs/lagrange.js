const config = [
  {
    name: "Lagrange Triangle (Zero COM Drift)",
    id: "lagrange-triangle-zero-com",
     movingcom: true,
    bodies: [
      {
        m: 1,
        x: -0.5,
        y: -0.28867513459,   // -side/2 * sqrt(3)/3
        vx: 0.0,             // adjusted to zero total Px
        vy: 0.81649658093    // adjusted to zero total Py
      },
      {
        m: 1,
        x: 0.5,
        y: -0.28867513459,
        vx: 0.0,
        vy: 0.81649658093
      },
      {
        m: 1,
        x: 0,
        y: 0.57735026918,
        vx: 0.0,
        vy: -1.63299316186   // opposite to sum of first two to zero total Py
      }
    ]
  }
];
 export default config;