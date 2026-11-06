import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';

function MorphingCore({ darkMode = true }) {
  const sphereRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.3;
      sphereRef.current.rotation.y = t * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.y = t * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.6;
      ring2Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group>
      {/* Sphère vivante centrale organique déformable */}
      <Float speed={3.5} rotationIntensity={1.8} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.15, 64, 64]}>
          <MeshDistortMaterial
            color={darkMode ? '#8b5cf6' : '#7c3aed'}
            attach="material"
            distort={0.45}
            speed={2.8}
            roughness={0.15}
            metalness={0.8}
            emissive={darkMode ? '#4c1d95' : '#2e1065'}
            emissiveIntensity={0.6}
          />
        </Sphere>
      </Float>

      {/* Anneau orbital externe 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Anneau orbital externe 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#e11d48"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Petits cristaux en orbite flottante */}
      <Float speed={4} rotationIntensity={2} floatIntensity={3}>
        <Octahedron args={[0.28]} position={[1.8, 1.3, 0.5]}>
          <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
        </Octahedron>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={2.5}>
        <Octahedron args={[0.22]} position={[-1.9, -1.1, -0.6]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </Octahedron>
      </Float>

      <Float speed={5} rotationIntensity={3} floatIntensity={2}>
        <Octahedron args={[0.2]} position={[0.4, -2.1, 0.9]}>
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
        </Octahedron>
      </Float>
    </group>
  );
}

export default function HeroScene3D({ darkMode = true, compact = false }) {
  return (
    <div
      className={`relative w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing ${
        compact ? 'hero-scene-compact' : 'min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]'
      }`}
    >
      {/* Halo de lueur d'ambiance 3D */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-fuchsia-500/10 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={darkMode ? 0.9 : 1.3} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-6, -4, -4]} intensity={2.2} color="#38bdf8" />
        <pointLight position={[0, 4, 2]} intensity={1.2} color="#f43f5e" />
        <MorphingCore darkMode={darkMode} />
      </Canvas>

      {!compact && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/70 border border-violet-500/30 text-[10px] font-bold text-violet-300 tracking-wider uppercase backdrop-blur-md flex items-center gap-1.5 shadow-lg pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Objet 3D Interactif Vivant
        </div>
      )}
    </div>
  );
}
