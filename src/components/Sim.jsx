import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
// import MetricsGraph from "./graph";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { MdOutlineDarkMode } from "react-icons/md";
import ConfigDisplay from "./ConfigInfo";

export default function Sim({ config, handleBackButton, theme }) {
  const mainCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [startSim, setStartSim] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [metricsHistory, setMetricsHistory] = useState([]);
  let systemMetricRecord = useRef([]);
  const elapsedTime = useRef(0);

  const [settings, setSettings] = useState({
    scale: 50,
    simulator: "rk45",
    spf: 1500,
    dt: 1e-5,
    trails: true,
  });

  function handleStopButton(){
    elapsedTime.current = 0;
    setStartSim(false);
    
  }


// // bar graph on top left showing energy, momentum, angular momentum, potential energy, kinetic energy (something to note error)

//(optional) make it pannable?
//time analysis in days etc with irl days
//sexy ui
//light theme/darktheme
//astronomical units scale
//fix for 3 orbits orbits
//optinal (changing speed inbetween runs, changing scale inbetween runs, changing color scheme inbetween runs)
//consider it done afet finishding non optinal and making tht home page with lots of configsv
  

  useEffect(() => {
    if (!startSim) return;
    const G = 1;
       function ComputeAcceleration(i, bodies){
    let ax = 0;
    let ay = 0;
    for (let j=0; j<bodies.length; j++){
        if (j==i) continue;
        let deltax=bodies[j].x-bodies[i].x;
        let deltay=bodies[j].y-bodies[i].y;
        const distSq = deltax * deltax + deltay * deltay;
        const distCubed = Math.pow(distSq, 1.5) + 1e-8; // avoid division by 0
        const force = G * bodies[j].m / distCubed;
        ax += deltax * force;
        ay += deltay * force;

    }
    bodies[i].ax=ax;
    bodies[i].ay=ay;
    }
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
        totalK += 0.5 * body.m * (body.vx**2 + body.vy**2);
      }

      // Potential energy and angular momentum
      for (let i = 0; i < n; i++) {
        const b1 = bodies[i];
        totalL += b1.x * b1.m * b1.vy - b1.y * b1.m * b1.vx; // angular momentum
        for (let j = i + 1; j < n; j++) {
          const b2 = bodies[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const r = Math.sqrt(dx*dx + dy*dy) + 1e-8; // prevent div 0
          totalU += -G * b1.m * b2.m / r; // sum potential once per pair
        }
      }

      return {
        momentum: { px: totalPx, py: totalPy },
        angularMomentum: totalL,
        kineticEnergy: totalK,
        potentialEnergy: totalU,
        totalEnergy: totalK + totalU
      };
    }
    function rk2(bodies, dt) {
      
        for (let b of bodies){
            if ((b.x-b.oldx)*scale>=3){
                b.oldx=b.x;
                b.oldy=b.y;
        }
          
        }

        for (let i = 0; i < bodies.length; i++) {
            ComputeAcceleration(i, bodies);
        }

        let mids = [];
        for (let b of bodies) {
            mids.push(new Body(
                b.x + b.vx * dt / 2,
                b.y + b.vy * dt / 2,
                b.vx + b.ax * dt / 2,
                b.vy + b.ay * dt / 2,
                b.m,
            ));
        }


        for (let i = 0; i < mids.length; i++) {
            ComputeAcceleration(i, mids);
        }

        for (let i = 0; i < bodies.length; i++) {
            bodies[i].vx += mids[i].ax * dt;
            bodies[i].vy += mids[i].ay * dt;
            bodies[i].x += mids[i].vx * dt;
            bodies[i].y += mids[i].vy * dt;

        }
    }
    function computeAccForState(xs, ys, ms, softening = 1e-3) {
      const n = xs.length;
      const ax = new Array(n).fill(0);
      const ay = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        let axi = 0, ayi = 0;
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const dx = xs[j] - xs[i];
          const dy = ys[j] - ys[i];
          const r2 = dx*dx + dy*dy + softening*softening; // softening added to r^2
          const invR3 = 1.0 / Math.pow(r2, 1.5);
          const f = G * ms[j] * invR3;
          axi += dx * f;
          ayi += dy * f;
        }
        ax[i] = axi;
        ay[i] = ayi;
      }
      return {ax, ay};
    }
    function shiftToCOM(bodies) {
      let M = 0, vxSum = 0, vySum = 0, xSum = 0, ySum = 0;
      for (const b of bodies) { M += b.m; vxSum += b.vx * b.m; vySum += b.vy * b.m; xSum += b.x * b.m; ySum += b.y * b.m; }
      const comVx = vxSum / M, comVy = vySum / M;
      const comX = xSum / M, comY = ySum / M;
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
      const xs = bodies.map(b => b.x);
      const ys = bodies.map(b => b.y);
      const vxs = bodies.map(b => b.vx);
      const vys = bodies.map(b => b.vy);
      const ms = bodies.map(b => b.m);

      // k1
      const { ax: a1x, ay: a1y } = computeAccForState(xs, ys, ms, softening);
      const k1x = vxs.slice(), k1y = vys.slice();
      const k1vx = a1x.slice(), k1vy = a1y.slice();

      // state for k2
      const xs_k2 = new Array(n), ys_k2 = new Array(n), vxs_k2 = new Array(n), vys_k2 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k2[i] = xs[i] + 0.5 * dt * k1x[i];
        ys_k2[i] = ys[i] + 0.5 * dt * k1y[i];
        vxs_k2[i] = vxs[i] + 0.5 * dt * k1vx[i];
        vys_k2[i] = vys[i] + 0.5 * dt * k1vy[i];
      }
      const { ax: a2x, ay: a2y } = computeAccForState(xs_k2, ys_k2, ms, softening);
      const k2x = vxs_k2.slice(), k2y = vys_k2.slice();
      const k2vx = a2x.slice(), k2vy = a2y.slice();

      // k3
      const xs_k3 = new Array(n), ys_k3 = new Array(n), vxs_k3 = new Array(n), vys_k3 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k3[i] = xs[i] + 0.5 * dt * k2x[i];
        ys_k3[i] = ys[i] + 0.5 * dt * k2y[i];
        vxs_k3[i] = vxs[i] + 0.5 * dt * k2vx[i];
        vys_k3[i] = vys[i] + 0.5 * dt * k2vy[i];
      }
      const { ax: a3x, ay: a3y } = computeAccForState(xs_k3, ys_k3, ms, softening);
      const k3x = vxs_k3.slice(), k3y = vys_k3.slice();
      const k3vx = a3x.slice(), k3vy = a3y.slice();

      // k4
      const xs_k4 = new Array(n), ys_k4 = new Array(n), vxs_k4 = new Array(n), vys_k4 = new Array(n);
      for (let i = 0; i < n; i++) {
        xs_k4[i] = xs[i] + dt * k3x[i];
        ys_k4[i] = ys[i] + dt * k3y[i];
        vxs_k4[i] = vxs[i] + dt * k3vx[i];
        vys_k4[i] = vys[i] + dt * k3vy[i];
      }
      const { ax: a4x, ay: a4y } = computeAccForState(xs_k4, ys_k4, ms, softening);
      const k4x = vxs_k4.slice(), k4y = vys_k4.slice();
      const k4vx = a4x.slice(), k4vy = a4y.slice();

      // combine increments
      for (let i = 0; i < n; i++) {
        bodies[i].x = xs[i] + dt / 6 * (k1x[i] + 2*k2x[i] + 2*k3x[i] + k4x[i]);
        bodies[i].y = ys[i] + dt / 6 * (k1y[i] + 2*k2y[i] + 2*k3y[i] + k4y[i]);
        bodies[i].vx = vxs[i] + dt / 6 * (k1vx[i] + 2*k2vx[i] + 2*k3vx[i] + k4vx[i]);
        bodies[i].vy = vys[i] + dt / 6 * (k1vy[i] + 2*k2vy[i] + 2*k3vy[i] + k4vy[i]);
      }
    }
    function stateFromBodies(bodies) {
      const n = bodies.length;
      const y = new Float64Array(4*n);
      for (let i=0;i<n;i++){
        y[4*i]   = bodies[i].x;
        y[4*i+1] = bodies[i].y;
        y[4*i+2] = bodies[i].vx;
        y[4*i+3] = bodies[i].vy;
      }
      return y;
    }
    function bodiesFromState(bodies, y) {
      for (let i=0;i<bodies.length;i++){
        bodies[i].x = y[4*i];
        bodies[i].y = y[4*i+1];
        bodies[i].vx = y[4*i+2];
        bodies[i].vy = y[4*i+3];
      }
    }
    function deriv(y, masses, eps=1e-3) {
      const n = masses.length;
      const dydt = new Float64Array(4*n);
      // vx, vy go into position derivatives
      for (let i=0;i<n;i++){
        dydt[4*i]   = y[4*i+2];
        dydt[4*i+1] = y[4*i+3];
      }
      // compute accelerations with Plummer softening
      for (let i=0;i<n;i++){
        let ax = 0, ay = 0;
        const xi = y[4*i], yi = y[4*i+1];
        for (let j=0;j<n;j++){
          if (i === j) continue;
          const xj = y[4*j], yj = y[4*j+1];
          const dx = xj - xi, dy = yj - yi;
          const r2 = dx*dx + dy*dy + eps*eps;
          const invR3 = 1.0 / Math.pow(r2, 1.5);
          const f = G * masses[j] * invR3;
          ax += dx * f; ay += dy * f;
        }
        dydt[4*i+2] = ax;
        dydt[4*i+3] = ay;
      }
      return dydt;
    }
    function rk45Step(y, masses, dt, eps=1e-3, tol=1e-9) {
      const nvar = y.length;
      const k1 = deriv(y, masses, eps);

      // helper to compute y + dt * sum(a_i * k_i)
      function lincomb(base, coeffs, ks) {
        const tmp = new Float64Array(nvar);
        for (let i=0;i<nvar;i++) tmp[i] = base[i];
        for (let s=0;s<coeffs.length;s++){
          const c = coeffs[s];
          if (c === 0) continue;
          const K = ks[s];
          for (let i=0;i<nvar;i++) tmp[i] += dt * c * K[i];
        }
        return tmp;
      }

      // coefficients (Dormand-Prince)
      const a2 = [1/5];
      const a3 = [3/40, 9/40];
      const a4 = [44/45, -56/15, 32/9];
      const a5 = [19372/6561, -25360/2187, 64448/6561, -212/729];
      const a6 = [9017/3168, -355/33, 46732/5247, 49/176, -5103/18656];
      const a7 = [35/384, 0, 500/1113, 125/192, -2187/6784, 11/84];

      const k2 = deriv(lincomb(y, a2, [k1]), masses, eps);
      const k3 = deriv(lincomb(y, a3, [k1,k2]), masses, eps);
      const k4 = deriv(lincomb(y, a4, [k1,k2,k3]), masses, eps);
      const k5 = deriv(lincomb(y, a5, [k1,k2,k3,k4]), masses, eps);
      const k6 = deriv(lincomb(y, a6, [k1,k2,k3,k4,k5]), masses, eps);
      const k7 = deriv(lincomb(y, a7, [k1,k2,k3,k4,k5,k6]), masses, eps);

      // 5th order solution (b)
      const b = [35/384, 0, 500/1113, 125/192, -2187/6784, 11/84, 0];
      // 4th order solution (bstar) - used for error estimate
      const bstar = [5179/57600, 0, 7571/16695, 393/640, -92097/339200, 187/2100, 1/40];

      // build y5 and y4
      const y5 = new Float64Array(nvar);
      const y4 = new Float64Array(nvar);
      for (let i=0;i<nvar;i++){
        y5[i] = y[i] + dt * (b[0]*k1[i] + b[1]*k2[i] + b[2]*k3[i] + b[3]*k4[i] + b[4]*k5[i] + b[5]*k6[i] + b[6]*k7[i]);
        y4[i] = y[i] + dt * (bstar[0]*k1[i] + bstar[1]*k2[i] + bstar[2]*k3[i] + bstar[3]*k4[i] + bstar[4]*k5[i] + bstar[5]*k6[i] + bstar[6]*k7[i]);
      }

      // error norm (scaled)
      let err2 = 0;
      for (let i=0;i<nvar;i++){
        const sc = 1e-6 + 1e-3 * Math.max(Math.abs(y[i]), Math.abs(y5[i])); // atol + rtol*scale
        const e = (y5[i] - y4[i]) / sc;
        err2 += e*e;
      }
      const err = Math.sqrt(err2 / nvar);

      // adapt dt
      const SAFETY = 0.9;
      const ORDER = 5; // method order
      if (err === 0) {
        // extremely small error, increase dt
        return { success: true, yNew: y5, dtNew: dt * 5 };
      }
      const factor = SAFETY * Math.pow(tol / err, 1/ORDER);
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
      const masses = bodies.map(b => b.m);
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
    
        let original = bodies.map(b => ({...b}));
    
        // Arrays to store k1 to k4 for velocity and acceleration
        let k1v = [], k1a = [];
        let k2v = [], k2a = [];
        let k3v = [], k3a = [];
        let k4v = [], k4a = [];
    
        // === K1 ===
        for (let i = 0; i < n; i++) {
            ComputeAcceleration(i, bodies);
            k1v[i] = {vx: bodies[i].vx, vy: bodies[i].vy};
            k1a[i] = {ax: bodies[i].ax, ay: bodies[i].ay};
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
            k2v[i] = {vx: bodies[i].vx, vy: bodies[i].vy};
            k2a[i] = {ax: bodies[i].ax, ay: bodies[i].ay};
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
            k3v[i] = {vx: bodies[i].vx, vy: bodies[i].vy};
            k3a[i] = {ax: bodies[i].ax, ay: bodies[i].ay};
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
            k4v[i] = {vx: bodies[i].vx, vy: bodies[i].vy};
            k4a[i] = {ax: bodies[i].ax, ay: bodies[i].ay};
        }
    
        // === Combine Increments ===
        for (let i = 0; i < n; i++) {
            bodies[i].x = original[i].x + dt / 6 * (
                k1v[i].vx + 2 * k2v[i].vx + 2 * k3v[i].vx + k4v[i].vx
            );
            bodies[i].y = original[i].y + dt / 6 * (
                k1v[i].vy + 2 * k2v[i].vy + 2 * k3v[i].vy + k4v[i].vy
            );
            bodies[i].vx = original[i].vx + dt / 6 * (
                k1a[i].ax + 2 * k2a[i].ax + 2 * k3a[i].ax + k4a[i].ax
            );
            bodies[i].vy = original[i].vy + dt / 6 * (
                k1a[i].ay + 2 * k2a[i].ay + 2 * k3a[i].ay + k4a[i].ay
            );
        }
    }
    function vv(bodies, dt) {
        for (let i = 0; i < bodies.length; i++) {
            ComputeAcceleration(i, bodies);
        }
    
        let oldAx = bodies.map(b => b.ax);
        let oldAy = bodies.map(b => b.ay);
    
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

 

    const mainCanvas = mainCanvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    const mainCanvasContext = mainCanvas.getContext("2d");
    const bgCanvasContext = bgCanvas.getContext("2d");

    const window_width = window.innerWidth;
    const window_height = window.innerHeight;

    mainCanvas.width = window_width;
    mainCanvas.height = window_height;
    bgCanvas.width = window_width;
    bgCanvas.height = window_height;

    if (theme === "light"){
      bgCanvas.style.background = "#ffffff";
    } else {bgCanvas.style.background = "#000000";}
    mainCanvas.style.background = "transparent";

    const originX =mainCanvas.width / 2;
    const originY = mainCanvas.height / 2;

    let scale = settings.scale;
    const colorScheme = [
      { body1: "red", body2: "green", body3: "blue" },
      { body1: "#00FFC5", body2: "#FF3CAC", body3: "#845EC2" },
      { body1: "#FFB86F", body2: "#8BE9FD", body3: "#BD93F9" },
    ];
    let i = 1; 
    class Body {
      constructor(x, y, vx, vy, m, name, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.m = m;
        this.name = name;
        this.color = color;
        this.oldx = x;
        this.oldy = y;
      }

      drawCircle(context) {
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(xpos, ypos, getRadius(this.m), 0, Math.PI * 2, false);
        context.fill();
      }

      drawSmallCircle(context) {
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(xpos, ypos, 0.8, 0, Math.PI * 2, false);
        context.fill();
      }

      drawText(context, text) {
        let xpos = originX + this.x * scale;
        let ypos = originY + this.y * scale;
        if (theme === "light"){
          context.fillStyle = "black";
        } else {
        context.fillStyle = "#f7f5ef";}
        context.font = "11px system-ui";
        context.fillText(text, xpos + 10, ypos - 10);
      }
    }

    let bodies = config.bodies.map((b, idx) => {
    
      const colorKeys = Object.keys(colorScheme[i]);
      const color = colorScheme[i][colorKeys[idx % colorKeys.length]];

      return new Body(b.x, b.y, b.vx, b.vy, b.m, b.name || null, color);
    }); 


    let dt = settings.dt;
    let stepsPerFrame = settings.spf;
let animationId;
let frameCounter = 0;

const RunSim = () => {
  animationId = requestAnimationFrame(RunSim);
  mainCanvasContext.clearRect(0, 0, window_width, window_height);
  const time = 0;

  for (let j = 0; j < stepsPerFrame; j++) {
      if (settings.simulator === "rk2") {
    rk2(bodies, dt);
  } else if (settings.simulator === "rk4") {
    rk4_safe(bodies, dt);
  } else if (settings.simulator === "vv") {
    vv(bodies, dt);}
    else if (settings.simulator === "rk45") {
    adaptiveIntegrate(bodies, dt, {eps: 1e-2, tol: 1e-8})
  }

  }

const metrics = computeSystemMetrics(bodies);
elapsedTime.current += dt * stepsPerFrame;

frameCounter++;
// Only push every 10 frames
if (frameCounter % 90 === 0) {
  systemMetricRecord.current.push({
    time: +elapsedTime.current.toFixed(2),
    energy: metrics.totalEnergy,
    momentum: metrics.momentum,
    angularMomentum: metrics.angularMomentum,
    potentialEnergy: metrics.potentialEnergy,
    kineticEnergy: metrics.kineticEnergy,
  });

  // Keep history short (e.g., 200 points)
  if (systemMetricRecord.current.length > 50) systemMetricRecord.current.shift();

  // Update Recharts state
  setMetricsHistory([...systemMetricRecord.current]);
  }
      

  for (let [index, body] of bodies.entries()) {
    if (settings.trails){body.drawSmallCircle(bgCanvasContext);}
    body.drawCircle(mainCanvasContext);
    body.drawText(mainCanvasContext, body.name || `Body ${index+1}`);
  }
};

RunSim();

    return () => cancelAnimationFrame(animationId);
  }, [startSim]);

  // Prepare a lightweight list for the UI info bar (use config as the source of truth for masses)
  const infoBodyList = (() => {
    if (!config || !Array.isArray(config.bodies)) return [];
    const colorScheme = [
      { body1: "red", body2: "green", body3: "blue" },
      { body1: "#00FFC5", body2: "#FF3CAC", body3: "#845EC2" },
      { body1: "#FFB86F", body2: "#8BE9FD", body3: "#BD93F9" },
    ];
    const i = 1;
    return config.bodies.map((b, idx) => {
      const colorKeys = Object.keys(colorScheme[i]);
      const color = colorScheme[i][colorKeys[idx % colorKeys.length]];
      return { name: b.name || null, m: b.m, color };
    });
  })();

 return (
  <>
    {startSim ? (
      <div className='simCont'>
        <button onClick={handleBackButton} className="button">
          Home
        </button>
        <div style={{ position: "absolute", zIndex: 20, top: 50, left: 40, background: "transparent", padding: "10px", borderRadius: "8px" }}>
  <LineChart width={300} height={400} data={metricsHistory}>
    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
    <XAxis dataKey="time" stroke="#aaa" />
    <YAxis stroke="#aaa" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="energy" stroke="#00FF88" dot={false} name="E (Total Energy)"/>
    {/* <Line type="monotone" dataKey="momentum.px" stroke="#FF3CAC" dot={false} name="Momentum Px" />
    <Line type="monotone" dataKey="momentum.py" stroke="#3CAFFF" dot={false} name="Momentum Py" />
    <Line type="monotone" dataKey="angularMomentum" stroke="#845EC2" dot={false} /> */}
    <Line type="monotone" dataKey="kineticEnergy" stroke="#FFD700" dot={false} name="K (Kinetic Energy)" />
    <Line type="monotone" dataKey="potentialEnergy" stroke="#00BFFF" dot={false} name="U (Potential Energy)"/>
  </LineChart>
</div>
        <button className="button2" onClick={handleStopButton}>stop</button>
        {/* Info bar: show mass and color for each body (uses config as source of mass values) */}
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 30, background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)', color: theme === 'light' ? '#000' : '#fff', padding: '8px 10px', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center', overflowX: 'auto' }}>
          {infoBodyList.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 100 }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: b.color, boxShadow: '0 0 6px rgba(0,0,0,0.4)' }} />
              <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 700 }}>{b.name || `Body ${idx+1}`}</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>m: {Number(b.m).toFixed(3)}</div>
              </div>
            </div>
          ))}
        </div>
        {/* <button className="button3">Time: {elapsedTime.toFixed(1)}</button> */}
        <div className="canvas">
          <canvas ref={bgCanvasRef} className="bg-canvas"></canvas>
          <canvas ref={mainCanvasRef} className="main-canvas"></canvas>
        </div>
      </div>
    ) : (<>

    <div className="formPageContain">
          <button onClick={handleBackButton} className="button">
          Home
        </button>
        <ConfigDisplay  config={config} />
        {theme=='light' ?
              <button className="themeButton" onClick={()=>setTheme('dark')}><MdOutlineDarkMode color='black' size={30}/></button> :
              <button className="themeButton" onClick={()=>setTheme('light')}><MdOutlineDarkMode color='white' size={30}/></button>
            }
      <h1>Select Settings</h1>
      <Form settings={settings} setSettings={setSettings} />
      <button onClick={()=>setStartSim(true)}>Run Config</button></div><p>Explantion</p></>
    )}
  </>
)
}