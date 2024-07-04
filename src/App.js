// src/App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LivingRoom from './LivingRoom';

function App() {
  return (
    <Canvas style={{ height: '100vh' }} camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <LivingRoom />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
