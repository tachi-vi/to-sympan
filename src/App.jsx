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
      <p>The three-body problem lacks a closed-form solution, which is a mathematical expression that uses a finite number of "standard" operations (addition, division, logarithm, etc.), usually expressed as a formula or equation. This means there is no equation for which you can plug in the initial positions, velocities, and masses, and solve for the exact positions and velocities at a later time. For most configurations of the three bodies, numerical methods are needed to iteratively compute the positions over time, although the chaotic behavior of the system means that even small numerical errors can propagate and result in large deviations over time.
Chaotic systems are very sensitive to their input parameters, so anything less than a perfect continuous estimation can result in wildly different results. Unlike a non-chaotic problem where a 1% error in velocity might result in a 1% error in position, a 1% error in velocity at some time step can result in arbitrarily large deviation at a later time. Even if your numerical approximation is very good, you may eventually find that your model predicts something entirely different from reality. You can run increasingly good approximations with decreasingly short time steps, but there is no numerical approach that is anything but an approximation, which simply may not be "good enough" in a chaotic system.
Of course, the three body problem does have a solution - it's whatever would actually happen when observing the three bodies in isolation. The physical reality is the solution to the problem. It's just that this solution cannot be expressed with common mathematical operations in "closed form"
      </p>
      <h1>Project Introduction</h1>
      <p>I built this to just test out various methods of integrators, expiriment with solved Configrations</p>
      <h1>3 Body Configurations</h1>
      <h1>Popular and Solved</h1>
      <ul>
        {configs.map((config)=> ((config.bodies.length === 3) &&
          <li key={config.ids}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )}
      </ul>
      <h1>N Body Configrations</h1>
      <ul>
        {configs.map((config)=> ((!(config.bodies.length === 3)) &&
          <li key={config.id}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )} </ul>
        <hr/>
      <button>Create Your Own</button>
      </div>
    </>
    
  )}
  else {
    return (<Sim config={selectedSim} handleBackButton={handleBackButtonStateChange}/>)
  }
}

export default App
