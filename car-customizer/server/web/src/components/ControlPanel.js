import React from "react";

export default function ControlPanel({ config, setConfig }) {
  const handleColor = (key, value) => {
    setConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };

  return (
    <div style={{ padding: 16, color: "white" }}>
      <h2>Car Configurator</h2>

      {/* Model selector */}
      <label>Model:</label>
      <select
        value={config.model}
        onChange={e => setConfig({ ...config, model: e.target.value })}
      >
        <option value="sedan">Sedan</option>
        <option value="ford">Ford</option>
      </select>

      <hr />

      {/* Body Color */}
      <label>Body Color:</label>
      <input
        type="color"
        value={config.colors.body}
        onChange={e => handleColor("body", e.target.value)}
      />

      {/* Rim Color */}
      <label>Rim Color:</label>
      <input
        type="color"
        value={config.colors.rims}
        onChange={e => handleColor("rims", e.target.value)}
      />

      {/* Glass Color */}
      <label>Glass Color:</label>
      <input
        type="color"
        value={config.colors.glass}
        onChange={e => handleColor("glass", e.target.value)}
      />

      <hr />

      {/* Paint Finish */}
      <label>Paint Finish:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={config.paintFinish}
        onChange={e =>
          setConfig({ ...config, paintFinish: parseFloat(e.target.value) })
        }
      />

      {/* Glass Opacity */}
      <label>Glass Opacity:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={config.glassOpacity}
        onChange={e =>
          setConfig({ ...config, glassOpacity: parseFloat(e.target.value) })
        }
      />

      <hr />

      {/* Headlights */}
      <label>
        <input
          type="checkbox"
          checked={config.headlightOn}
          onChange={e =>
            setConfig({ ...config, headlightOn: e.target.checked })
          }
        />
        Headlights On
      </label>

      <label>Headlight Intensity:</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={config.headlightIntensity}
        onChange={e =>
          setConfig({ ...config, headlightIntensity: parseFloat(e.target.value) })
        }
      />

      <hr />

      {/* Accessories */}
      <label>
        <input
          type="checkbox"
          checked={config.accessories.spoiler}
          onChange={e =>
            setConfig({
              ...config,
              accessories: { ...config.accessories, spoiler: e.target.checked }
            })
          }
        />
        Spoiler
      </label>

      <label>
        <input
          type="checkbox"
          checked={config.accessories.roofRack}
          onChange={e =>
            setConfig({
              ...config,
              accessories: { ...config.accessories, roofRack: e.target.checked }
            })
          }
        />
        Roof Rack
      </label>

      <hr />

      {/* Background */}
      <label>Background Mode:</label>
      <select
        value={config.backgroundMode}
        onChange={e => setConfig({ ...config, backgroundMode: e.target.value })}
      >
        <option value="Solid">Solid</option>
        <option value="HDR">HDR</option>
      </select>

      <label>Background Color:</label>
      <input
        type="color"
        value={config.background}
        onChange={e => setConfig({ ...config, background: e.target.value })}
      />

      <label>Light Intensity:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={config.light}
        onChange={e => setConfig({ ...config, light: parseFloat(e.target.value) })}
      />
    </div>
  );
}
