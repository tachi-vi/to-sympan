import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
// } from "recharts";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import ConfigDisplay from "./ConfigDisplay.jsx";
import { rk2 } from "../integrators/rk2.js";
import { vv } from "../integrators/vv.js";
import { rk4 } from "../integrators/rk4.js";
import { Body } from "../integrators/bodyClass.js";
import { rkck } from "../integrators/rkck.js";
// import { doprin } from "../integrators/imported_dopri.js";
import { dopri } from "../integrators/dopri.js"

export default function Sim({
  config,
  handleBackButton,
  theme,
  setThemeState,
}) {
  const mainCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const [startSim, setStartSim] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);
  const [metricsHistory, setMetricsHistory] = useState([]);
  let systemMetricRecord = useRef([]);
  const elapsedTime = useRef(0);

  const [configState, setConfig] = useState(config);

  const [settings, setSettings] = useState({
    scale: config.scale || 200,
    simulator: config.sim || "cash-karp",
    spf: config.spf || 300,
    dt: config.dt || 0.0001,
    trails: true,
    recentertocom: config.com_drift || false,
  });

  function handleStopButton() {
    elapsedTime.current = 0;
    setStartSim(false);
  }

  //(optional) make it pannable?

  //time analysis in days etc with irl days

  //sexy ui (both mobile and desktop)

  //astronomical units scale
  //fix for 3 orbits

  //(optinal) (changing speed inbetween runs, changing scale inside runs, changing color scheme inside runs)

  //consider it done afet finishding non optinal and making tht home page with lots of configsv

  useEffect(() => {
    if (!startSim) return;
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

    if (theme === "light") {
      bgCanvas.style.background = "#ffffff";
    } else {
      bgCanvas.style.background = "#000000";
    }
    mainCanvas.style.background = "transparent";

   const darkSchemes = [
  // Neon mix
  ["#FF3CAC", "#784BA0", "#2B86C5", "#00FFC5", "#FFD93D", "#FF6F91", "#845EC2", "#FF9671", "#4E8397", "#FFC75F"],

  // Cyber glow
  ["#08F7FE", "#09FBD3", "#FE53BB", "#F5D300", "#00FF41", "#FF7300", "#F53844", "#3A86FF", "#FFBE0B", "#8338EC"],

  // Space tones
  ["#FF6B6B", "#FFE66D", "#4ECDC4", "#1A535C", "#F7FFF7", "#C0FDFB", "#5D737E", "#64B6AC", "#F25F5C", "#FFE066"],

  // Electric contrast
  ["#00EAD3", "#FFF5B7", "#FF449F", "#005F99", "#E40066", "#F7F052", "#00A8E8", "#FFB5A7", "#FFD6A5", "#9B5DE5"],

  // Pastel neon
  ["#C3F0CA", "#A9DEF9", "#E4C1F9", "#FCF6BD", "#FF99C8", "#B8E1FF", "#BFD200", "#E36414", "#F9844A", "#FFB5A7"]
];


const lightSchemes = [
  // Gentle tones
  ["#0077B6", "#FF6B6B", "#6A4C93", "#4CC9F0", "#F72585", "#4361EE", "#F8961E", "#43AA8B", "#90BE6D", "#577590"],

  // Soft pastel
  ["#FFB5A7", "#FCD5CE",  "#F9DCC4", "#FEC89A", "#A0C4FF", "#BDB2FF", "#FFC6FF", "#9BF6FF", "#FDFFB6"],

  // Elegant neutrals
  ["#1E6091", "#168AAD", "#34A0A4", "#52B69A", "#76C893", "#99D98C", "#B5E48C", "#D9ED92", "#FFADAD", "#FFD6A5"],

  // Nature inspired
  ["#606C38", "#283618",  "#DDA15E", "#BC6C25", "#8D99AE", "#EF233C", "#FFBF69", "#6D597A", "#B56576"],

  // Bright but flat
  ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#F15BB5", "#00BBF9", "#00F5D4", "#9B5DE5", "#FF5400"]
];

 const activeScheme = (theme === "dark" ? darkSchemes : lightSchemes)[
  Math.floor(Math.random() * (theme === "dark" ? darkSchemes.length : lightSchemes.length))
];

let bodies = configState.bodies.map((b, idx) => {
  const color = activeScheme[idx % activeScheme.length]; // pick color by index
  return new Body(b.x, b.y, b.vx, b.vy, b.m, b.name || null, color);
});

    let dt = settings.dt;
    let stepsPerFrame = settings.spf;
    let animationId;
    let frameCounter = 0;

    function computeSystemMetrics(bodies) {
      let totalPx = 0;
      let totalPy = 0;
      let totalL = 0;
      let totalK = 0;
      let totalU = 0;

      const n = bodies.length;

   
      for (let body of bodies) {
        totalPx += body.m * body.vx;
        totalPy += body.m * body.vy;
        totalK += 0.5 * body.m * (body.vx ** 2 + body.vy ** 2);
      }

      for (let i = 0; i < n; i++) {
        const b1 = bodies[i];
        totalL += b1.x * b1.m * b1.vy - b1.y * b1.m * b1.vx; 
        for (let j = i + 1; j < n; j++) {
          const b2 = bodies[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const r = Math.sqrt(dx * dx + dy * dy) + 1e-8;
          totalU += (-1 * b1.m * b2.m) / r; 
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

    function recenterToCOM(bodies) {
      let totalMass = 0;
      let xCOM = 0;
      let yCOM = 0;

      for (let b of bodies) {
        totalMass += b.m;
        xCOM += b.m * b.x;
        yCOM += b.m * b.y;
      }
      xCOM /= totalMass;
      yCOM /= totalMass;

      for (let b of bodies) {
        b.x -= xCOM;
        b.y -= yCOM;
      }
    }

    function shiftToOrigin(bodies){
      
    }
    const RunSim = () => {
      animationId = requestAnimationFrame(RunSim);
      mainCanvasContext.clearRect(0, 0, window_width, window_height);
      const time = 0;

      for (let j = 0; j < stepsPerFrame; j++) {
        if (settings.simulator === "rk2") {
          rk2(1, bodies, dt);
        } else if (settings.simulator === "rk4") {
          rk4(1, bodies, dt);
        } else if (settings.simulator === "vv") {
          vv(1, bodies, dt);
        } else if (settings.simulator === "cash-karp") {
          rkck(1, bodies, dt);
        } 
        else if (settings.simulator === "dopri") {
          dopri(1, bodies, dt);}
        
        if (settings.recentertocom){recenterToCOM(bodies);}
      }

      const metrics = computeSystemMetrics(bodies);
      elapsedTime.current += dt * stepsPerFrame;

      frameCounter++;
      // Only push every 10 frames
      if (frameCounter % 40 === 0) {
        systemMetricRecord.current.push({
          time: +elapsedTime.current.toFixed(2),
          energy: metrics.totalEnergy,
          momentum: metrics.momentum,
          angularMomentum: metrics.angularMomentum,
          potentialEnergy: metrics.potentialEnergy,
          kineticEnergy: metrics.kineticEnergy,
        });


        // if (systemMetricRecord.current.length > 50)
        //   systemMetricRecord.current.shift();

        // setMetricsHistory([...systemMetricRecord.current]);
      }

      for (let [index, body] of bodies.entries()) {
        if (settings.trails) {
          body.drawSmallCircle(settings.scale, bgCanvasContext);
        }
        body.drawCircle(settings.scale, mainCanvasContext);
        body.drawText(
          theme,
          settings.scale,
          mainCanvasContext,
          body.name || `Body ${index + 1}`
        );
      }
    };

    RunSim();

    return () => cancelAnimationFrame(animationId);
  }, [startSim]);

  // const infoBodyList = (() => {
  //   if (!config || !Array.isArray(config.bodies)) return [];
  //   const colorScheme = [
  //     { body1: "red", body2: "green", body3: "blue" },
  //     { body1: "#00FFC5", body2: "#FF3CAC", body3: "#845EC2" },
  //     { body1: "#FFB86F", body2: "#8BE9FD", body3: "#BD93F9" },
  //   ];
  //   const i = 1;
  //   return config.bodies.map((b, idx) => {
  //     const colorKeys = Object.keys(colorScheme[i]);
  //     const color = colorScheme[i][colorKeys[idx % colorKeys.length]];
  //     return { name: b.name || null, m: b.m, color };
  //   });
  // })();

  return (
    <>
      {startSim ? (
        <div className="simCont">
          {/* <div
            style={{
              position: "absolute",
              zIndex: 20,
              top: 50,
              left: 40,
              background: "transparent",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <LineChart width={300} height={400} data={metricsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="kineticEnergy"
                stroke="#FFD700"
                dot={false}
                name="K (Kinetic Energy)"
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#00FF88"
                dot={false}
                name="E (Total Energy)"
              />
              <Line type="monotone" dataKey="momentum.px" stroke="#FF3CAC" dot={false} name="Momentum Px" />
    <Line type="monotone" dataKey="momentum.py" stroke="#3CAFFF" dot={false} name="Momentum Py" />
    <Line type="monotone" dataKey="angularMomentum" stroke="#845EC2" dot={false} />
              <Line
                type="monotone"
                dataKey="potentialEnergy"
                stroke="#00BFFF"
                dot={false}
                name="U (Potential Energy)"
              />
            </LineChart>
          </div> */}
          <button className="config-page-button" onClick={handleStopButton}>
            <MdOutlineSettingsInputComposite />
          </button>
{/*           
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 30,
              background:
                theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",
              color: theme === "light" ? "#000" : "#fff",
              padding: "8px 10px",
              
              display: "flex",
              gap: 12,
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            {infoBodyList.map((b, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minWidth: 100,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: b.color,
                    
                  }}
                />
                <div style={{ fontSize: 12 }}>
                  <div style={{ fontWeight: 500 }}>
                    {b.name || `Body ${idx + 1}`}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.85 }}>
                    m: {Number(b.m).toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          {/* <button className="button3">Time: {elapsedTime.toFixed(1)}</button> */}
          <div className="canvas">
            <canvas ref={bgCanvasRef} className="bg-canvas"></canvas>
            <canvas ref={mainCanvasRef} className="main-canvas"></canvas>
          </div>
        </div>
      ) : (
        <>
          <div className="info_page">
            <button onClick={handleBackButton} className="back_button">
              <IoArrowBackOutline size={20} />
            </button>
            <h1>{config.name}</h1>
            <p>ID: {config.id}</p>
            <ConfigDisplay config={configState} onConfigChange={setConfig} />
            {theme == "light" ? (
              <button className="themeButton" onClick={setThemeState}>
                <MdOutlineDarkMode color="black" size={30} />
              </button>
            ) : (
              <button className="themeButton" onClick={setThemeState}>
                <MdOutlineDarkMode color="white" size={30} />
              </button>
            )}
            <h1 className="heading">Select Settings</h1>
            <Form settings={settings} setSettings={setSettings} theme={theme}/>
            <button class="run-config-button" onClick={() => setStartSim(true)}>
              Run Config
            </button>
          </div>
        </>
      )}
    </>
  );
}
