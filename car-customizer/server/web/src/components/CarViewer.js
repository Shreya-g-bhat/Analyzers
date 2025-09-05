import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function nameHas(node, keywords) {
  const name = node.name.toLowerCase();
  return keywords.some(k => name.includes(k));
}

function applyPaintFinish(material, finish) {
  material.metalness = finish;
  material.roughness = 1 - finish;
}

function CarModel({ config }) {
  const path = config.model === "sedan" ? "/models/car.glb" : "/models/car2.glb";
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        const mat = child.material;
        mat.side = THREE.DoubleSide;

        // Body
        if (nameHas(child, ["body", "paint", "shell", "chassis", "ford", "carpaint"])) {
          if (mat.color) mat.color.set(config.colors.body);
          applyPaintFinish(mat, config.paintFinish);
        }

        // Rims
        if (nameHas(child, ["rim", "wheel", "tire"])) {
          if (mat.color) mat.color.set(config.colors.rims);
        }

        // Glass
        if (nameHas(child, ["glass", "window"])) {
          if (mat.color) mat.color.set(config.colors.glass);
          mat.transparent = true;
          mat.opacity = config.glassOpacity;
        }

        // Headlights
        if (nameHas(child, ["headlight", "lamp"])) {
          if (mat.emissive) {
            mat.emissive = new THREE.Color(config.headlightOn ? "#ffffff" : "#000000");
            mat.emissiveIntensity = config.headlightOn ? config.headlightIntensity : 0;
          }
        }
      }
    });
  }, [scene, config]);

  return <primitive object={scene} scale={1.5} />;
}

export default function CarViewer({ config }) {
  return (
    <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
      <ambientLight intensity={config.light} />
      <directionalLight position={[5, 5, 5]} intensity={config.light} />
      <Suspense fallback={null}>
        <CarModel config={config} />
        {config.backgroundMode === "HDR" ? (
          <Environment files="/models/env.hdr" background />
        ) : (
          <color attach="background" args={[config.background]} />
        )}
      </Suspense>
      <OrbitControls enableZoom />
    </Canvas>
  );
}

useGLTF.preload("/models/car.glb");
useGLTF.preload("/models/car2.glb");
