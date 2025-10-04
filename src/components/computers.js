export function ComputeAcceleration(i, bodies){
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


export function rk2(bodies, dt) {
  
    
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

export function rk4(bodies, dt) {
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

export function vv(bodies, dt) {
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