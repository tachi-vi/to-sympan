import React from 'react';

export default function SimulationSettings({ theme, settings, setSettings, config }) {
  const handleChange = (key, value) => {
    settings[key] = value;
    setSettings({ ...settings });
  };

  // Choose the class based on theme
  const inputClass = theme === "dark" ? "drkBtn" : "lghtBtn";

  return (
    <div className="simulation-settings">

      <div>
        <label>Scale ({settings.scale})</label>
        <input
          className={inputClass}
          type="range"
          min="10"
          max="400"
          value={settings.scale}
          onChange={(e) => handleChange("scale", Number(e.target.value))}
        />
      </div>

      <div>
        <label>Simulation Method</label>
        <select
          className={inputClass}
          value={settings.simulator}
          onChange={(e) => handleChange("simulator", e.target.value)}
        >
          <option value="rk2">Runge-Kutta 2</option>
          <option value="rk4">Runge-Kutta 4</option>
          <option value="vv">Symplectic: Velocity Verlet</option>
          <option value="cash-karp">Adaptive Runge Kutta: Cash-Karp</option>
          <option value="dopri">(!!WIP!!)Dormand Prince</option>
        </select>
      </div>

      <div>
        <label>Δt (time step)</label>
        <input
          className={inputClass}
          type="number"
          step="any"
          value={settings.dt}
          onChange={(e) => handleChange("dt", parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Steps per Frame</label>
        <input
          className={inputClass}
          type="number"
          min="1"
          value={settings.spf}
          onChange={(e) => handleChange("spf", parseInt(e.target.value))}
        />
      </div>
      
      {config.com_drift != null && (
  <>

  <div>
    <label>Recenter to Center of Mass </label>
    <input
      type="checkbox"
      checked={settings.recentertocom}
      onChange={() =>
        setSettings(s => ({
          ...s,
          recentertocom: !s.recentertocom
        }))
      }
    /></div>
  </>
)}

    </div>
  );
}
