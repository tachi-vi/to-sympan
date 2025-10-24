import * as numeric from "numeric";
import { ComputeAcceleration } from "./computeAcceleration.js";

function deriv(t, y, g, bodies) {
  const n = bodies.length;
  const dydt = new Array(y.length);

  // Update temporary bodies from flat state vector
  for (let i = 0; i < n; i++) {
    bodies[i].x = y[i * 4];
    bodies[i].y = y[i * 4 + 1];
    bodies[i].vx = y[i * 4 + 2];
    bodies[i].vy = y[i * 4 + 3];
  }

  // Compute accelerations
  for (let i = 0; i < n; i++) ComputeAcceleration(g, i, bodies);

  // Fill derivative array: dx/dt = vx, dy/dt = vy, dvx/dt = ax, dvy/dt = ay
  for (let i = 0; i < n; i++) {
    dydt[i * 4] = bodies[i].vx;
    dydt[i * 4 + 1] = bodies[i].vy;
    dydt[i * 4 + 2] = bodies[i].ax;
    dydt[i * 4 + 3] = bodies[i].ay;
  }

  return dydt;
}
export function doprin(g, bodies, dt) {
  

  const n = bodies.length;
  const y0 = [];

  for (let b of bodies) y0.push(b.x, b.y, b.vx, b.vy);
  console.log("initial y0:", y0);

  const f = (t, y) => deriv(t, y, g, bodies);

  // 👇 this line is the one that can fail silently if something is off
  const sol = numeric.dopri(0, dt, y0, f, 1e-8, 200);
  console.log("dopri result:", sol);

  const yFinal = sol.at(dt);
  console.log("yFinal:", yFinal);

  for (let i = 0; i < n; i++) {
    bodies[i].x = yFinal[i * 4];
    bodies[i].y = yFinal[i * 4 + 1];
    bodies[i].vx = yFinal[i * 4 + 2];
    bodies[i].vy = yFinal[i * 4 + 3];
  }
}
