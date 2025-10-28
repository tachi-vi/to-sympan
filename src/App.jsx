import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import configs from "./components/configs.js";
import sheensConfigs from "./configs/sheen.js";
import brouckeConfigs from "./configs/broucke.js";
import henonConfigs from "./configs/henon.js";
// import {butterflyI} from "./configs/serbia.js";
import freeFallConfigs from "./configs/freeFall.js";
import eulerConfigs from "./configs/euler.js";
import lagrange from "./configs/lagrange.js";
import Sim from "./components/Sim.jsx";
import NEWORBITS from "./configs/NEWORBITS.js";
import { MdOutlineDarkMode, MdWidthNormal } from "react-icons/md";

function App() {
  const [selectedSim, setSelectedSim] = useState(null);
  const [theme, setTheme] = useState("light");
  const scrollPos = useRef(0);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (selectedSim === null) {
      window.scrollTo(0, scrollPos.current);
    }
  }, [selectedSim]);

  function handleSimClick(configCat, id) {
    const sim = configCat.find((config) => config.id === id);
    scrollPos.current = window.pageYOffset;
    setSelectedSim(sim);

    window.scrollTo(0, 0);
  }

  function handleBackButtonStateChange() {
    setSelectedSim(null);
  }

  function setThemeState() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  if (selectedSim === null) {
    return (
      <>
        <div className="mainCont">
          <h1
            className="centeredText"
            style={{
              fontSize: "1.7rem",
              marginTop: "0px",
              marginBottom: "0px",
              paddingTop: "0px",
              textAlign: "center",
              fontStyle: "normal",
            }}
          >
            To Sýmpan
          </h1>
          <p className="centeredText" style={{ fontSize: "1rem" }}>
            'To Sympan' is my attempt at understanding the universe.
          </p>
          <h1>The 3-Body Problem</h1>
          {theme == "light" ? (
            <button className="themeButton" onClick={() => setTheme("dark")}>
              <MdOutlineDarkMode color="black" size={30} />
            </button>
          ) : (
            <button className="themeButton" onClick={() => setTheme("light")}>
              <MdOutlineDarkMode color="white" size={30} />
            </button>
          )}
          <p>
            The three-body problem involves predicting the motion of three
            objects that interact through gravity. Unlike the two-body problem —
            which can be solved exactly using known mathematical formulas — the
            three-body problem cannot be expressed through a single, closed-form
            solution. Even a small change in the initial positions or velocities
            can lead to drastically different outcomes, making the system highly
            sensitive and often chaotic. To study such motion, numerical methods
            are required to approximate the trajectories step by step over time.
          </p>

          <p>
            Since these methods are approximations, their accuracy depends on
            factors such as time step size and numerical precision. Reducing the
            time step can improve accuracy, but no method can perfectly
            reproduce the exact motion that would occur in nature. The
            three-body problem therefore serves as a classic example of how
            deterministic systems can still display unpredictable, chaotic
            behavior due to small computational or initial-condition errors.
          </p>
          <h1>Project Introduction</h1>
          <p>
            This project focuses on simulating periodic orbits in the three-body
            problem — rare configurations where, despite the system’s general
            tendency toward chaos, the three bodies follow repeating paths over
            time. The goal is to identify and analyze these periodic solutions
            while testing how different numerical integration methods perform in
            preserving their motion. Methods such as Runge–Kutta and Velocity
            Verlet are compared based on their ability to maintain energy
            stability and periodicity over extended simulations.
          </p>
          <p>
            The orbits presented here were chosen for two main reasons: (i) some
            hold historical significance as among the first periodic orbits ever
            discovered, and (ii) others exhibit visually interesting and elegant
            trajectories while remaining sufficiently stable for a complete
            period without becoming chaotic. Although many more periodic
            solutions exist, certain configurations proved too sensitive for my
            current integrators, becoming unstable or chaotic before completing
            a full period.
          </p>
          <h1>3 Body Configurations</h1>
          <section>
            <h2 className="centeredText">
              Euler’s Collinear Three-Body Solutions (1765)
            </h2>
            <p>
              The Euler collinear three-body solutions, discovered by Leonhard
              Euler in 1765, are the first exact and periodic solutions to the
              three-body problem. In these configurations, all three bodies
              remain perfectly aligned on a straight line while rotating around
              the system’s center of mass, with gravitational and centrifugal
              forces exactly balanced. They are considered "exact" because they
              satisfy Newton’s laws analytically: the positions and velocities
              can be expressed in closed-form equations that repeat perfectly
              over time, without requiring numerical approximation.{" "}
            </p>
            <ul className="grid">
               {NEWORBITS.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(NEWORBITS, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {eulerConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(eulerConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Lagrenge's Solution (1772)</h2>
            <p>Lagrenge</p>
            <ul className="grid">
              {lagrange
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(lagrange, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section>
          {/* <section>
            <h2 className="centeredText">Popular 3-Body Configurations</h2>
            <p>These are the most popuar and old discovered configurations.</p>
            <ul className="grid">
              {configs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(configs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section> */}
          <section>
            <h2 className="centeredText">Sheen's Orbits </h2>
            <p>
              These configurations were discovered by Matthew Sheen in 2016.{" "}
            </p>
            <ul className="grid">
              {sheensConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(sheensConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Broucke's Orbits</h2>
            <p>These configurations were discovered by Bourcke in 1975.</p>
            <ul className="grid">
              {brouckeConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(brouckeConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Henon's Orbits</h2>
            <p>
              M. Henon, Families of periodic orbits in the three-body problem,
              Celest. Mech. 10, 375 (1974).
            </p>
            <ul className="grid">
              {henonConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(henonConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="centeredText">Chenciner and Montgomery (1993)</h2>
            <p>Popular Figure 8 Solution</p>
            <ul className="grid">
              {freeFallConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(freeFallConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
           <section>
            <h2 className="centeredText">Carles Simo, Chenciner, Féjoz, Montgomery (2001-2004)</h2>
            <p>Proved stability and figure 8 and gave rotating variatns</p>
            <ul className="grid">
              {freeFallConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(freeFallConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Universiy of Serbia</h2>
            <p>
              Orbits of Various Sequences Discovered by University of Serbia in
              2012
            </p>
            <ul className="grid">
              {/* {butterflyI
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(butterflyI, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Lee and Lao (2015,2017,2018,2019)</h2>
            <p>Free Fall Orbits Discovered by China</p>
            <ul className="grid">
              {freeFallConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(freeFallConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">
              Hristov (2022)
            </h2>
            <p>Rediscovered moores figure 8 + more</p>
            <ul className="grid">
              {/* {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">
              Circular Restricted Three-Body Problem (CR3BP)
            </h2>
            <p>Pertubation Theory</p>
            <ul className="grid">
              {/* {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">
              Elliptic Restricted Three-Body Problem (ER3BP):
            </h2>
            <p>Pertubation Theory</p>
            <ul className="grid">
              {/* {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>
          <h1>N Body Configrations</h1>
          <section>
            <ul className="grid">
              {configs
                .filter(
                  (c) => !(Array.isArray(c.bodies) && c.bodies.length === 3)
                )
                .map((config) => (
                  <li key={config.id}>
                    <button
                      className={theme == "light" ? "lghtBtn" : "drkBtn"}
                      onClick={() => handleSimClick(config.id)}
                    >
                      {config.name}
                    </button>
                  </li>
                ))}
            </ul>
          </section>
          <hr />
        </div>
      </>
    );
  } else {
    return (
      <Sim
        config={selectedSim}
        handleBackButton={handleBackButtonStateChange}
        theme={theme}
        setThemeState={setThemeState}
      />
    );
  }
}

export default App;
