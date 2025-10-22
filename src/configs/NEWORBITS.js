const NEWORBITS = [
  {
    name: "Euler E1",
    id: "euler-e1",
    bodies: [
      { m: 1, x: -1, y: 0, vx: 0, vy: 0.559 },
      { m: 1, x: 0,  y: 0, vx: 0, vy: -1.118 },
      { m: 1, x: 1,  y: 0, vx: 0, vy: 0.559 }
    ]
  },
  {
    name: "Euler E2",
    id: "euler-e2",
    bodies: [
      { m: 1, x: -1.2, y: 0, vx: 0, vy: 0.537 },
      { m: 1, x: 0,    y: 0, vx: 0, vy: -1.074 },
      { m: 1, x: 1.2,  y: 0, vx: 0, vy: 0.537 }
    ]
  },
  {
    name: "Euler E3",
    id: "euler-e3",
    bodies: [
      { m: 1, x: -1.4, y: 0, vx: 0, vy: 0.521 },
      { m: 1, x: 0,    y: 0, vx: 0, vy: -1.042 },
      { m: 1, x: 1.4,  y: 0, vx: 0, vy: 0.521 }
    ]
  },{
    name: "Lagrange Triangle (Zero COM Drift)",
    id: "lagrange-triangle-zero-com",
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
      }]
  },
 
  //henon 29, trisolar
];
export default NEWORBITS;
