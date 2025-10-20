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
import Sim from "./components/Sim.jsx";
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
          <h1>The N-Body Problem</h1>
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
            The N-body problem deals with predicting the motion of several
            objects that interact through gravity. While the two-body problem
            can be solved exactly with known mathematical formulas, adding even
            one more body makes the system far more complex. For three or more
            bodies, there is no general closed-form solution — no single
            equation where you can plug in the initial positions, velocities,
            and masses to find the exact future positions. Instead, numerical
            methods are used to calculate the motion step by step over time.
            These systems are often chaotic, meaning they are extremely
            sensitive to their starting conditions. A very small difference in
            an initial velocity or position can lead to a completely different
            outcome later. In a non-chaotic system, a small error usually stays
            small, but in an N-body system, even a tiny rounding or calculation
            error can grow rapidly.
          </p>
          <p>
            Because of this, all numerical methods are approximations. Reducing
            the time step or increasing precision can improve the results, but
            no method can produce a perfectly exact prediction. The real motion
            of the bodies — what would happen in nature — is the true solution,
            even though it cannot be written as a simple formula. The three-body
            problem is the first case where this behavior appears. It shows how
            quickly a system can move from predictable and stable to chaotic and
            unpredictable once more bodies are involved.
          </p>
          <h1>Project Introduction</h1>
          <p>
            This project focuses on simulating periodic solutions in the N-body
            problem — cases where, despite the general chaotic nature of the
            system, the bodies follow repeating paths over time. The objective
            of this project is to identify and analyze these periodic solutions
            while testing how different numerical methods perform when
            simulating them. Since the N-body problem does not have a
            closed-form solution for most cases, numerical integration methods
            are required to compute motion over time. By comparing approaches
            such as Runge–Kutta methods and Velocity Verlet, the project
            evaluates how accurately each method preserves periodicity and
            energy over extended simulations. Different configurations may
            require different numerical techniques. Some methods remain stable
            and maintain the periodic motion, while others accumulate numerical
            errors that alter the system’s behavior. Through this comparison,
            the project aims to determine which numerical methods are most
            suitable for maintaining periodicity across a range of three (as
            well as N)-body configurations.
          </p>

          <h1>3 Body Configurations</h1>

          <section>
            <h2 className="centeredText">Eulers Orbits</h2>
            <p>Euler</p>
            <ul className="grid">
              {/* {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>

          <section>
            <h2 className="centeredText">Lagrenges Orbits</h2>
            <p>Lagrenge</p>
            <ul className="grid">
              {/* {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))} */}
            </ul>
          </section>

          <section>
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
          </section>

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
            <p>These configurations were discovered by Bourcke in 1985.</p>
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
            <h2 className="centeredText">Free Fall Orbits</h2>
            <p>Free Fall Orbits Discovered by China</p>
            <ul className="grid">
              {freeFallConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(freeFallConfigs, config.id)}>{config.name}</button></li>
            ))}
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
