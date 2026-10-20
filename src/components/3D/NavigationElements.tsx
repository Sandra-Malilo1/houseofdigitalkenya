import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D Navigation Indicator - shows which section is active
export const NavIndicator3D = ({ active }: { active: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={active ? 0.3 : 0.2}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={active ? "#0EA5E9" : "#FBBF24"}
        emissive={active ? "#0EA5E9" : "#FBBF24"}
        emissiveIntensity={active ? 0.8 : 0.4}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

// Small 3D cube for section markers
export const SectionMarker3D = ({ color = "#0EA5E9" }: { color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.15}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};
