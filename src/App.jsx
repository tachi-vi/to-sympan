import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import configs from './components/configs.js';
import Sim from './components/Sim.jsx';


function App() {
  const [selectedSim, setSelectedSim] = useState(null);

  function handleSimClick(id) {
    const sim = configs.find((config) => config.id === id);
    setSelectedSim(sim);
  }

  function handleBackButtonStateChange() {
    setSelectedSim(null);
  }

  if (selectedSim === null) {
  return (
    <>
    <div className='mainCont'>
      <div>
        <h1>To Sýmpan</h1>
      </div>
      <p>
        'To Sympan' is my attempt at understanding the universe. 
      </p>
      <h1>The N-Body Problem</h1>
      <p>The N-body problem deals with predicting the motion of several objects that interact through gravity. While the two-body problem can be solved exactly with known mathematical formulas, adding even one more body makes the system far more complex.
For three or more bodies, there is no general closed-form solution — no single equation where you can plug in the initial positions, velocities, and masses to find the exact future positions. Instead, numerical methods are used to calculate the motion step by step over time.
These systems are often chaotic, meaning they are extremely sensitive to their starting conditions. A very small difference in an initial velocity or position can lead to a completely different outcome later. In a non-chaotic system, a small error usually stays small, but in an N-body system, even a tiny rounding or calculation error can grow rapidly.
</p>
<p>Because of this, all numerical methods are approximations. Reducing the time step or increasing precision can improve the results, but no method can produce a perfectly exact prediction. The real motion of the bodies — what would happen in nature — is the true solution, even though it cannot be written as a simple formula.

The three-body problem is the first case where this behavior appears. It shows how quickly a system can move from predictable and stable to chaotic and unpredictable once more bodies are involved.</p>
<h1>Project Introduction</h1>
<p>This project focuses on simulating periodic solutions in the N-body problem — cases where, despite the general chaotic nature of the system, the bodies follow repeating paths over time. 
The objective of this project is to identify and analyze these periodic solutions while testing how different numerical methods perform when simulating them. Since the N-body problem does not have a closed-form solution for most cases, numerical integration methods are required to compute motion over time. By comparing approaches such as Runge–Kutta methods and Velocity Verlet, the project evaluates how accurately each method preserves periodicity and energy over extended simulations.
Different configurations may require different numerical techniques. Some methods remain stable and maintain the periodic motion, while others accumulate numerical errors that alter the system’s behavior. Through this comparison, the project aims to determine which numerical methods are most suitable for maintaining periodicity across a range of three (as well as N)-body configurations.
</p>
      <h1>3 Body Configurations</h1>
      <h2>Popular and Solved</h2>
      <h2>3-Body Gallery: Sheen's</h2>
      <ul className='grid'>
        {configs.map((config)=> ((config.bodies.length === 3) &&
          <li key={config.ids}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )}
      </ul>
      <h1>N Body Configrations</h1>
      <ul className='grid'>
        {configs.map((config)=> ((!(config.bodies.length === 3)) &&
          <li key={config.id}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )} </ul>
        <hr/>
      <button className='cyoButton'>Check Out Simulator</button>
      </div>
    </>
    
  )}
  else {
    return (<Sim config={selectedSim} handleBackButton={handleBackButtonStateChange}/>)
  }
}

export default App
