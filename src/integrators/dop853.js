// Helper: clone the array of bodies (deep copy of properties)
function copyBodies(bodies) {
  return bodies.map(b => {
    // Create a new object with same prototype and copy fields
    let nb = Object.assign(Object.create(Object.getPrototypeOf(b)), b);
    // Reset accelerations in the copy (they will be recomputed as needed)
    nb.ax = 0; 
    nb.ay = 0;
    return nb;
  });
}

// Helper: get flat state vector [x,y,vx,vy,...] from bodies array
function getState(bodies) {
  const state = [];
  for (let b of bodies) {
    state.push(b.x, b.y, b.vx, b.vy);
  }
  return state;
}

// Helper: set bodies positions/velocities from flat state vector
function setState(bodies, state) {
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].x  = state[4*i];
    bodies[i].y  = state[4*i + 1];
    bodies[i].vx = state[4*i + 2];
    bodies[i].vy = state[4*i + 3];
    // ax, ay will be updated by computeAccelerations when needed
  }
}

// Compute Newtonian gravitational accelerations for all bodies (2D)
// G is the gravitational constant (set to 1 for convenience or choose as needed)
const G = 1.0;
function computeAccelerations(bodies) {
  const n = bodies.length;
  // Initialize accelerations
  for (let i = 0; i < n; i++) {
    bodies[i].ax = 0;
    bodies[i].ay = 0;
  }
  // Pairwise force computation (symmetry: update i and j in one loop)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let bi = bodies[i], bj = bodies[j];
      let dx = bj.x - bi.x;
      let dy = bj.y - bi.y;
      let distSq = dx*dx + dy*dy;
      let dist = Math.sqrt(distSq) + 1e-12;  // small epsilon to avoid zero
      // Compute acceleration contributions: a_i = G*m_j * r / r^3
      let factor_i = G * bj.m / (distSq * dist);
      let factor_j = G * bi.m / (distSq * dist);
      bi.ax += dx * factor_i;
      bi.ay += dy * factor_i;
      bj.ax -= dx * factor_j;
      bj.ay -= dy * factor_j;
    }
  }
}

// Compute time-derivative of state: [vx, vy, ax, ay] for each body
function derivatives(bodies, state) {
  // Update bodies to given state
  setState(bodies, state);
  // Compute accelerations at this state
  computeAccelerations(bodies);
  // Build derivative vector
  const deriv = [];
  for (let b of bodies) {
    deriv.push(b.vx, b.vy, b.ax, b.ay);
  }
  return deriv;
}

// Single DOP853 integration step: returns { newBodies, error }
// - bodies: array of Body objects at current state
// - h: current time step
function DOP853Step(bodies, h, rtol=1e-6, atol=1e-9) {
  const n = bodies.length;
  const dim = 4*n;  // number of components in state vector
  
  // Dormand-Prince 8(5,3) coefficients (Butcher tableau)
  const c2 = 0.052600151958768;
  const c3 = 0.078900227938152;
  const c4 = 0.118350341907227;
  const c5 = 0.281649658092773;
  const c6 = 0.333333333333333;
  const c7 = 0.250000000000000;
  const c8 = 0.307692307692308;
  const c9 = 0.651282051282051;
  const c10 = 0.600000000000000;
  const c11 = 0.857142857142857;
  // (c14, c15, c16 are used for dense output, not needed here)
  
  // a_ij coefficients for stages 2..11
  const a21 = 0.052600151958768;
  const a31 = 0.019725056984538,  a32 = 0.059175170953614;
  const a41 = 0.029587585476807,  a43 = 0.088762756430421;
  const a51 = 0.241365134159267,  a53 = -0.884549479328286, a54 = 0.924834003261792;
  const a61 = 0.037037037037037,  a64 = 0.170828608729474, a65 = 0.125467687566822;
  const a71 = 0.037109375000000,  a74 = 0.170252211019544, a75 = 0.060216538980456, a76 = -0.017578125000000;
  const a81 = 0.037092000118505,  a84 = 0.170383925712240, a85 = 0.107262030446373, a86 = -0.015319437748624, a87 = 0.008273789163814;
  const a91 = 0.624110958716076,  a94 = -3.360892629446941, a95 = -0.868219346841726, a96 = 27.592099699446708, a97 = 20.154067550477894, a98 = -43.48988418106996;
  const a101 = 0.477662536438264, a104 = -2.488114619971667, a105 = -0.590290826836843, a106 = 21.23005144818119, a107 = 15.27923363288242, a108 = -33.28821096898486, a109 = -0.020331201708509;
  const a111 = -0.937142430085987, a114 = 5.186372428844064, a115 = 1.091437348996730, a116 = -8.149787010746926, a117 = -18.52006565999696, a118 = 22.73948709935050, a119 = 2.493605552679652, a1110 = -3.046764471898219;
  const a121 = 2.273310147516538, a124 = -10.53449546673725, a125 = -2.0008720582248626, a126 = -17.958931863118798, a127 = 27.94888452941996, a128 = -2.858998277135024, a129 = -8.87285693353063, a1210 = 12.360567175794303, a1211 = 0.6433927460157636;
  
  // b-coefficients for the 8th-order solution (maps k1..k12 to state update)
  // (Many are zero; nonzeros listed below)
  const b1 = 0.05429373411656876;
  const b6 = 4.450312892752409;
  const b7 = 1.891517899314500;
  const b8 = -5.801203960010585;
  const b9 = 0.311164366957820;
  const b10 = -0.152160949662516;
  const b11 = 0.201365400804030;
  const b12 = 0.044710615727773;
  
  // error coefficients (difference between 8th and embedded 7th solution)
  const er1 =  0.013120044994195;
  const er6 = -1.225156446376204;
  const er7 = -0.495758949657250;
  const er8 =  1.664377182454986;
  const er9 = -3.503288487499737;
  const er10=  3.341791187130175;
  const er11=  0.081923206485116;
  const er12= -0.022355307863886;
  
  // Initial state vector
  const y0 = getState(bodies);
  // Stage derivatives k1..k12
  const k1  = derivatives(copyBodies(bodies), y0);
  let y_temp = new Array(dim);
  
  // Stage 2
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * a21 * k1[i];
  }
  const k2 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 3
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a31 * k1[i] + a32 * k2[i]);
  }
  const k3 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 4
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a41 * k1[i] + a43 * k3[i]);
  }
  const k4 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 5
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a51 * k1[i] + a53 * k3[i] + a54 * k4[i]);
  }
  const k5 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 6
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a61 * k1[i] + a64 * k4[i] + a65 * k5[i]);
  }
  const k6 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 7
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a71 * k1[i] + a74 * k4[i] + a75 * k5[i] + a76 * k6[i]);
  }
  const k7 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 8
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a81 * k1[i] + a84 * k4[i] + a85 * k5[i] + a86 * k6[i] + a87 * k7[i]);
  }
  const k8 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 9
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a91 * k1[i] + a94 * k4[i] + a95 * k5[i] + a96 * k6[i] + a97 * k7[i] + a98 * k8[i]);
  }
  const k9 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 10
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a101 * k1[i] + a104 * k4[i] + a105 * k5[i] + a106 * k6[i]
                           + a107 * k7[i] + a108 * k8[i] + a109 * k9[i]);
  }
  const k10 = derivatives(copyBodies(bodies), y_temp);
  
  // Stage 11 (c11 = 0.857142857..., last intermediate stage)
  for (let i = 0; i < dim; i++) {
    y_temp[i] = y0[i] + h * (a111 * k1[i] + a114 * k4[i] + a115 * k5[i] + a116 * k6[i]
                           + a117 * k7[i] + a118 * k8[i] + a119 * k9[i] + a1110 * k10[i]);
  }
  const k11 = derivatives(copyBodies(bodies), y_temp);
  
  // Compute 8th-order solution (new state) using b-coefficients
  const newState = new Array(dim);
  for (let i = 0; i < dim; i++) {
    newState[i] = y0[i] 
      + h * (b1  * k1[i] + b6  * k6[i] + b7  * k7[i] + b8  * k8[i]
           + b9  * k9[i] + b10 * k10[i] + b11 * k2[i] + b12 * k3[i]);
  }
  // Compute derivative at final state for error estimation
  const k12 = derivatives(copyBodies(bodies), newState);
  
  // Estimate the local error using embedded formula
  // error_i = h * (er1*k1 + er6*k6 + ... + er12*k12)
  let errSum2 = 0;
  let len = dim;  // number of components
  // We compute a weighted RMS error across all state components
  for (let i = 0; i < dim; i++) {
    let err_i = h * (er1 * k1[i] + er6 * k6[i] + er7 * k7[i] + er8 * k8[i]
                   + er9 * k9[i] + er10 * k10[i] + er11 * k11[i] + er12 * k12[i]);
    // Tolerance scaling for this component (pos/vel)
    let y_abs = Math.abs(newState[i]);
    let tol = atol + rtol * y_abs;
    let ratio = err_i / tol;
    errSum2 += ratio * ratio;
  }
  let error = Math.sqrt(errSum2 / len);  // normalized RMS error
  
  // Assemble the new bodies array from newState
  const newBodies = copyBodies(bodies);
  setState(newBodies, newState);
  
  return { newBodies, error };
}

// Example integration loop with adaptive step size
function integrate(bodies, t0, tFinal, hInit, rtol=1e-6, atol=1e-9) {
  let t = t0;
  let h = hInit;
  while (t < tFinal) {
    if (t + h > tFinal) {
      h = tFinal - t; // do not overshoot final time
    }
    // Perform one DOP853 step
    const { newBodies, error } = DOP853Step(bodies, h, rtol, atol);
    // Accept or reject step based on error
    if (error <= 1.0) {
      // Accept step
      t += h;
      bodies = newBodies;
      // Adapt step size for next step (safety factor 0.9)
      const safety = 0.9;
      const p = 7;  // using 7th-order error estimate
      // scale factor: error^( -1/(p+1) )
      const scale = safety * Math.pow(error, -1/(p+1));
      // restrict scaling factor to reasonable bounds
      h = h * Math.max(0.1, Math.min(5.0, scale));
    } else {
      // Reject step, reduce h and retry
      const safety = 0.9;
      const p = 7;
      const scale = safety * Math.pow(error, -1/(p+1));
      h = h * Math.max(0.1, Math.min(5.0, scale));
      // retry with new h (do not advance time)
    }
  }
  return bodies;
}
