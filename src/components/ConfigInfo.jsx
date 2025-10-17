import React from "react";
import "./ConfigDisplay.css";

export default function ConfigDisplay({ config, onConfigChange }) {
  if (!config) return null;

const handleChange = (index, field, value) => {
  const updatedBodies = config.bodies.map((body, i) =>
    i === index
      ? { 
          ...body, 
          [field]: field === "name" ? value : parseFloat(value) || 0 
        }
      : body
  );

  const updatedConfig = { ...config, bodies: updatedBodies };
  onConfigChange(updatedConfig);
};



  return (
    <div className="config-card editable">

      <div className="body-list">
        {config.bodies.map((body, index) => (
          <div key={index} className="body-item">
            <input
  className="body-name"
  type="text"
  value={body.name || `Body ${index + 1}`}
  placeholder={body.name || `Body ${index + 1}`}
  onChange={(e) => handleChange(index, "name", e.target.value)}
/>
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
