"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------- Animated RGB LED strip ---------------- */
export function RGBStrip({
  position,
  size,
  speed = 0.25,
  offset = 0,
}: {
  position: [number, number, number];
  size: [number, number, number];
  speed?: number;
  offset?: number;
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const h = (clock.elapsedTime * speed + offset) % 1;
    mat.current.emissive.setHSL(h, 0.85, 0.6);
    mat.current.color.setHSL(h, 0.85, 0.6);
  });
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={mat}
        emissive="#22d3ee"
        emissiveIntensity={2.2}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ---------------- Potted plant ---------------- */
export function Plant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* pot */}
      <mesh castShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.13, 0.1, 0.3, 20]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.8} />
      </mesh>
      {/* trunk */}
      <mesh castShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#8a6b4a" roughness={0.9} />
      </mesh>
      {/* foliage */}
      {[
        [0, 0.72, 0, 0.22],
        [0.14, 0.6, 0.05, 0.15],
        [-0.13, 0.62, -0.06, 0.14],
        [0.02, 0.58, 0.14, 0.12],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 12]} />
          <meshStandardMaterial color={i % 2 ? "#3f9e5f" : "#4fb572"} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Gaming chair ---------------- */
export function GamingChair({
  position,
  rotation = 0,
  accent = "#22d3ee",
}: {
  position: [number, number, number];
  rotation?: number;
  accent?: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* base star + pole */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          castShadow
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.16,
            0.03,
            Math.sin((i / 5) * Math.PI * 2) * 0.16,
          ]}
          rotation={[0, -(i / 5) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.24, 0.04, 0.05]} />
          <meshStandardMaterial color="#2a2f38" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.32, 12]} />
        <meshStandardMaterial color="#3a4150" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* seat */}
      <mesh castShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[0.42, 0.09, 0.42]} />
        <meshStandardMaterial color="#252a33" roughness={0.6} />
      </mesh>
      {/* seat accent sides */}
      <mesh position={[0, 0.42, 0.21]}>
        <boxGeometry args={[0.42, 0.06, 0.015]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      {/* backrest */}
      <mesh castShadow position={[0, 0.78, -0.19]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.42, 0.72, 0.09]} />
        <meshStandardMaterial color="#252a33" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.78, -0.235]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
      {/* armrests */}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} castShadow position={[x, 0.56, 0]}>
          <boxGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#2a2f38" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Wall AC unit ---------------- */
export function AirCon({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.28, 0.22]} />
        <meshStandardMaterial color="#fbfdff" roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.09, 0.115]}>
        <boxGeometry args={[0.82, 0.04, 0.01]} />
        <meshStandardMaterial color="#cfe3f2" />
      </mesh>
      <mesh position={[0.32, 0.02, 0.115]}>
        <boxGeometry args={[0.06, 0.02, 0.005]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------------- Simple wood-tone material helpers ---------------- */
export const WOOD = "#c9a87c";
export const WOOD_DARK = "#a98a63";
export const WHITE_MAT = "#f7fafc";
