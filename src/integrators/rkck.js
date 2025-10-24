import { ComputeAcceleration } from "./computeAcceleration.js";
import { Body } from "./bodyClass.js";
import numeric from "numeric";

export function rkck(g, bodies, dt) {
  const tol = 1e-20; // desired accuracy
  let done = false;

  while (!done) {
    const { newBodies, err } = rkckStep(g, bodies, dt);

    // Adaptive step-size control
    const scale = tol / (err + 1e-12);
    const dtNew =
      dt * Math.min(4, Math.max(0.1, 0.9 * Math.pow(scale, 0.2)));

    if (err < tol) {
      // Accept step
      for (let i = 0; i < bodies.length; i++) {
        bodies[i].x = newBodies[i].x;
        bodies[i].y = newBodies[i].y;
        bodies[i].vx = newBodies[i].vx;
        bodies[i].vy = newBodies[i].vy;
      }
      done = true;
    }

    dt = dtNew; // update step size for next attempt
  }
}

function rkckStep(g, bodies, dt) {
  const n = bodies.length;

  function copyBodies(src) {
    return src.map((b) => new Body(b.x, b.y, b.vx, b.vy, b.m));
  }

  function getState(bodies) {
    const state = [];
    for (let b of bodies) state.push(b.x, b.y, b.vx, b.vy);
    return state;
  }

  function setState(bodies, state) {
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].x = state[i * 4];
      bodies[i].y = state[i * 4 + 1];
      bodies[i].vx = state[i * 4 + 2];
      bodies[i].vy = state[i * 4 + 3];
    }
  }

  function derivatives(bodies) {
    const derivs = [];
    for (let i = 0; i < n; i++) ComputeAcceleration(g, i, bodies);
    for (let b of bodies) derivs.push(b.vx, b.vy, b.ax, b.ay);
    return derivs;
  }

  // Butcher tableau for RKCK (Cash–Karp)
  const a = [
    [],
    [1 / 5],
    [3 / 40, 9 / 40],
    [3 / 10, -9 / 10, 6 / 5],
    [-11 / 54, 5 / 2, -70 / 27, 35 / 27],
    [1631 / 55296, 175 / 512, 575 / 13824, 44275 / 110592, 253 / 4096],
  ];

  const b5 = [37 / 378, 0, 250 / 621, 125 / 594, 0, 512 / 1771];
  const b4 = [
    2825 / 27648,
    0,
    18575 / 48384,
    13525 / 55296,
    277 / 14336,
    1 / 4,
  ];

  const y0 = getState(bodies);
  const ks = [];
  let tempBodies;

  // k1
  tempBodies = copyBodies(bodies);
  ks.push(derivatives(tempBodies));

  // k2..k6
  for (let i = 1; i <= 5; i++) {
    tempBodies = copyBodies(bodies);
    const ytemp = [];
    for (let j = 0; j < y0.length; j++) {
      let sum = 0;
      for (let k = 0; k < a[i].length; k++) sum += a[i][k] * ks[k][j];
      ytemp.push(y0[j] + dt * sum);
    }
    setState(tempBodies, ytemp);
    ks.push(derivatives(tempBodies));
  }

  // Combine stages
  const y5 = [];
  const y4 = [];
  for (let j = 0; j < y0.length; j++) {
    let sum5 = 0,
      sum4 = 0;
    for (let i = 0; i <= 5; i++) {
      sum5 += b5[i] * ks[i][j];
      sum4 += b4[i] * ks[i][j];
    }
    y5.push(y0[j] + dt * sum5);
    y4.push(y0[j] + dt * sum4);
  }

  // Error estimate
  let err = 0;
  for (let j = 0; j < y0.length; j++) err += Math.pow(y5[j] - y4[j], 2);
  err = Math.sqrt(err);

  // Construct new bodies
  const newBodies = copyBodies(bodies);
  setState(newBodies, y5);

  return { newBodies, err };
}
