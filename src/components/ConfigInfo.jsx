import React from "react";
import "./ConfigDisplay.css"; // import the CSS below

export default function ConfigDisplay({ config }) {
  if (!config) return null;

  return (
    <div className="config-card">
      <h2 className="config-title">{config.name}</h2>
      <p className="config-id">ID: {config.id}</p>

      <div className="body-list">
        {config.bodies.map((body, index) => (
          <div key={index} className="body-item">
            <h3 className="body-header">Body {index + 1}</h3>
            <p><strong>Mass:</strong> {body.m}</p>
            <p><strong>Position:</strong> (x: {body.x}, y: {body.y})</p>
            <p><strong>Velocity:</strong> (vx: {body.vx}, vy: {body.vy})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
