import { ComputeAcceleration } from "./computeAcceleration.js";
import { Body } from "./bodyClass.js";

/**
 * Adaptive Dormand–Prince RK45 integrator (5th order with embedded 4th order for error control)
 *
 * @param {number} g - gravitational constant
 * @param {Body[]} bodies - array of Body objects
 * @param {number} dt - current timestep
 * @param {number} tol - desired relative error tolerance (e.g. 1e-6)
 * @returns {number} - suggested new dt for next step
 */
export function dopri(g, bodies, dt, tol = 1e-6) {
  // --- Dormand–Prince coefficients ---
  const c2 = 1 / 5,
    c3 = 3 / 10,
    c4 = 4 / 5,
    c5 = 8 / 9;

  const a21 = 1 / 5;
  const a31 = 3 / 40, a32 = 9 / 40;
  const a41 = 44 / 45, a42 = -56 / 15, a43 = 32 / 9;
  const a51 = 19372 / 6561, a52 = -25360 / 2187, a53 = 64448 / 6561, a54 = -212 / 729;
  const a61 = 9017 / 3168, a62 = -355 / 33, a63 = 46732 / 5247, a64 = 49 / 176, a65 = -5103 / 18656;
  const a71 = 35 / 384, a73 = 500 / 1113, a74 = 125 / 192, a75 = -2187 / 6784, a76 = 11 / 84;

  // 4th-order embedded weights (for error estimate)
  const b1 = 5179 / 57600,
    b3 = 7571 / 16695,
    b4 = 393 / 640,
    b5 = -92097 / 339200,
    b6 = 187 / 2100,
    b7 = 1 / 40;

  // --- Helper to get accelerations ---
  const accelFromBodies = (arr) => {
    for (let i = 0; i < arr.length; i++) ComputeAcceleration(g, i, arr);
    return arr.map((b) => ({
      vx: b.vx,
      vy: b.vy,
      ax: b.ax,
      ay: b.ay,
    }));
  };

  // --- k1 ---
  const k1 = accelFromBodies(bodies);

  // --- k2 ---
  const s2 = bodies.map(
    (b, i) =>
      new Body(
        b.x + dt * a21 * k1[i].vx,
        b.y + dt * a21 * k1[i].vy,
        b.vx + dt * a21 * k1[i].ax,
        b.vy + dt * a21 * k1[i].ay,
        b.m
      )
  );
  const k2 = accelFromBodies(s2);

  // --- k3 ---
  const s3 = bodies.map(
    (b, i) =>
      new Body(
        b.x + dt * (a31 * k1[i].vx + a32 * k2[i].vx),
        b.y + dt * (a31 * k1[i].vy + a32 * k2[i].vy),
        b.vx + dt * (a31 * k1[i].ax + a32 * k2[i].ax),
        b.vy + dt * (a31 * k1[i].ay + a32 * k2[i].ay),
        b.m
      )
  );
  const k3 = accelFromBodies(s3);

  // --- k4 ---
  const s4 = bodies.map(
    (b, i) =>
      new Body(
        b.x + dt * (a41 * k1[i].vx + a42 * k2[i].vx + a43 * k3[i].vx),
        b.y + dt * (a41 * k1[i].vy + a42 * k2[i].vy + a43 * k3[i].vy),
        b.vx + dt * (a41 * k1[i].ax + a42 * k2[i].ax + a43 * k3[i].ax),
        b.vy + dt * (a41 * k1[i].ay + a42 * k2[i].ay + a43 * k3[i].ay),
        b.m
      )
  );
  const k4 = accelFromBodies(s4);

  // --- k5 ---
  const s5 = bodies.map(
    (b, i) =>
      new Body(
        b.x + dt * (a51 * k1[i].vx + a52 * k2[i].vx + a53 * k3[i].vx + a54 * k4[i].vx),
        b.y + dt * (a51 * k1[i].vy + a52 * k2[i].vy + a53 * k3[i].vy + a54 * k4[i].vy),
        b.vx + dt * (a51 * k1[i].ax + a52 * k2[i].ax + a53 * k3[i].ax + a54 * k4[i].ax),
        b.vy + dt * (a51 * k1[i].ay + a52 * k2[i].ay + a53 * k3[i].ay + a54 * k4[i].ay),
        b.m
      )
  );
  const k5 = accelFromBodies(s5);

  // --- k6 ---
  const s6 = bodies.map(
    (b, i) =>
      new Body(
        b.x +
          dt *
            (a61 * k1[i].vx +
             a62 * k2[i].vx +
             a63 * k3[i].vx +
             a64 * k4[i].vx +
             a65 * k5[i].vx),
        b.y +
          dt *
            (a61 * k1[i].vy +
             a62 * k2[i].vy +
             a63 * k3[i].vy +
             a64 * k4[i].vy +
             a65 * k5[i].vy),
        b.vx +
          dt *
            (a61 * k1[i].ax +
             a62 * k2[i].ax +
             a63 * k3[i].ax +
             a64 * k4[i].ax +
             a65 * k5[i].ax),
        b.vy +
          dt *
            (a61 * k1[i].ay +
             a62 * k2[i].ay +
             a63 * k3[i].ay +
             a64 * k4[i].ay +
             a65 * k5[i].ay),
        b.m
      )
  );
  const k6 = accelFromBodies(s6);

  // --- k7 (5th order final) ---
  const s7 = bodies.map(
    (b, i) =>
      new Body(
        b.x +
          dt *
            (a71 * k1[i].vx +
             a73 * k3[i].vx +
             a74 * k4[i].vx +
             a75 * k5[i].vx +
             a76 * k6[i].vx),
        b.y +
          dt *
            (a71 * k1[i].vy +
             a73 * k3[i].vy +
             a74 * k4[i].vy +
             a75 * k5[i].vy +
             a76 * k6[i].vy),
        b.vx +
          dt *
            (a71 * k1[i].ax +
             a73 * k3[i].ax +
             a74 * k4[i].ax +
             a75 * k5[i].ax +
             a76 * k6[i].ax),
        b.vy +
          dt *
            (a71 * k1[i].ay +
             a73 * k3[i].ay +
             a74 * k4[i].ay +
             a75 * k5[i].ay +
             a76 * k6[i].ay),
        b.m
      )
  );
  const k7 = accelFromBodies(s7);

  // --- Compute 5th and 4th order solutions ---
  const y5 = bodies.map((b, i) => ({
    x: b.x + dt * (a71 * k1[i].vx + a73 * k3[i].vx + a74 * k4[i].vx + a75 * k5[i].vx + a76 * k6[i].vx),
    y: b.y + dt * (a71 * k1[i].vy + a73 * k3[i].vy + a74 * k4[i].vy + a75 * k5[i].vy + a76 * k6[i].vy),
    vx: b.vx + dt * (a71 * k1[i].ax + a73 * k3[i].ax + a74 * k4[i].ax + a75 * k5[i].ax + a76 * k6[i].ax),
    vy: b.vy + dt * (a71 * k1[i].ay + a73 * k3[i].ay + a74 * k4[i].ay + a75 * k5[i].ay + a76 * k6[i].ay),
  }));

  const y4 = bodies.map((b, i) => ({
    x: b.x + dt * (b1 * k1[i].vx + b3 * k3[i].vx + b4 * k4[i].vx + b5 * k5[i].vx + b6 * k6[i].vx + b7 * k7[i].vx),
    y: b.y + dt * (b1 * k1[i].vy + b3 * k3[i].vy + b4 * k4[i].vy + b5 * k5[i].vy + b6 * k6[i].vy + b7 * k7[i].vy),
    vx: b.vx + dt * (b1 * k1[i].ax + b3 * k3[i].ax + b4 * k4[i].ax + b5 * k5[i].ax + b6 * k6[i].ax + b7 * k7[i].ax),
    vy: b.vy + dt * (b1 * k1[i].ay + b3 * k3[i].ay + b4 * k4[i].ay + b5 * k5[i].ay + b6 * k6[i].ay + b7 * k7[i].ay),
  }));

  // --- Estimate local error ---
  let err = 0;
  for (let i = 0; i < bodies.length; i++) {
    const dx = y5[i].x - y4[i].x;
    const dy = y5[i].y - y4[i].y;
    const dvx = y5[i].vx - y4[i].vx;
    const dvy = y5[i].vy - y4[i].vy;
    err = Math.max(err, Math.abs(dx), Math.abs(dy), Math.abs(dvx), Math.abs(dvy));
  }

  // --- Compute next dt using standard RK45 rule ---
  const safety = 0.9;
  const minScale = 0.2;
  const maxScale = 5.0;

  const scale = safety * Math.pow(tol / (err + 1e-15), 0.2);
  const newDt = dt * Math.min(maxScale, Math.max(minScale, scale));

  // --- Accept step if within tolerance ---
  if (err < tol) {
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].x = y5[i].x;
      bodies[i].y = y5[i].y;
      bodies[i].vx = y5[i].vx;
      bodies[i].vy = y5[i].vy;
    }
  }

  return newDt;
}
