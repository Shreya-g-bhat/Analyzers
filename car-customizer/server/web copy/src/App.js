import React, { useState } from 'react';
import CarViewer from './components/CarViewer';
import ControlPanel from './components/ControlPanel';

export default function App() {
  const [config, setConfig] = useState({
    model: 'car',  // default model file
    colors: {
      body: '#ff0000',
      rims: '#ffffff',
      glass: '#87ceeb'
    },
    paintFinish: 0.5,
    glassOpacity: 0.3,
    headlightOn: false,
    headlightIntensity: 1,
    accessories: { spoiler: false, roofRack: false },
    light: 0.6,
    background: '#202124',
    backgroundMode: 'Solid' // or 'HDR'
  });

  const handleChange = (path, value) => {
    setConfig(prev => {
      // deep clone so React sees a new object
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = newConfig;
      while (keys.length > 1) {
        obj = obj[keys.shift()];
      }
      obj[keys[0]] = value;
      return newConfig;
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000' }}>
      <ControlPanel config={config} onChange={handleChange} />
      <div style={{ flex: 1 }}>
        <CarViewer key={config.model} config={config} />
      </div>
    </div>
  );
}
