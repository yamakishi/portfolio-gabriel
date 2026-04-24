// src/components/three/AnimatedBackground.tsx

"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMobile } from "@/hooks/useMobile";

// ==============================================
// TIPOS (TypeScript - Segurança de tipos)
// ==============================================

interface SceneObjectProps {
  isMobileOrTablet: boolean;
}

// ==============================================
// COMPONENTE 1: Esfera Wireframe
// Representa estrutura de dados e sistemas
// ==============================================

function WireframeSphere({ isMobileOrTablet }: SceneObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotação base - mais lenta em mobile para performance
    const speedMultiplier = isMobileOrTablet ? 0.0008 : 0.0015;
    meshRef.current.rotation.y += speedMultiplier;
    meshRef.current.rotation.x += speedMultiplier * 0.3;

    // Parallax - Desativado em mobile
    if (!isMobileOrTablet) {
      meshRef.current.position.x = state.mouse.x * 0.5;
      meshRef.current.position.y = -state.mouse.y * 0.5;
    } else {
      meshRef.current.position.x = 0;
      meshRef.current.position.y = 0;
    }
  });

  const scale = isMobileOrTablet ? 1.4 : 1.8;

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#00e5ff"
        wireframe
        emissive="#00e5ff"
        emissiveIntensity={0.15}
        transparent
        opacity={isMobileOrTablet ? 0.08 : 0.12}
      />
    </mesh>
  );
}

// ==============================================
// COMPONENTE 2: Partículas
// Representa dados trafegando em rede
// ==============================================

function ParticleField({ isMobileOrTablet }: SceneObjectProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Quantidade adaptativa de partículas
  const particleCount = isMobileOrTablet ? 1000 : 4000;

  // Memoização das posições - evita recálculos
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const radius = isMobileOrTablet ? 4.5 : 5.5;

    for (let i = 0; i < particleCount; i++) {
      // Distribuição esférica uniforme
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleCount, isMobileOrTablet]);

  useFrame(() => {
    if (pointsRef.current && !isMobileOrTablet) {
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={particlePositions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#7c3aed"
        size={isMobileOrTablet ? 0.015 : 0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ==============================================
// COMPONENTE 3: Grid no Chão
// Representa estrutura e organização
// ==============================================

function GroundGrid({ isMobileOrTablet }: SceneObjectProps) {
  if (isMobileOrTablet) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <ringGeometry args={[2.0, 2.8, 32]} />
        <meshStandardMaterial
          color="#27272a"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <ringGeometry args={[2.8, 3.8, 64]} />
      <meshStandardMaterial
        color="#27272a"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ==============================================
// COMPONENTE 4: Fallback Simples
// Para dispositivos sem WebGL ou muito antigos
// ==============================================

function SimpleBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

// ==============================================
// COMPONENTE 5: Cena 3D Principal
// ==============================================

function ThreeScene({ isMobileOrTablet }: SceneObjectProps) {
  const cameraPosition: [number, number, number] = isMobileOrTablet
    ? [0, 0, 7]
    : [0, 0, 6];

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: isMobileOrTablet ? 65 : 60 }}
      dpr={isMobileOrTablet ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobileOrTablet,
        alpha: false,
        powerPreference: isMobileOrTablet ? "default" : "high-performance",
      }}
      performance={{ min: 0.5 }}
    >
      {/* Iluminação */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00e5ff" />
      <pointLight position={[-10, -5, -10]} intensity={0.2} color="#7c3aed" />

      {/* Objetos 3D */}
      <WireframeSphere isMobileOrTablet={isMobileOrTablet} />
      <ParticleField isMobileOrTablet={isMobileOrTablet} />
      <GroundGrid isMobileOrTablet={isMobileOrTablet} />

      {/* Neblina para profundidade */}
      <fog attach="fog" args={["#09090b", 5, isMobileOrTablet ? 12 : 15]} />
    </Canvas>
  );
}

// ==============================================
// COMPONENTE PRINCIPAL (Exportado)
// ==============================================

/**
 * AnimatedBackground - Fundo 3D interativo
 *
 * Features:
 * - Detecção automática de dispositivo
 * - Fallback para navegadores sem WebGL
 * - Performance otimizada para mobile
 * - Suspense para carregamento assíncrono
 */
export default function AnimatedBackground() {
  const { isMobileOrTablet } = useMobile();
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Verifica suporte a WebGL (executa apenas no client)
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Fallback para navegadores sem WebGL
  if (!webGLSupported) {
    return <SimpleBackground />;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background">
      <Suspense fallback={<SimpleBackground />}>
        <ThreeScene isMobileOrTablet={isMobileOrTablet} />
      </Suspense>

      {/* Overlay para melhorar legibilidade do conteúdo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobileOrTablet
            ? "radial-gradient(circle at center, transparent 0%, #09090b 100%)"
            : "linear-gradient(to bottom, #09090b 0%, transparent 30%, transparent 70%, #09090b 100%)",
        }}
      />
    </div>
  );
}
