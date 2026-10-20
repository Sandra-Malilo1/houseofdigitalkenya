"use client";

import { useLoader, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
// @ts-ignore
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// @ts-ignore
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as THREE from "three";

export default function RockGlassLetter({
  letter,
  position,
}: {
  letter: string;
  position: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  // Load assets
  const font = useLoader(FontLoader, "/fonts/helvetiker_regular.typeface.json");
  const rockTexture = useLoader(THREE.TextureLoader, "/textures/rock.jpg");
  const glassTexture = useLoader(THREE.TextureLoader, "/textures/glass.png");

  // Geometry
  const geometry = new TextGeometry(letter, {
    font,
    size: 1.2,
    height: 0.6,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.05,
    bevelSegments: 4,
  });

  // Subtle rotation animation
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} geometry={geometry} position={position}>
        <meshPhysicalMaterial
          map={rockTexture}
          roughnessMap={rockTexture}
          transmission={0.9}
          opacity={0.95}
          transparent
          metalness={0.4}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          normalMap={glassTexture}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}
