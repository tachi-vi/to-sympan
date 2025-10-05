import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import configs from './components/configs.js';
import Sim from './components/Sim.jsx';
import styles from './App.module.css';

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
    <div className={styles.container}>
      <div>
        <h1>To Sýmpan</h1>
      </div>
      <p>
        'To Sympan' is my attempt at understanding the universe. 
      </p>
      <h1>3 Body Configurations</h1>
      <ul>
        {configs.map((config)=> ((config.bodies.length === 3) &&
          <li key={config.ids}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )}
      </ul>
      <h1>N Body Configrations</h1>
        {configs.map((config)=> ((!(config.bodies.length === 3)) &&
          <li key={config.id}><button onClick={()=>handleSimClick(config.id)}>{config.name}</button></li>)
        )}
      <button>Create Your Own</button>
      </div>
    </>
    
  )}
  else {
    return (<Sim config={selectedSim} handleBackButton={handleBackButtonStateChange}/>)
  }
}

export default App
