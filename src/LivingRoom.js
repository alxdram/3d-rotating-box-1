// src/LivingRoom.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function LivingRoom() {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/Living_room.glb');
  const roomRef = useRef();

  useEffect(() => {
    console.log('GLTF Model:', gltf);
  }, [gltf]);

  useFrame(() => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.0005;
    }
  });

  if (!gltf) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }

  return <primitive ref={roomRef} object={gltf.scene} />;
}

function MyScene() {
  return (
    <Canvas
      gl={{ alpha: true }} // Enable transparency
      style={{ background: 'transparent' }} // Set background to transparent
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <LivingRoom />
    </Canvas>
  );
}

export default LivingRoom;