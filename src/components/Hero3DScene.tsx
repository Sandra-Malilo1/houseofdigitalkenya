"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Float, OrbitControls } from "@react-three/drei";

type Hero3DSceneProps = {
  children: React.ReactNode;
};

export default function Hero3DScene({ children }: Hero3DSceneProps) {
  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Floating spheres example */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[-2, 1, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#5eead4" />
            </mesh>

            <mesh position={[2, -1, 0]}>
              <sphereGeometry args={[0.7, 32, 32]} />
              <meshStandardMaterial color="#fbbf24" />
            </mesh>

            <mesh position={[0, 0, -2]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
          </Float>

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* HTML overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
