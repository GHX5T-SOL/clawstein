"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Image, Sky } from "@react-three/drei";
import { Suspense } from "react";

function PalmTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Fronds */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Ocean() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#0ea5e9"
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

function Island() {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
      <meshStandardMaterial color="#e8d5b7" roughness={0.9} />
    </mesh>
  );
}

function ClawsteinMascot() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 2, 2]}>
        <Image
          url="/clawstein.png"
          scale={[2.5, 3]}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#fff8dc" />
      <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={0.4} />
      <Ocean />
      <Island />
      <PalmTree position={[2, 0.5, 1.5]} />
      <PalmTree position={[-1.8, 0.5, 1.2]} />
      <PalmTree position={[1, 0.5, -1.5]} />
      <ClawsteinMascot />
    </>
  );
}

export default function IslandScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#0ea5e9" wireframe />
            </mesh>
          }
        >
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
