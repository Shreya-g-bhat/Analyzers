import React from 'react';

export default function ControlPanel({ config, setConfig }) {
  const handleColor = (part, value) =>
    setConfig(prev => ({ ...prev, colors: { ...prev.colors, [part]: value } }));

  return (
    <div style={{ padding: 12, background: '#222', color: 'white', width: 260 }}>
      <h3>Car Customizer</h3>

      <label>Model:</label>
      <select
        value={config.model}
        onChange={e => setConfig(prev => ({ ...prev, model: e.target.value }))}
      >
        <option value="car">Sedan</option>
        <option value="car2">Ford</option>
      </select>

      <label>Body Color:</label>
      <input type="color" value={config.colors.body}
        onChange={e => handleColor('body', e.target.value)} />

      <label>Rim Color:</label>
      <input type="color" value={config.colors.rims}
        onChange={e => handleColor('rims', e.target.value)} />

      <label>Glass Color:</label>
      <input type="color" value={config.colors.glass}
        onChange={e => handleColor('glass', e.target.value)} />

      <label>Paint Finish:</label>
      <input type="range" min="0" max="1" step="0.01"
        value={config.paintFinish}
        onChange={e => setConfig(prev => ({ ...prev, paintFinish: parseFloat(e.target.value) }))} />

      <label>Glass Opacity:</label>
      <input type="range" min="0" max="1" step="0.01"
        value={config.glassOpacity}
        onChange={e => setConfig(prev => ({ ...prev, glassOpacity: parseFloat(e.target.value) }))} />

      <label>
        <input type="checkbox"
          checked={config.headlightOn}
          onChange={e => setConfig(prev => ({ ...prev, headlightOn: e.target.checked }))} />
        Headlights On
      </label>

      <label>Headlight Intensity:</label>
      <input type="range" min="0" max="5" step="0.1"
        value={config.headlightIntensity}
        onChange={e => setConfig(prev => ({ ...prev, headlightIntensity: parseFloat(e.target.value) }))} />

      <label>
        <input type="checkbox"
          checked={config.accessories.spoiler}
          onChange={e => setConfig(prev => ({ ...prev, accessories: { ...prev.accessories, spoiler: e.target.checked } }))} />
        Spoiler
      </label>

      <label>
        <input type="checkbox"
          checked={config.accessories.roofRack}
          onChange={e => setConfig(prev => ({ ...prev, accessories: { ...prev.accessories, roofRack: e.target.checked } }))} />
        Roof Rack
      </label>

      <label>Background:</label>
      <input type="color" value={config.background}
        onChange={e => setConfig(prev => ({ ...prev, background: e.target.value }))} />

      <label>
        <input type="checkbox"
          checked={config.backgroundMode === 'HDR'}
          onChange={e => setConfig(prev => ({ ...prev, backgroundMode: e.target.checked ? 'HDR' : 'Solid' }))} />
        HDR Background
      </label>
    </div>
  );
}
