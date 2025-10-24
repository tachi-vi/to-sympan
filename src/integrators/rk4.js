import { ComputeAcceleration } from "./computeAcceleration";
import { Body } from "./bodyClass.js";

export function rk4(g, bodies, dt) {
  // Step 1: Compute k1 (based on current state)
  for (let i = 0; i < bodies.length; i++) {
    ComputeAcceleration(g, i, bodies);
  }

  let k1 = bodies.map((b) => ({
    vx: b.vx,
    vy: b.vy,
    ax: b.ax,
    ay: b.ay,
  }));

  // Step 2: Compute k2 (half step using k1)
  let mids1 = bodies.map(
    (b, i) =>
      new Body(
        b.x + 0.5 * dt * k1[i].vx,
        b.y + 0.5 * dt * k1[i].vy,
        b.vx + 0.5 * dt * k1[i].ax,
        b.vy + 0.5 * dt * k1[i].ay,
        b.m
      )
  );

  for (let i = 0; i < mids1.length; i++) {
    ComputeAcceleration(g, i, mids1);
  }

  let k2 = mids1.map((b) => ({
    vx: b.vx,
    vy: b.vy,
    ax: b.ax,
    ay: b.ay,
  }));

  // Step 3: Compute k3 (another half step using k2)
  let mids2 = bodies.map(
    (b, i) =>
      new Body(
        b.x + 0.5 * dt * k2[i].vx,
        b.y + 0.5 * dt * k2[i].vy,
        b.vx + 0.5 * dt * k2[i].ax,
        b.vy + 0.5 * dt * k2[i].ay,
        b.m
      )
  );

  for (let i = 0; i < mids2.length; i++) {
    ComputeAcceleration(g, i, mids2);
  }

  let k3 = mids2.map((b) => ({
    vx: b.vx,
    vy: b.vy,
    ax: b.ax,
    ay: b.ay,
  }));

  // Step 4: Compute k4 (full step using k3)
  let ends = bodies.map(
    (b, i) =>
      new Body(
        b.x + dt * k3[i].vx,
        b.y + dt * k3[i].vy,
        b.vx + dt * k3[i].ax,
        b.vy + dt * k3[i].ay,
        b.m
      )
  );

  for (let i = 0; i < ends.length; i++) {
    ComputeAcceleration(g, i, ends);
  }

  let k4 = ends.map((b) => ({
    vx: b.vx,
    vy: b.vy,
    ax: b.ax,
    ay: b.ay,
  }));

  // Step 5: Combine all stages
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].x +=
      (dt / 6) * (k1[i].vx + 2 * k2[i].vx + 2 * k3[i].vx + k4[i].vx);
    bodies[i].y +=
      (dt / 6) * (k1[i].vy + 2 * k2[i].vy + 2 * k3[i].vy + k4[i].vy);
    bodies[i].vx +=
      (dt / 6) * (k1[i].ax + 2 * k2[i].ax + 2 * k3[i].ax + k4[i].ax);
    bodies[i].vy +=
      (dt / 6) * (k1[i].ay + 2 * k2[i].ay + 2 * k3[i].ay + k4[i].ay);
  }
}
