import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import sheensConfigs from "./configs/sheen.js";
import brouckeConfigs from "./configs/broucke.js";
import henonConfigs from "./configs/henon.js";
import restrictedNBody from "./configs/restrictedNBody.js"
import trisolar from "./configs/trisolar.js"
import {
  I_butterfly,
  II_dragonfly,
  III_yinYang,
  IVa_moth,
  IVb_butterfly,
  IVc_moth,
  V_figure8,
  VI_yarn,
  VIIa_moth,
  VIIb_moth,
  VIII_other,
} from "./configs/serbia.js";
import freeFallConfigs from "./configs/freefall.js";
import eulerConfigs from "./configs/euler.js";
import figure8 from "./configs/originalFigure8.js";
import tachis from "./configs/mine.js"
import afterfigure8 from "./configs/figure8new.js";
import lagrange from "./configs/lagrange.js";
import Sim from "./components/Sim.jsx";

import circularResticred from "./configs/cr3bp.js";
import { MdOutlineDarkMode, MdWidthNormal } from "react-icons/md";
import SimoNBody from "./configs/simoNBody.js"

function App() {
  const [selectedSim, setSelectedSim] = useState(null);
  const [theme, setTheme] = useState("dark");
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
            className="centered"
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
              over time, without requiring numerical approximation. The E2 orbit
              is very unstable and I i was only able to simulate on period for
              it. Included for sake for accuracy, I could not find a set of
              paraemters for Eulers third orbit.
            </p>
            <div className="grid">
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
            </div>
          </section>
          <section>
            <h2 className="centeredText">Lagrenge's Solution (1772)</h2>
            <p>
              Lagrange’s solution to the three-body problem describes an
              equilateral triangular configuration in which all three bodies
              maintain constant relative distances while rotating around their
              common center of mass. What’s special about this solution is that,
              in its general form, the entire system can possess a net linear
              momentum, causing it to drift through space while repeating its
              motion periodically. I’ve added an option to account for this by
              removing the center-of-mass drift, keeping the system stationary
              in the simulation frame.
            </p>
            <ul className="grid">
              {lagrange.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(lagrange, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
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
            <h2 className="centeredText">Broucke's Orbits</h2>
            <p>These configurations were discovered by Bourcke in 1975. They are all very mesmerizing to look at and also very stable. I realise the ammont of configs may seem overwhlming dor you to check out, so ive highlited the ones that are personal favourites of mine. <a href="https://link.springer.com/article/10.1007/BF01228732">Original Paper Link</a></p>
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
            <h2 className="centeredText">Chris Moore's Figure Eight (1993)</h2>
            <p>
              The figure-eight orbit shattered the long-standing idea that
              simple periodic orbits in the three-body problem were impossible
              beyond a few special cases (like Lagrange’s equilateral triangle
              solutions). In 1999, Alain Chenciner and Richard Montgomery
              published a formal proof of existence: “A remarkable periodic
              solution of the three-body problem in the case of equal masses”
              (Annals of Mathematics, 2000). They verified it as a
              mathematically exact periodic solution of the Newtonian equations,
              not just a numerical curiosity. Due to its stability, its very less prone to errors and periodic for a long time even with my most primitve integrator.
            </p>
            <ul className="grid">
              {figure8.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(figure8, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {/* <section>
            <h2 className="centeredText">
              Carles Simo, Chenciner, Féjoz, Montgomery (2001-2004)
            </h2>
            <p>Proved stability and figure 8 and gave rotating variatns</p>
            <ul className="grid">
              {afterfigure8.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(afterfigure8, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
         */}
          <section>
            <h2 className="centeredText">Universiy of Serbia</h2>
            <p>
              Orbits of Various Sequences Discovered by University of Serbia in
              2012. These are some very complicated and intricate patterns. There were  a lot of orbits discovered, I had to filter out those that could be appropriately simulated for atleast two periods using my most advanced integrator. The full sequence of orbits can be found at:
            </p>
            <ul className="grid">
              {I_butterfly.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(I_butterfly, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {II_dragonfly.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(II_dragonfly, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {III_yinYang.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(III_yinYang, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {IVa_moth.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(IVa_moth, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}  {IVb_butterfly.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(IVb_butterfly, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}{IVc_moth.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(IVc_moth, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {V_figure8.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(V_figure8, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {VI_yarn.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(VI_yarn, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {VIIa_moth.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(VIIa_moth, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {VIIb_moth.map((config) => (config.show==true &&
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(VIIb_moth, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
              {/* {VIII_other.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(VIII_other, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))} */}
            </ul>
          </section>
          {/* <section>
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
          {/* <section>
            <h2 className="centeredText">Hristov (2022)</h2>
            <p>Rediscovered moores figure 8 + more</p>
            <ul className="grid">
              {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section> */}
          {/* <section>
            <h2 className="centeredText">
              Circular Restricted Three-Body Problem (CR3BP)
            </h2>
            <p>Pertubation Theory</p>
            <ul className="grid">
              {circularResticred.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(circularResticred, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section> */}
          {/* <section>
            <h2 className="centeredText">
              Elliptic Restricted Three-Body Problem (ER3BP):
            </h2>
            <p>Pertubation Theory</p>
            <ul className="grid">
              {brouckeConfigs
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(brouckeConfigs, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section> */}
          <section>
            <h2 className="centeredText">Tachi's solutions :p (2025)</h2>
            <p>
              Random configs i found while messing around, didnt research or
              dwelved too deep into it hehe. I have too many nobels crowding my
              desk already
            </p>
            <ul className="grid">
              {tachis
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(tachis, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Beyond these...</h2>
            <p>I am limited by my own capabilities</p>
          </section>
          <h1>N Body Configurations</h1>
          <p>I built a N-body simulator, didnt I?</p>
          {/* <section>
            <h2 className="centeredText">N-Body Problem (Simo's Periods):</h2>
            <p>Guy named simo discovered a few solutions to the n body problem in early 2000s</p>
            <ul className="grid">
              {SimoNBody
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(SimoNBody, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section> */}
          <section>
            <h2 className="centeredText">3 Body With some Planets</h2>
            <p>Potenital Unstable and Stable Configs for the Trisolar ssytem from the 3 body problem novels/show. I took some 3 body orbits and added some planets orbitting the stars for fun</p>
            <ul className="grid">
              {trisolar
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(trisolar, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">
              Restricted N-Body Problem (IRL Systems):
            </h2>
            <p>These include solar ssytem that i moddled aswellas the alpha centuri systemc</p>
            <ul className="grid">
              {restrictedNBody
            .map(config => (
              <li key={config.id}><button className={theme=="light"?"lghtBtn":"drkBtn" } onClick={()=>handleSimClick(restrictedNBody, config.id)}>{config.name}</button></li>
            ))}
            </ul>
          </section>
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
