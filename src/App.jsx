import { useState, useEffect, useRef } from "react";

import "./App.css";

import sheensConfigs from "./configs/sheen.js";
import brouckeConfigs from "./configs/broucke.js";
import henonConfigs from "./configs/henon.js";
import restrictedNBody from "./configs/restrictedNBody.js";
import trisolar from "./configs/trisolar.js";
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
import tachis from "./configs/mine.js";
import afterfigure8 from "./configs/figure8new.js";
import lagrange from "./configs/lagrange.js";
import Sim from "./components/Sim.jsx";

import circularResticred from "./configs/cr3bp.js";
import { MdOutlineDarkMode, MdWidthNormal } from "react-icons/md";
import SimoNBody from "./configs/simoNBody.js";

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
            solution.
          </p>
          <p>
            {" "}
            Because of this lack of an exact analytical solution, researchers
            have to rely on numerical integration techniques to explore and
            identify periodic orbits in three-body systems.{" "}
          </p>
          <h1>Project Introduction</h1>
          <p>
            I built To Sýmpan as an experiment — originally just to create a
            basic N-body simulator in JavaScript. After testing a few well-known
            configurations, I was surprised by how stable many of them were.
            That pushed me deeper into the history of the three-body problem and
            the methods used to find and simulate these periodic orbits.
          </p>
          <p>
            I explored a large number of orbits. If you check the source code
            folder, you’ll find many more configurations than the ones shown
            here. The main factor in deciding what to include was whether the
            orbit worked well with my most accurate integrator and remained
            periodic for at least a few cycles. Still, I included some
            historically important orbits even if I couldn’t simulate them for a
            full period.
          </p>
          <h1>3 Body Configurations</h1>
          <section>
            <h2 className="centeredText">Euler’s Collinear Solutions (1765)</h2>
            <p>
              Euler’s collinear three-body solutions, discovered in 1765, were
              the first exact periodic solutions to the three-body problem. They
              are considered exact because they satisfy Newton’s laws
              analytically: the positions and velocities can be written in
              closed-form expressions that repeat perfectly without numerical
              approximation.
            </p>{" "}
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
          {/* <section>
            <h2 className="centeredText">
              Lagrange’s Equilateral Solution (1772)
            </h2>
            <p>
              Lagrange’s solution to the three-body problem describes an
              equilateral triangular configuration in which all three bodies
              maintain constant relative distances while rotating around their
              common center of mass. What’s special about this solution is that,
              in its general form, the entire system can possess a net linear
              momentum, causing it to drift through space while repeating its
              motion periodically.{" "}
            </p>{" "}
            <p>
              I’ve added an option to remove this center-of-mass drift so the
              system remains stationary in the simulation.
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
          </section> */}
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
            <h2 className="centeredText">Broucke's Orbits (1975)</h2>
            <p>
              In 1975, Roger Broucke discovered a wide family of periodic orbits
              in the three-body problem. Many of these are both visually
              striking and surprisingly stable. I’ve highlighted the ones I find
              most beautiful. The original research paper can be found{" "}
              <a href="https://link.springer.com/article/10.1007/BF01228732">
                here
              </a>
              .
            </p>
            <ul className="grid">
              {brouckeConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={`${theme === "light" ? "lghtBtn" : "drkBtn"} ${
                      config.fav ? "highlight" : ""
                    }`}
                    onClick={() => handleSimClick(brouckeConfigs, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Henon's Orbits (1974)</h2>
            <p>
              Discovered by Michel Hénon in 1974, these orbits are also visually
              appealing and often very stable. Some exhibit net rotation,
              meaning the entire curve slowly rotates while the system completes
              each period. Very cool! I’ve highlighted my favorites, and the
              original paper can be found{" "}
              <a href="https://adsabs.harvard.edu/full/1974CeMec..10..375H">
                here
              </a>
              .
            </p>
            <ul className="grid">
              {henonConfigs.map((config) => (
                <li key={config.id}>
                  <button
                    className={`${theme === "light" ? "lghtBtn" : "drkBtn"} ${
                      config.fav ? "highlight" : ""
                    }`}
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
              The figure-eight orbit overturned the assumption that simple
              periodic three-body orbits were extremely rare. It is perhaps the
              most famous periodic orbit discovered so far. Its stability makes
              it resistant to numerical errors, allowing it to remain periodic
              even with basic integrators.
            </p>
            <ul className="grid">
              {figure8.map((config) => (
                <li key={config.id}>
                  <button
                    className={`${theme === "light" ? "lghtBtn" : "drkBtn"} ${
                      config.fav ? "highlight" : ""
                    }`}
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
            <h2 className="centeredText">Milovan Šuvakov (2013)</h2>
            <p>
              The next major discovery came from Milovan Šuvakov and V.
              Dmitrašinović in 2013. They went ahead and discovered a whole
              bunch of different sequences, which are so complex that you wonder
              how they are periodic in the first place. Unfortunately, due to
              their complexity, I could only include the most primitive variant
              for most of their sequences. Original paper is{" "}
              <a href="https://arxiv.org/abs/1303.0181">here.</a>
            </p>
            <ul className="grid">
              {I_butterfly.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={`${
                          theme === "light" ? "lghtBtn" : "drkBtn"
                        } ${config.fav ? "highlight" : ""}`}
                        onClick={() => handleSimClick(I_butterfly, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {II_dragonfly.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(II_dragonfly, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {III_yinYang.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(III_yinYang, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {IVa_moth.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(IVa_moth, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}{" "}
              {IVb_butterfly.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(IVb_butterfly, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {IVc_moth.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(IVc_moth, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {V_figure8.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(V_figure8, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {VI_yarn.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(VI_yarn, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {VIIa_moth.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(VIIa_moth, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
              {VIIb_moth.map(
                (config) =>
                  config.show == true && (
                    <li key={config.id}>
                      <button
                        className={theme == "light" ? "lghtBtn" : "drkBtn"}
                        onClick={() => handleSimClick(VIIb_moth, config.id)}
                      >
                        {config.name}
                      </button>
                    </li>
                  )
              )}
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
            <h2 className="centeredText">Sheen's Orbits (2016)</h2>
            <p>
              Matthew Sheen discovered another family of periodic orbits in
              2016. Only two of them remain stable for at least a few periods;
              the others decay quickly. Still, I’ve included all of them for
              completeness.
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
            <h2 className="centeredText">Tachi's Configurations :p (2025)</h2>
            <p>
              Just some fun configurations I stumbled upon while experimenting.
              They’re not physically realistic because their interesting
              behavior relies on collisions and other unrealistic interactions…
              but they look cool :p
            </p>
            <ul className="grid">
              {tachis.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(tachis, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">TriSolar!</h2>
            <p>
              The previously mentioned three-body orbits with some added
              planets, to see the chaos the Trisolarans suffered through :'(
            </p>
            <ul className="grid">
              {trisolar.map((config) => (
                <li key={config.id}>
                  <button
                    className={theme == "light" ? "lghtBtn" : "drkBtn"}
                    onClick={() => handleSimClick(trisolar, config.id)}
                  >
                    {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="centeredText">Future Plans</h2>
            <p>
              Improve integrator (this part is mostly figuring out how to
              implement Dormand Prince and refine some errors in Cash-Karp's
              current implementaion) and explore more configurations!
            </p>
          </section>
          <h1>N Body Configurations</h1>
          <p>
            The main purpose of building this project was to create an N-body
            simulator; the three-body configurations are just a tangent I went
            too deep into. So, in the spirit of the original goal, here are some
            N-body simulations!
          </p>
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

          <ul className="grid">
            {restrictedNBody.map((config) => (
              <li key={config.id}>
                <button
                  className={theme == "light" ? "lghtBtn" : "drkBtn"}
                  onClick={() => handleSimClick(restrictedNBody, config.id)}
                >
                  {config.name}
                </button>
              </li>
            ))}
          </ul>
             <footer>
          <p>© 2025 tachi-vi. All rights reserved. (I have no idea what this sentence means) </p>
          <p>
            <a href="https://github.com/tachi-vi" target="_blank">
              GitHub
            </a>{" "}
            
          </p>
        </footer>
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
