import { ComputeAcceleration } from "./computeAcceleration";
import { Body } from "./bodyClass.js";

export function rk2(g, bodies, dt) {

      for (let i = 0; i < bodies.length; i++) {
        ComputeAcceleration(g, i, bodies);
      }

      let mids = [];
      for (let b of bodies) {
        mids.push(
          new Body(
            b.x + (b.vx * dt) / 2,
            b.y + (b.vy * dt) / 2,
            b.vx + (b.ax * dt) / 2,
            b.vy + (b.ay * dt) / 2,
            b.m
          )
        );
      }

      for (let i = 0; i < mids.length; i++) {
        ComputeAcceleration(g, i, mids);
      }

      for (let i = 0; i < bodies.length; i++) {
        bodies[i].vx += mids[i].ax * dt;
        bodies[i].vy += mids[i].ay * dt;
        bodies[i].x += mids[i].vx * dt;
        bodies[i].y += mids[i].vy * dt;
      }
    }
