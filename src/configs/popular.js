const popularConfigs = [
  {
    name: 'Butterfly',
    id: "butterfly",
    bodies: [
      { m: 1, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 1, y: 0, vx: 0, vy: 1 },
      { m: 1, x: -1, y: 0, vx: 0, vy: -1 }
    ],
  },
  {
    name: 'Earth-Sun',
    id: "earth-sun",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0, name: "Sun" },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2, name: "Earth" }    // Earth
    ],
  },
  {
    name: 'Figure 8',
    id: "figure-8",
    scale: 200,
    bodies: [
  { m: 1, x: -1, y: 0, vx: 0.347111, vy: 0.532728, name: "Body 1" },
  { m: 1, x: 1, y: 0, vx: 0.347111, vy: 0.532728, name: "Body 2" },
  { m: 1, x: 0, y: 0, vx: -0.694222, vy: -1.065456, name: "Body 3" }
]

  },{
    name: "Skinny Pineapple",
    id: "skinny-pineapple",
    scale: 200,
    bodies: [
  { m: 1, x: 0.419698802831, y: 1.190466261252, vx: 0.102294566003, vy: 0.687248445943, name: "Body 1" },
  { m: 1, x: 0.076399621771, y: 0.296331688995, vx: 0.148950262064, vy: 0.240179781043, name: "Body 2" },
  { m: 1, x: 0.100310663856, y: -0.729358656127, vx: -0.251244828060, vy: -0.927428226977, name: "Body 3" }
]

  },
  {
    name: "Oval, catface, and starship",
    id: "oval-catface-starship",
    scale: 200,
    bodies: [
  { m: 1, x: 0.536387073390, y: 0.054088605008, vx: -0.569379585581, vy: 1.255291102531, name: "Oval" },
  { m: 1, x: -0.252099126491, y: 0.694527327749, vx: 0.079644615252, vy: -0.458625997341, name: "Catface" },
  { m: 1, x: -0.275706601688, y: -0.335933589318, vx: 0.489734970329, vy: -0.796665105189, name: "Starship" }
]
  },
  {
    name: 'Sun + 2 Planets',
    id: "sun-2planets",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0, name:"Sun" },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },   // Planet A
      { m: 0.5, x: 15, y: 0, vx: 0, vy: 2.6 }  // Planet B
    ],
  },
  {
    name: 'Binary Stars',
    id: "binary-stars",
    bodies: [
      { m: 500, x: -5, y: 0, vx: 0, vy: -1.5 },
      { m: 500, x: 5, y: 0, vx: 0, vy: 1.5 },
      { m: 1, x: 15, y: 0, vx: 0, vy: 2.5 }   // Planet orbiting both
    ],
  },
  {
    name: 'Triple Planets',
    id: "triple-planets",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },
      { m: 1, x: -12, y: 0, vx: 0, vy: -2.9 }
    ],
  },
  {
    name: 'Planet with Moon',
    id: "planet-moon",
    bodies: [
      { m: 1000, x: 0, y: 0, vx: 0, vy: 0 },   // Sun
      { m: 1, x: 10, y: 0, vx: 0, vy: 3.2 },   // Planet
      { m: 0.05, x: 11, y: 0, vx: 0, vy: 3.8 } // Moon
    ],
  }
];

export default popularconfigs;
