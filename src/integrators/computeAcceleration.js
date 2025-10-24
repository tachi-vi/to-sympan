export function ComputeAcceleration(g, i, bodies) {
      let ax = 0;
      let ay = 0;
      for (let j = 0; j < bodies.length; j++) {
        if (j == i) continue;
        let deltax = bodies[j].x - bodies[i].x;
        let deltay = bodies[j].y - bodies[i].y;
        const distSq = deltax * deltax + deltay * deltay;
        const distCubed = Math.pow(distSq, 1.5) + 1e-8; 
        const force = (g * bodies[j].m) / distCubed;
        ax += deltax * force;
        ay += deltay * force;
      }
      bodies[i].ax = ax;
      bodies[i].ay = ay;
    }