import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SoftShadows, Center } from '@react-three/drei';

function RotatingDisc() {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.z += 0.005;
  });
  return (
    <mesh ref={mesh} scale={1.5}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#7b2cbf" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

export default function ThreeLogo() {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 mb-8">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <SoftShadows size={5} samples={17} near={10} far={30} />
        <Center>
          <RotatingDisc />
        </Center>
      </Canvas>
    </div>
  );
}
