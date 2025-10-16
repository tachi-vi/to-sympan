import React from "react";
import "./ConfigDisplay.css";

export default function ConfigDisplay({ config, onConfigChange }) {
  if (!config) return null;

  const handleChange = (index, field, value) => {
    const updatedBodies = config.bodies.map((body, i) =>
      i === index ? { ...body, [field]: parseFloat(value) || 0 } : body
    );

    const updatedConfig = { ...config, bodies: updatedBodies };
    onConfigChange(updatedConfig); 
  };

  const handleNameChange = (e) => {
    onConfigChange({ ...config, name: e.target.value });
  };

  return (
    <div className="config-card editable">
      <input
        className="config-title-input"
        value={config.name}
        onChange={handleNameChange}
        placeholder="Config name"
      />
      <p className="config-id">ID: {config.id}</p>

      <div className="body-list">
        {config.bodies.map((body, index) => (
          <div key={index} className="body-item">
            <h3 className="body-header">Body {index + 1}</h3>
            <label>
              Mass:
              <input
                type="number"
                value={body.m}
                onChange={(e) => handleChange(index, "m", e.target.value)}
              />
            </label>
            <label>
              Position X:
              <input
                type="number"
                value={body.x}
                onChange={(e) => handleChange(index, "x", e.target.value)}
              />
            </label>
            <label>
              Position Y:
              <input
                type="number"
                value={body.y}
                onChange={(e) => handleChange(index, "y", e.target.value)}
              />
            </label>
            <label>
              Velocity X:
              <input
                type="number"
                value={body.vx}
                onChange={(e) => handleChange(index, "vx", e.target.value)}
              />
            </label>
            <label>
              Velocity Y:
              <input
                type="number"
                value={body.vy}
                onChange={(e) => handleChange(index, "vy", e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
