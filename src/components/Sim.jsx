import React, { useState, useRef, useEffect } from "react";

export default function Sim({ config, handleBackButton }) {
  const mainCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [startSim, setStartSim] = useState(false);

  const settings = {scale: config.scale || 50, simulator: 'rk2', spf: 1500, dt: 0.00001, trails: true}



// // bar graph on top left showing energy, momentum, angular momentum, potential energy, kinetic energy (something to note error)
  // if  (nosarttsim)
  //   show form for settings, run sim button to set start sim (setStartSim(true))
//(optional) make it pannable?
//time analysis in days etc with irl days
//sexy ui
//light theme
//astronomical units scale
//fix for figure 8 orbits
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

    bgCanvas.style.background = "#000000";
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
        context.fillStyle = "white";
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

    const RunSim = () => {
      animationId = requestAnimationFrame(RunSim);
      mainCanvasContext.clearRect(0, 0, window_width, window_height);

      for (let j = 0; j < stepsPerFrame; j++) {
          if (settings.simulator === "rk2") {
        rk2(bodies, dt);
      } else if (settings.simulator === "rk4") {
        rk4(bodies, dt);
      } else if (settings.simulator === "vv") {
        vv(bodies, dt);
      }

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

 return (
  <>
    {startSim ? (
      <div className='simCont'>
        <button onClick={handleBackButton} className="button">
          Home
        </button>
        <button className="button2" onClick={()=>setStartSim(false)}>stop</button>
        <div className="canvas">
          <canvas ref={bgCanvasRef} className="bg-canvas"></canvas>
          <canvas ref={mainCanvasRef} className="main-canvas"></canvas>
        </div>
      </div>
    ) : (<>
      <h1>{config.name}</h1>
      <h1>Select Settings</h1>
      <p>form here</p>
      <button onClick={()=>setStartSim(true)}>Run Config</button></>
    )}
  </>
)
}