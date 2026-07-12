"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { RGBStrip, Plant, GamingChair, AirCon, WOOD, WOOD_DARK } from "./furniture";

/* room: 3.6m x 3.6m, 2.5m tall — camera sits inside for a 360° look-around */
const W = 3.6;
const D = 3.6;
const H = 2.5;

function Label({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return (
    <Html position={position} center distanceFactor={4} zIndexRange={[10, 0]}>
      <div className="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-violet-200/80 bg-white/80 px-3 py-1 text-[11px] font-bold text-violet-800 shadow-[0_2px_12px_-2px_rgba(139,92,246,0.4)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,1)]" />
        {text}
      </div>
    </Html>
  );
}

function Walls() {
  return (
    <group>
      {/* floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={WOOD} roughness={0.75} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-W / 2 + (i + 1) * (W / 6), 0.001, 0]}
        >
          <planeGeometry args={[0.012, D]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.9} />
        </mesh>
      ))}
      {/* ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#fbfdff" roughness={0.95} />
      </mesh>
      {/* ceiling light */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H - 0.02, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial
          color="#fff8ea"
          emissive="#fff3d6"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>

      {/* 4 walls */}
      <mesh receiveShadow position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#f6fafe" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, H / 2, D / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#f6fafe" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f2f7fc" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f2f7fc" roughness={0.9} />
      </mesh>

      {/* door on the +z wall */}
      <group position={[1.1, 0, D / 2 - 0.02]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 1, 0]}>
          <planeGeometry args={[0.85, 2]} />
          <meshStandardMaterial color="#eef3f8" roughness={0.7} />
        </mesh>
        <mesh position={[-0.32, 1, 0.02]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#9fb3c8" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function WindowWithCurtain() {
  return (
    <group position={[-W / 2 + 0.02, 1.45, -0.4]} rotation={[0, Math.PI / 2, 0]}>
      {/* bright window */}
      <mesh>
        <planeGeometry args={[1.3, 1.2]} />
        <meshStandardMaterial
          color="#e3f4ff"
          emissive="#cfeaff"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
      {/* frame */}
      {[-0.66, 0, 0.66].map((x) => (
        <mesh key={x} position={[x, 0, 0.01]}>
          <planeGeometry args={[0.05, 1.26]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      <mesh position={[0, 0.62, 0.01]}>
        <planeGeometry args={[1.36, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, -0.62, 0.01]}>
        <planeGeometry args={[1.36, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* light-blue curtains */}
      {[-0.85, 0.85].map((x) => (
        <group key={x} position={[x, 0.05, 0.08]}>
          {[-0.08, 0, 0.08].map((o, i) => (
            <mesh key={i} position={[o * 0.6, 0, i * 0.015]}>
              <planeGeometry args={[0.28, 1.5]} />
              <meshStandardMaterial
                color={i % 2 ? "#cde8fb" : "#bfe0f7"}
                roughness={1}
                side={2}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* curtain rail */}
      <mesh position={[0, 0.82, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 2.1, 8]} />
        <meshStandardMaterial color="#dfe8f0" metalness={0.5} />
      </mesh>
    </group>
  );
}

function Bed() {
  return (
    <group position={[0.85, 0, -0.68]}>
      {/* frame */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[1.1, 0.22, 2.1]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
      </mesh>
      {/* mattress */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.02, 0.16, 2.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>
      {/* blanket */}
      <mesh castShadow position={[0, 0.44, 0.28]}>
        <boxGeometry args={[1.04, 0.08, 1.4]} />
        <meshStandardMaterial color="#a5d8f5" roughness={0.95} />
      </mesh>
      {/* pillow */}
      <mesh castShadow position={[0, 0.47, -0.78]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.35]} />
        <meshStandardMaterial color="#f4f9fd" roughness={0.95} />
      </mesh>
      {/* headboard */}
      <mesh castShadow position={[0, 0.55, -1.08]}>
        <boxGeometry args={[1.1, 0.75, 0.06]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
      </mesh>
    </group>
  );
}

function DeskSetup() {
  return (
    <group position={[-1.25, 0, 0.85]} rotation={[0, Math.PI / 2, 0]}>
      {/* white desk */}
      <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[1.4, 0.05, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} castShadow position={[x, 0.36, 0]}>
          <boxGeometry args={[0.05, 0.72, 0.52]} />
          <meshStandardMaterial color="#eef3f8" roughness={0.5} />
        </mesh>
      ))}
      {/* desk lamp */}
      <group position={[-0.45, 0.745, -0.18]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.03, 16]} />
          <meshStandardMaterial color="#e8eef5" roughness={0.5} />
        </mesh>
        <mesh castShadow position={[0.05, 0.16, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.015, 0.015, 0.34, 8]} />
          <meshStandardMaterial color="#cfdce8" metalness={0.4} />
        </mesh>
        <mesh castShadow position={[0.16, 0.3, 0]} rotation={[0, 0, 1.1]}>
          <coneGeometry args={[0.07, 0.12, 16, 1, true]} />
          <meshStandardMaterial color="#f4f7fa" roughness={0.6} side={2} />
        </mesh>
        <pointLight position={[0.18, 0.26, 0]} intensity={0.9} color="#ffe8c4" distance={1.6} />
      </group>
      {/* LED strip behind desk (violet) */}
      <RGBStrip position={[0, 0.7, -0.31]} size={[1.36, 0.03, 0.03]} speed={0.15} offset={0.7} />
      <GamingChair position={[0, 0, 0.55]} rotation={Math.PI} accent="#22d3ee" />
      {/* small plant on desk */}
      <Plant position={[0.55, 0.74, -0.12]} scale={0.45} />
    </group>
  );
}

function Storage() {
  return (
    <group position={[-1.35, 0, -1.2]}>
      {/* wardrobe */}
      <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[0.8, 1.8, 0.55]} />
        <meshStandardMaterial color="#f4f7fa" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0.276]}>
        <planeGeometry args={[0.015, 1.7]} />
        <meshStandardMaterial color="#cfdce8" />
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.285]}>
          <cylinderGeometry args={[0.012, 0.012, 0.14, 8]} />
          <meshStandardMaterial color="#9fb3c8" metalness={0.7} />
        </mesh>
      ))}
      {/* low shelf */}
      <mesh castShadow receiveShadow position={[0.85, 0.3, 0.05]}>
        <boxGeometry args={[0.7, 0.6, 0.35]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>
      {/* books */}
      {[0.62, 0.78, 0.95].map((x, i) => (
        <mesh key={x} castShadow position={[x, 0.7, 0.05]} rotation={[0, 0, (i - 1) * 0.08]}>
          <boxGeometry args={[0.05, 0.2, 0.15]} />
          <meshStandardMaterial color={["#7dd3fc", "#c4b5fd", "#6ee7b7"][i]} />
        </mesh>
      ))}
    </group>
  );
}

function Posters() {
  return (
    <group>
      {/* game posters on the back wall */}
      <group position={[-0.7, 1.65, -D / 2 + 0.02]}>
        <mesh>
          <planeGeometry args={[0.5, 0.68]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[0.44, 0.62]} />
          <meshStandardMaterial
            color="#123a5e"
            emissive="#38bdf8"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, 0.1, 0.01]}>
          <circleGeometry args={[0.12, 24]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.6} />
        </mesh>
      </group>
      <group position={[0.05, 1.75, -D / 2 + 0.02]}>
        <mesh>
          <planeGeometry args={[0.4, 0.55]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[0.34, 0.49]} />
          <meshStandardMaterial
            color="#2d1b4e"
            emissive="#8b5cf6"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[0, -0.05, 0.01]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.14, 0.14]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.6} />
        </mesh>
      </group>
      {/* rug beside the bed */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.006, 0.15]}>
        <circleGeometry args={[0.8, 40]} />
        <meshStandardMaterial color="#e4f0f9" roughness={1} />
      </mesh>
      {/* warm LED strip behind the bed headboard */}
      <mesh position={[0.85, 0.95, -D / 2 + 0.03]}>
        <boxGeometry args={[1.1, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ffd9a0"
          emissive="#ffc978"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.05} color="#fdf6ea" />
      <pointLight position={[0, 2.2, 0]} intensity={7} color="#ffedcf" distance={6} castShadow />
      <pointLight position={[-1.4, 1.2, -0.4]} intensity={3} color="#bfe0ff" distance={4} />
      <pointLight position={[-1.2, 0.9, 0.9]} intensity={1.5} color="#c4b5fd" distance={2.5} />

      <Walls />
      <Posters />
      <WindowWithCurtain />
      <Bed />
      <DeskSetup />
      <Storage />
      <Plant position={[1.4, 0, 1.3]} scale={0.9} />
      <AirCon position={[0, 2.15, -D / 2 + 0.12]} />

      <Label position={[0.85, 1.1, -1.05]} text="シングルベッド" />
      <Label position={[-1.25, 1.55, 0.85]} text="白いデスク &amp; LEDライト" />
      <Label position={[-1.15, 1.0, 1.35]} text="ゲーミングチェア" />
      <Label position={[-1.35, 2.0, -1.2]} text="収納" />
      <Label position={[-1.6, 1.5, -0.4]} text="カーテン &amp; 窓" />
      <Label position={[0, 2.3, -1.6]} text="エアコン" />

      {/* 360° look-around: camera fixed near room center */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.07}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.4}
        target={[0.1504, 1.34975, 0.499]}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 1.55}
      />
    </>
  );
}

export default function PrivateRoomScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0.15, 1.35, 0.5], fov: 75 }}
      className="!touch-none"
    >
      <color attach="background" args={["#f3f8fe"]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
