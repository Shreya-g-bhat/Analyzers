import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Helper: check if mesh name has keywords
const nameHas = (child, keywords) =>
  child.name && keywords.some(k => child.name.toLowerCase().includes(k));

function applyPaintFinish(mat, metallicFactor) {
  const m = Math.min(Math.max(metallicFactor, 0), 1);
  const roughness = 1 - (m * 0.6);
  const metalness = m * 0.9;
  if ('roughness' in mat) mat.roughness = roughness;
  if ('metalness' in mat) mat.metalness = metalness;
}

function tintGlassMaterial(mat, color, opacity) {
  mat.transparent = true;
  mat.opacity = Math.min(Math.max(1 - opacity, 0.05), 1);
  if (mat.color) mat.color.set(color);
  if ('roughness' in mat) mat.roughness = 0.1;
  if ('metalness' in mat) mat.metalness = 0.0;
}

function setEmissive(mat, on, intensity, color = '#ffffff') {
  if (!mat.emissive) mat.emissive = new THREE.Color(0x000000);
  mat.emissive.set(on ? color : '#000000');
  if ('emissiveIntensity' in mat) mat.emissiveIntensity = on ? intensity : 0;
  mat.needsUpdate = true;
}

function CarModel({ url, config }) {
  const { scene } = useGLTF(url);

  // Clone materials to avoid editing originals
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh && child.material && !child.userData._cloned) {
        child.material = child.material.clone();
        child.userData._cloned = true;
      }
    });
  }, [scene]);

  // DEBUG: Log mesh names to console so you know what to target
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        console.log('Mesh:', child.name, 'Material:', child.material?.name);
      }
    });
  }, [scene]);

  // Apply config dynamically
  useEffect(() => {
    const { colors, paintFinish, glassOpacity, headlightOn, headlightIntensity, accessories } = config;

    scene.traverse(child => {
      if (!child.isMesh || !child.material) return;

      // Accessories toggle
      if (nameHas(child, ['spoiler'])) child.visible = !!accessories?.spoiler;
      if (nameHas(child, ['roof', 'rack']) && child.name.toLowerCase().includes('roof')) {
        if (child.name.toLowerCase().includes('rack')) child.visible = !!accessories?.roofRack;
      }

      // BODY – affect all except obvious rims, glass, lights
      if (!nameHas(child, ['glass', 'window', 'wind', 'head', 'tail', 'rim', 'wheel', 'tire', 'tyre'])) {
        if (child.material.map) child.material.map = null; // flatten any texture
        if (child.material.color) child.material.color.set(colors.body);
        applyPaintFinish(child.material, paintFinish);
      }

      // RIMS
      if (nameHas(child, ['rim', 'wheel', 'alloy']) && !nameHas(child, ['tire', 'tyre', 'rubber'])) {
        if (child.material.color) child.material.color.set(colors.rims);
        if ('metalness' in child.material) child.material.metalness = 0.8;
        if ('roughness' in child.material) child.material.roughness = 0.4;
      }

      // GLASS
      if (nameHas(child, ['glass', 'window', 'wind'])) {
        tintGlassMaterial(child.material, colors.glass, glassOpacity);
      }

      // HEADLIGHTS / TAILLIGHTS (force emissive)
      if (nameHas(child, ['light', 'lamp', 'head'])) {
        setEmissive(child.material, headlightOn, headlightIntensity, '#ffffff');
      }
      if (nameHas(child, ['tail', 'rear'])) {
        setEmissive(child.material, headlightOn, headlightIntensity * 0.8, '#ff2a2a');
      }
    });
  }, [scene, config]);

  return <primitive object={scene} />;
}

export default function CarViewer({ config }) {
  if (!config || !config.model) {
    return <div style={{ color: 'white', padding: 16 }}>Loading car model…</div>;
  }

  const modelUrl = `/models/${config.model}.glb`;
  const useHDR = config.backgroundMode === 'HDR';
  const bgColor = config.background || '#202124';

  return (
    <Canvas camera={{ position: [4, 2.2, 6], fov: 50 }}>
      <color attach="background" args={[bgColor]} />
      <Suspense fallback={null}>
        <CarModel url={modelUrl} config={config} />
        {useHDR && <Environment files="/models/env.hdr" background />}
      </Suspense>

      {/* Optional real headlight beams */}
      {config.headlightOn && (
        <>
          <pointLight position={[1.2, 1, 3]} intensity={config.headlightIntensity * 2} color="white" />
          <pointLight position={[-1.2, 1, 3]} intensity={config.headlightIntensity * 2} color="white" />
        </>
      )}

      <ambientLight intensity={config.light ?? 0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, 6, -4]} intensity={0.5} />
      <OrbitControls enableDamping dampingFactor={0.12} />
    </Canvas>
  );
}
