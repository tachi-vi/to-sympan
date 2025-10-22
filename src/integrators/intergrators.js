
    function computeSystemMetrics(bodies) {
      let totalPx = 0;
      let totalPy = 0;
      let totalL = 0;
      let totalK = 0;
      let totalU = 0;

      const n = bodies.length;

      // Kinetic energy and linear momentum
      for (let body of bodies) {
        totalPx += body.m * body.vx;
        totalPy += body.m * body.vy;
        totalK += 0.5 * body.m * (body.vx ** 2 + body.vy ** 2);
      }

      // Potential energy and angular momentum
      for (let i = 0; i < n; i++) {
        const b1 = bodies[i];
        totalL += b1.x * b1.m * b1.vy - b1.y * b1.m * b1.vx; // angular momentum
        for (let j = i + 1; j < n; j++) {
          const b2 = bodies[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const r = Math.sqrt(dx * dx + dy * dy) + 1e-8; // prevent div 0
          totalU += (-G * b1.m * b2.m) / r; // sum potential once per pair
        }
      }

      return {
        momentum: { px: totalPx, py: totalPy },
        angularMomentum: totalL,
        kineticEnergy: totalK,
        potentialEnergy: totalU,
        totalEnergy: totalK + totalU,
      };
    }

    // Compute one Cash-Karp RK5 step
    function rkckStep(bodies, dt) {
      const n = bodies.length;

      // Deep copy utility
      function copyBodies(src) {
        return src.map((b) => new Body(b.x, b.y, b.vx, b.vy, b.m));
      }

      // Flatten state for easier calculations
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

      // Derivative function: returns [dx/dt, dy/dt, dvx/dt, dvy/dt,...]
      function derivatives(bodies) {
        const derivs = [];
        // compute accelerations first
        for (let i = 0; i < n; i++) ComputeAcceleration(i, bodies);

        for (let b of bodies) {
          derivs.push(b.vx, b.vy, b.ax, b.ay);
        }
        return derivs;
      }

      // Cash-Karp coefficients
      const a = [
        [],
        [1 / 5],
        [3 / 40, 9 / 40],
        [3 / 10, -9 / 10, 6 / 5],
        [-11 / 54, 5 / 2, -70 / 27, 35 / 27],
        [1631 / 55296, 175 / 512, 575 / 13824, 44275 / 110592, 253 / 4096],
      ];

      const c = [0, 1 / 5, 3 / 10, 3 / 5, 1, 7 / 8];

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

      // Compute k1..k6
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
          for (let k = 0; k < a[i].length; k++) {
            sum += a[i][k] * ks[k][j];
          }
          ytemp.push(y0[j] + dt * sum);
        }
        setState(tempBodies, ytemp);
        ks.push(derivatives(tempBodies));
      }

      // Compute y5 and y4
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

      // Compute error estimate
      let err = 0;
      for (let j = 0; j < y0.length; j++) {
        err += Math.pow(y5[j] - y4[j], 2);
      }
      err = Math.sqrt(err);

      // Return new bodies (y5) and error
      tempBodies = copyBodies(bodies);
      setState(tempBodies, y5);
      return { newBodies: tempBodies, err };
    }

    function computeAccForState(xs, ys, ms, softening = 1e-3) {
      const n = xs.length;
      const ax = new Array(n).fill(0);
      const ay = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        let axi = 0,
          ayi = 0;
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const dx = xs[j] - xs[i];
          const dy = ys[j] - ys[i];
          const r2 = dx * dx + dy * dy + softening * softening; // softening added to r^2
          const invR3 = 1.0 / Math.pow(r2, 1.5);
          const f = G * ms[j] * invR3;
          axi += dx * f;
          ayi += dy * f;
        }
        ax[i] = axi;
        ay[i] = ayi;
      }
      return { ax, ay };
    }
    function shiftToCOM(bodies) {
      let M = 0,
        vxSum = 0,
        vySum = 0,
        xSum = 0,
        ySum = 0;
      for (const b of bodies) {
        M += b.m;
        vxSum += b.vx * b.m;
        vySum += b.vy * b.m;
        xSum += b.x * b.m;
        ySum += b.y * b.m;
      }
      const comVx = vxSum / M,
        comVy = vySum / M;
      const comX = xSum / M,
        comY = ySum / M;
      for (const b of bodies) {
        b.vx -= comVx;
        b.vy -= comVy;
        b.x -= comX;
        b.y -= comY;
      }
    }
    function rk4_safe(bodies, dt, softening = 1e-3) {
      const n = bodies.length;
      // extract arrays
      const xs = bodies.map((b) => b.x);
      const ys = bodies.map((b) => b.y);
      const vxs = bodies.map((b) => b.vx);
      const vys = bodies.map((b) => b.vy);
      const ms = bodies.map((b) => b.m);

      // k1
      const { ax: a1x, ay: a1y } = computeAccForState(xs, ys, ms, softening);
      const k1x = vxs.slice(),
        k1y = vys.slice();
      const k1vx = a1x.slice(),
        k1vy = a1y.slice();

      // state for k2
      const xs_k2 = new Array(n),
        ys_k2 = new Array(n),
        vxs_k2 = new Array(n),
        vys_k2 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k2[i] = xs[i] + 0.5 * dt * k1x[i];
        ys_k2[i] = ys[i] + 0.5 * dt * k1y[i];
        vxs_k2[i] = vxs[i] + 0.5 * dt * k1vx[i];
        vys_k2[i] = vys[i] + 0.5 * dt * k1vy[i];
      }
      const { ax: a2x, ay: a2y } = computeAccForState(
        xs_k2,
        ys_k2,
        ms,
        softening
      );
      const k2x = vxs_k2.slice(),
        k2y = vys_k2.slice();
      const k2vx = a2x.slice(),
        k2vy = a2y.slice();

      // k3
      const xs_k3 = new Array(n),
        ys_k3 = new Array(n),
        vxs_k3 = new Array(n),
        vys_k3 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k3[i] = xs[i] + 0.5 * dt * k2x[i];
        ys_k3[i] = ys[i] + 0.5 * dt * k2y[i];
        vxs_k3[i] = vxs[i] + 0.5 * dt * k2vx[i];
        vys_k3[i] = vys[i] + 0.5 * dt * k2vy[i];
      }
      const { ax: a3x, ay: a3y } = computeAccForState(
        xs_k3,
        ys_k3,
        ms,
        softening
      );
      const k3x = vxs_k3.slice(),
        k3y = vys_k3.slice();
      const k3vx = a3x.slice(),
        k3vy = a3y.slice();

      // k4
      const xs_k4 = new Array(n),
        ys_k4 = new Array(n),
        vxs_k4 = new Array(n),
        vys_k4 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k4[i] = xs[i] + dt * k3x[i];
        ys_k4[i] = ys[i] + dt * k3y[i];
        vxs_k4[i] = vxs[i] + dt * k3vx[i];
        vys_k4[i] = vys[i] + dt * k3vy[i];
      }
      const { ax: a4x, ay: a4y } = computeAccForState(
        xs_k4,
        ys_k4,
        ms,
        softening
      );
      const k4x = vxs_k4.slice(),
        k4y = vys_k4.slice();
      const k4vx = a4x.slice(),
        k4vy = a4y.slice();

      // combine increments
      for (let i = 0; i < n; i++) {
        bodies[i].x =
          xs[i] + (dt / 6) * (k1x[i] + 2 * k2x[i] + 2 * k3x[i] + k4x[i]);
        bodies[i].y =
          ys[i] + (dt / 6) * (k1y[i] + 2 * k2y[i] + 2 * k3y[i] + k4y[i]);
        bodies[i].vx =
          vxs[i] + (dt / 6) * (k1vx[i] + 2 * k2vx[i] + 2 * k3vx[i] + k4vx[i]);
        bodies[i].vy =
          vys[i] + (dt / 6) * (k1vy[i] + 2 * k2vy[i] + 2 * k3vy[i] + k4vy[i]);
      }
    }
    function stateFromBodies(bodies) {
      const n = bodies.length;
      const y = new Float64Array(4 * n);
      for (let i = 0; i < n; i++) {
        y[4 * i] = bodies[i].x;
        y[4 * i + 1] = bodies[i].y;
        y[4 * i + 2] = bodies[i].vx;
        y[4 * i + 3] = bodies[i].vy;
      }
      return y;
    }
    function bodiesFromState(bodies, y) {
      for (let i = 0; i < bodies.length; i++) {
        bodies[i].x = y[4 * i];
        bodies[i].y = y[4 * i + 1];
        bodies[i].vx = y[4 * i + 2];
        bodies[i].vy = y[4 * i + 3];
      }
    }
    function deriv(y, masses, eps = 1e-3) {
      const n = masses.length;
      const dydt = new Float64Array(4 * n);
      // vx, vy go into position derivatives
      for (let i = 0; i < n; i++) {
        dydt[4 * i] = y[4 * i + 2];
        dydt[4 * i + 1] = y[4 * i + 3];
      }
      // compute accelerations with Plummer softening
      for (let i = 0; i < n; i++) {
        let ax = 0,
          ay = 0;
        const xi = y[4 * i],
          yi = y[4 * i + 1];
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const xj = y[4 * j],
            yj = y[4 * j + 1];
          const dx = xj - xi,
            dy = yj - yi;
          const r2 = dx * dx + dy * dy + eps * eps;
          const invR3 = 1.0 / Math.pow(r2, 1.5);
          const f = G * masses[j] * invR3;
          ax += dx * f;
          ay += dy * f;
        }
        dydt[4 * i + 2] = ax;
        dydt[4 * i + 3] = ay;
      }
      return dydt;
    }
    function rk45Step(y, masses, dt, eps = 1e-3, tol = 1e-9) {
      const nvar = y.length;
      const k1 = deriv(y, masses, eps);

      // helper to compute y + dt * sum(a_i * k_i)
      function lincomb(base, coeffs, ks) {
        const tmp = new Float64Array(nvar);
        for (let i = 0; i < nvar; i++) tmp[i] = base[i];
        for (let s = 0; s < coeffs.length; s++) {
          const c = coeffs[s];
          if (c === 0) continue;
          const K = ks[s];
          for (let i = 0; i < nvar; i++) tmp[i] += dt * c * K[i];
        }
        return tmp;
      }

      // coefficients (Dormand-Prince)
      const a2 = [1 / 5];
      const a3 = [3 / 40, 9 / 40];
      const a4 = [44 / 45, -56 / 15, 32 / 9];
      const a5 = [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729];
      const a6 = [
        9017 / 3168,
        -355 / 33,
        46732 / 5247,
        49 / 176,
        -5103 / 18656,
      ];
      const a7 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84];

      const k2 = deriv(lincomb(y, a2, [k1]), masses, eps);
      const k3 = deriv(lincomb(y, a3, [k1, k2]), masses, eps);
      const k4 = deriv(lincomb(y, a4, [k1, k2, k3]), masses, eps);
      const k5 = deriv(lincomb(y, a5, [k1, k2, k3, k4]), masses, eps);
      const k6 = deriv(lincomb(y, a6, [k1, k2, k3, k4, k5]), masses, eps);
      const k7 = deriv(lincomb(y, a7, [k1, k2, k3, k4, k5, k6]), masses, eps);

      // 5th order solution (b)
      const b = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
      // 4th order solution (bstar) - used for error estimate
      const bstar = [
        5179 / 57600,
        0,
        7571 / 16695,
        393 / 640,
        -92097 / 339200,
        187 / 2100,
        1 / 40,
      ];

      // build y5 and y4
      const y5 = new Float64Array(nvar);
      const y4 = new Float64Array(nvar);
      for (let i = 0; i < nvar; i++) {
        y5[i] =
          y[i] +
          dt *
            (b[0] * k1[i] +
              b[1] * k2[i] +
              b[2] * k3[i] +
              b[3] * k4[i] +
              b[4] * k5[i] +
              b[5] * k6[i] +
              b[6] * k7[i]);
        y4[i] =
          y[i] +
          dt *
            (bstar[0] * k1[i] +
              bstar[1] * k2[i] +
              bstar[2] * k3[i] +
              bstar[3] * k4[i] +
              bstar[4] * k5[i] +
              bstar[5] * k6[i] +
              bstar[6] * k7[i]);
      }

      // error norm (scaled)
      let err2 = 0;
      for (let i = 0; i < nvar; i++) {
        const sc = 1e-6 + 1e-3 * Math.max(Math.abs(y[i]), Math.abs(y5[i])); // atol + rtol*scale
        const e = (y5[i] - y4[i]) / sc;
        err2 += e * e;
      }
      const err = Math.sqrt(err2 / nvar);

      // adapt dt
      const SAFETY = 0.9;
      const ORDER = 5; // method order
      if (err === 0) {
        // extremely small error, increase dt
        return { success: true, yNew: y5, dtNew: dt * 5 };
      }
      const factor = SAFETY * Math.pow(tol / err, 1 / ORDER);
      const dtNew = Math.max(1e-16, Math.min(5, factor)) * dt;

      if (err <= 1) {
        return { success: true, yNew: y5, dtNew };
      } else {
        // step failed, request smaller dt and try again
        return { success: false, dtNew };
      }
    }
    function adaptiveIntegrate(bodies, dtTarget, opts = {}) {
      const { eps = 1e-3, tol = 1e-8 } = opts;
      const masses = bodies.map((b) => b.m);
      let state = stateFromBodies(bodies);
      let remain = dtTarget;
      let dt = Math.min(dtTarget, 1e-3); // initial guess
      while (remain > 1e-16) {
        if (dt > remain) dt = remain;
        const res = rk45Step(state, masses, dt, eps, tol);
        if (res.success) {
          state = res.yNew;
          remain -= dt;
          dt = res.dtNew;
        } else {
          // reduce dt and retry
          dt = res.dtNew;
        }
      }
      bodiesFromState(bodies, state);
    }
    function rk4(bodies, dt) {
      let n = bodies.length;

      let original = bodies.map((b) => ({ ...b }));

      // Arrays to store k1 to k4 for velocity and acceleration
      let k1v = [],
        k1a = [];
      let k2v = [],
        k2a = [];
      let k3v = [],
        k3a = [];
      let k4v = [],
        k4a = [];

      // === K1 ===
      for (let i = 0; i < n; i++) {
        ComputeAcceleration(i, bodies);
        k1v[i] = { vx: bodies[i].vx, vy: bodies[i].vy };
        k1a[i] = { ax: bodies[i].ax, ay: bodies[i].ay };
      }

      // === K2 ===
      for (let i = 0; i < n; i++) {
        bodies[i].x = original[i].x + 0.5 * dt * k1v[i].vx;
        bodies[i].y = original[i].y + 0.5 * dt * k1v[i].vy;
        bodies[i].vx = original[i].vx + 0.5 * dt * k1a[i].ax;
        bodies[i].vy = original[i].vy + 0.5 * dt * k1a[i].ay;
      }
      for (let i = 0; i < n; i++) {
        ComputeAcceleration(i, bodies);
        k2v[i] = { vx: bodies[i].vx, vy: bodies[i].vy };
        k2a[i] = { ax: bodies[i].ax, ay: bodies[i].ay };
      }

      // === K3 ===
      for (let i = 0; i < n; i++) {
        bodies[i].x = original[i].x + 0.5 * dt * k2v[i].vx;
        bodies[i].y = original[i].y + 0.5 * dt * k2v[i].vy;
        bodies[i].vx = original[i].vx + 0.5 * dt * k2a[i].ax;
        bodies[i].vy = original[i].vy + 0.5 * dt * k2a[i].ay;
      }
      for (let i = 0; i < n; i++) {
        ComputeAcceleration(i, bodies);
        k3v[i] = { vx: bodies[i].vx, vy: bodies[i].vy };
        k3a[i] = { ax: bodies[i].ax, ay: bodies[i].ay };
      }

      // === K4 ===
      for (let i = 0; i < n; i++) {
        bodies[i].x = original[i].x + dt * k3v[i].vx;
        bodies[i].y = original[i].y + dt * k3v[i].vy;
        bodies[i].vx = original[i].vx + dt * k3a[i].ax;
        bodies[i].vy = original[i].vy + dt * k3a[i].ay;
      }
      for (let i = 0; i < n; i++) {
        ComputeAcceleration(i, bodies);
        k4v[i] = { vx: bodies[i].vx, vy: bodies[i].vy };
        k4a[i] = { ax: bodies[i].ax, ay: bodies[i].ay };
      }

      // === Combine Increments ===
      for (let i = 0; i < n; i++) {
        bodies[i].x =
          original[i].x +
          (dt / 6) * (k1v[i].vx + 2 * k2v[i].vx + 2 * k3v[i].vx + k4v[i].vx);
        bodies[i].y =
          original[i].y +
          (dt / 6) * (k1v[i].vy + 2 * k2v[i].vy + 2 * k3v[i].vy + k4v[i].vy);
        bodies[i].vx =
          original[i].vx +
          (dt / 6) * (k1a[i].ax + 2 * k2a[i].ax + 2 * k3a[i].ax + k4a[i].ax);
        bodies[i].vy =
          original[i].vy +
          (dt / 6) * (k1a[i].ay + 2 * k2a[i].ay + 2 * k3a[i].ay + k4a[i].ay);
      }
    }
    function vv(bodies, dt) {
      for (let i = 0; i < bodies.length; i++) {
        ComputeAcceleration(i, bodies);
      }

      let oldAx = bodies.map((b) => b.ax);
      let oldAy = bodies.map((b) => b.ay);

      for (let i = 0; i < bodies.length; i++) {
        bodies[i].x += bodies[i].vx * dt + 0.5 * oldAx[i] * dt * dt;
        bodies[i].y += bodies[i].vy * dt + 0.5 * oldAy[i] * dt * dt;
      }

      for (let i = 0; i < bodies.length; i++) {
        ComputeAcceleration(i, bodies);
      }

      for (let i = 0; i < bodies.length; i++) {
        bodies[i].vx += 0.5 * (oldAx[i] + bodies[i].ax) * dt;
        bodies[i].vy += 0.5 * (oldAy[i] + bodies[i].ay) * dt;
      }
    }
    function getRadius(mass) {
      const minRadius = 3;
      const maxRadius = 8;
      const scaled = Math.log10(mass + 1) * 3;
      return Math.min(maxRadius, Math.max(minRadius, scaled));
    }