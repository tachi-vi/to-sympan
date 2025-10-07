import React from 'react';

export default function SimulationSettings({ settings, setSettings }) {
  const handleChange = (key, value) => {
    settings[key] = value; // direct mutation
    setSettings({ ...settings }); // trigger re-render in parent
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-2xl w-full max-w-md mx-auto shadow-lg space-y-4">

      {/* Scale */}
      <div>
        <label className="block mb-1 font-medium">Scale ({settings.scale})</label>
        <input
          type="range"
          min="10"
          max="400"
          value={settings.scale}
          onChange={(e) => handleChange('scale', Number(e.target.value))}
          className="w-full cursor-pointer accent-pink-500"
        />
      </div>

      {/* Simulator Type */}
      <div>
        <label className="block mb-1 font-medium">Simulation Method</label>
        <select
          value={settings.simulator}
          onChange={(e) => handleChange('simulator', e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
        >
          <option value="rk2">Runge-Kutta 2</option>
          <option value="rk4">Runge-Kutta 4</option>
          <option value="vv">Velocity Verlet</option>
        </select>
      </div>

      {/* Time Step */}
      <div>
        <label className="block mb-1 font-medium">Δt (time step)</label>
        <input
          type="number"
          step="any"
          value={settings.dt}
          onChange={(e) => handleChange('dt', parseFloat(e.target.value))}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
      </div>

      {/* Steps per Frame */}
      <div>
        <label className="block mb-1 font-medium">Steps per Frame</label>
        <input
          type="number"
          min="1"
          value={settings.spf}
          onChange={(e) => handleChange('spf', parseInt(e.target.value))}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
      </div>
    </div>
  );
}
