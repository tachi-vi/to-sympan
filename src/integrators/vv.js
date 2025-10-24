import { ComputeAcceleration } from "./computeAcceleration";

export function vv(g, bodies, dt) {
  // Step 1: Compute initial acceleration
  for (let i = 0; i < bodies.length; i++) {
    ComputeAcceleration(g, i, bodies);
  }

  // Store old accelerations
  const oldAx = bodies.map((b) => b.ax);
  const oldAy = bodies.map((b) => b.ay);

  // Step 2: Update positions using current velocities and accelerations
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    b.x += b.vx * dt + 0.5 * oldAx[i] * dt * dt;
    b.y += b.vy * dt + 0.5 * oldAy[i] * dt * dt;
  }

  // Step 3: Compute new accelerations at updated positions
  for (let i = 0; i < bodies.length; i++) {
    ComputeAcceleration(g, i, bodies);
  }

  // Step 4: Update velocities using average of old and new accelerations
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    b.vx += 0.5 * (oldAx[i] + b.ax) * dt;
    b.vy += 0.5 * (oldAy[i] + b.ay) * dt;
  }
}
