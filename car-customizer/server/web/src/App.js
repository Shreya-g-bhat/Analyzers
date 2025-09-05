import React, { useState } from "react";
import CarViewer from "./components/CarViewer";
import ControlPanel from "./components/ControlPanel";

export default function App() {
  const [config, setConfig] = useState({
    model: "sedan", // sedan = car.glb, ford = car2.glb
    colors: {
      body: "#ff0000",
      rims: "#555555",
      glass: "#ffffff"
    },
    paintFinish: 0.5,
    glassOpacity: 0.3,
    headlightOn: false,
    headlightIntensity: 1.0,
    accessories: {
      spoiler: false,
      roofRack: false
    },
    background: "#202124",
    backgroundMode: "Solid", // or "HDR"
    light: 0.6
  });

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "300px", background: "#1a1a1a" }}>
        <ControlPanel config={config} setConfig={setConfig} />
      </div>
      <div style={{ flex: 1 }}>
        <CarViewer config={config} />
      </div>
    </div>
  );
}
