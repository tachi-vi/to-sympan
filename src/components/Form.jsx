import React from 'react';

export default function SimulationSettings({ settings, setSettings }) {
  const handleChange = (key, value) => {
    settings[key] = value; // direct mutation
    setSettings({ ...settings }); // trigger re-render in parent
  };

  return (
    <div>

      <div>
        <label>Scale ({settings.scale})</label>
        <input
          type="range"
          min="10"
          max="400"
          value={settings.scale}
          onChange={(e) => handleChange('scale', Number(e.target.value))}
          className="w-full cursor-pointer accent-pink-500"
        />
      </div>

      
      <div>
        <label>Simulation Method</label>
        <select
          value={settings.simulator}
          onChange={(e) => handleChange('simulator', e.target.value)}
        >
          <option value="rk2">Runge-Kutta 2</option>
          <option value="rk4">Runge-Kutta 4</option>
          <option value="vv">Velocity Verlet</option>
        </select>
      </div>

   
      <div>
        <label>Δt (time step)</label>
        <input
          type="number"
          step="any"
          value={settings.dt}
          onChange={(e) => handleChange('dt', parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Steps per Frame</label>
        <input
          type="number"
          min="1"
          value={settings.spf}
          onChange={(e) => handleChange('spf', parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
