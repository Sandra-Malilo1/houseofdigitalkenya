import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

// Floating Sphere Component with distortion and glow
const FloatingSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
};

// Glowing Torus Ring
const GlowingTorus = ({ position }: { position: [number, number, number] }) => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={torusRef} args={[1.5, 0.4, 16, 100]} position={position}>
        <meshStandardMaterial
          color="#0EA5E9"
          emissive="#0EA5E9"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>
    </Float>
  );
};

// Wireframe Box
const WireframeBox = ({ position }: { position: [number, number, number] }) => {
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.008;
      boxRef.current.rotation.y += 0.012;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1.2}>
      <Box ref={boxRef} args={[2, 2, 2]} position={position}>
        <meshBasicMaterial color="#FCD34D" wireframe />
      </Box>
    </Float>
  );
};

// Particle Field
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60A5FA" transparent opacity={0.6} />
    </points>
  );
};

// Main Scene Component
const Scene3D = () => {
  return (
    <>
      {/* Ambient lighting for overall scene */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light for highlights - blue and yellow */}
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#0EA5E9" />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#FBBF24" />
      
      {/* Point lights for glow effects */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#0EA5E9" distance={10} />
      <pointLight position={[-5, -5, -5]} intensity={1.2} color="#FBBF24" distance={8} />

      {/* 3D Objects with new colors */}
      <FloatingSphere position={[-3, 2, -2]} color="#0EA5E9" />
      <FloatingSphere position={[4, -1, -3]} color="#FBBF24" />
      <GlowingTorus position={[0, 0, -5]} />
      <WireframeBox position={[3, 2, -4]} />
      <ParticleField />
    </>
  );
};

export default Scene3D;
