"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { RGBStrip, Plant, GamingChair, AirCon, WOOD, WOOD_DARK } from "./furniture";

/* room: 8m wide (x), 5m deep (z), 2.7m tall */
const W = 8;
const D = 5;
const H = 2.7;

function Label({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return (
    <Html position={position} center distanceFactor={7} zIndexRange={[10, 0]}>
      <div className="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cyan-200/80 bg-white/80 px-3 py-1 text-[11px] font-bold text-sky-800 shadow-[0_2px_12px_-2px_rgba(14,165,233,0.4)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,1)]" />
        {text}
      </div>
    </Html>
  );
}

function TVScreen() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const t = (Math.sin(clock.elapsedTime * 0.8) + 1) / 2;
    mat.current.emissive.lerpColors(
      new THREE.Color("#38bdf8"),
      new THREE.Color("#8b5cf6"),
      t
    );
  });
  return (
    <meshStandardMaterial
      ref={mat}
      color="#0b1526"
      emissive="#38bdf8"
      emissiveIntensity={0.9}
      toneMapped={false}
    />
  );
}

function Room() {
  return (
    <group>
      {/* floor — wood planks */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={WOOD} roughness={0.75} />
      </mesh>
      {/* plank grooves */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-W / 2 + (i + 1) * (W / 10), 0.001, 0]}
        >
          <planeGeometry args={[0.015, D]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.9} />
        </mesh>
      ))}

      {/* back wall (behind TV) */}
      <mesh receiveShadow position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.9} />
      </mesh>
      {/* accent panel behind TV */}
      <mesh position={[0, 1.25, -D / 2 + 0.02]}>
        <planeGeometry args={[3.6, 2.1]} />
        <meshStandardMaterial color="#e7f2fb" roughness={0.8} />
      </mesh>

      {/* left wall with windows */}
      <mesh receiveShadow position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f4f9ff" roughness={0.9} />
      </mesh>
      {[-1.2, 1.2].map((z) => (
        <group key={z} position={[-W / 2 + 0.02, 1.5, z]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 1.4]} />
            <meshStandardMaterial
              color="#dff2ff"
              emissive="#bfe6ff"
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
          {/* frame */}
          {[
            [0, 0.72, 1.58, 0.06],
            [0, -0.72, 1.58, 0.06],
          ].map(([x, y, w, h], i) => (
            <mesh key={i} position={[x, y, 0.01]}>
              <planeGeometry args={[w, h]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
          {[-0.76, 0, 0.76].map((x) => (
            <mesh key={x} position={[x, 0, 0.01]}>
              <planeGeometry args={[0.06, 1.48]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>
      ))}

      {/* right wall */}
      <mesh receiveShadow position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f4f9ff" roughness={0.9} />
      </mesh>

      {/* RGB LED strips along ceiling edges */}
      <RGBStrip position={[0, H - 0.06, -D / 2 + 0.05]} size={[W - 0.2, 0.05, 0.05]} />
      <RGBStrip position={[-W / 2 + 0.05, H - 0.06, 0]} size={[0.05, 0.05, D - 0.2]} offset={0.33} />
      <RGBStrip position={[W / 2 - 0.05, H - 0.06, 0]} size={[0.05, 0.05, D - 0.2]} offset={0.66} />
    </group>
  );
}

function TVSetup() {
  return (
    <group position={[0, 0, -D / 2 + 0.35]}>
      {/* TV board */}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[3.4, 0.5, 0.55]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.6} />
      </mesh>
      {/* big TV */}
      <group position={[0, 1.45, -0.12]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 1.5, 0.08]} />
          <meshStandardMaterial color="#10151d" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.44, 1.36]} />
          <TVScreen />
        </mesh>
      </group>

      {/* PS5 (white, vertical) */}
      <group position={[-1.15, 0.72, 0.05]}>
        <mesh castShadow>
          <boxGeometry args={[0.09, 0.42, 0.28]} />
          <meshStandardMaterial color="#0d1117" roughness={0.4} />
        </mesh>
        {[-0.06, 0.06].map((x) => (
          <mesh key={x} castShadow position={[x, 0, 0]} rotation={[0, 0, x > 0 ? -0.06 : 0.06]}>
            <boxGeometry args={[0.025, 0.46, 0.3]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0, 0.12, 0.15]}>
          <boxGeometry args={[0.02, 0.12, 0.005]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>

      {/* Switch dock + joycons */}
      <group position={[1.1, 0.62, 0.08]}>
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.18, 0.08]} />
          <meshStandardMaterial color="#1c2128" roughness={0.5} />
        </mesh>
        <mesh position={[-0.16, 0.02, 0]}>
          <boxGeometry args={[0.05, 0.14, 0.03]} />
          <meshStandardMaterial color="#00c3e3" />
        </mesh>
        <mesh position={[0.16, 0.02, 0]}>
          <boxGeometry args={[0.05, 0.14, 0.03]} />
          <meshStandardMaterial color="#ff4554" />
        </mesh>
      </group>

      {/* soundbar */}
      <mesh castShadow position={[0, 0.56, 0.1]}>
        <boxGeometry args={[1.6, 0.09, 0.12]} />
        <meshStandardMaterial color="#2a2f38" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* LAN-party style long desk with 5 full gaming desktop stations along the right wall */
const STATION_OFFSETS = [-1.84, -0.92, 0, 0.92, 1.84];
const STATION_COLORS = ["#22d3ee", "#8b5cf6", "#34d399", "#22d3ee", "#8b5cf6"];

function GamingDesk() {
  return (
    <group position={[3.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* long shared desk */}
      <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[4.7, 0.05, 0.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>
      {[-2.25, -0.75, 0.75, 2.25].map((x) => (
        <mesh key={x} castShadow position={[x, 0.36, 0]}>
          <boxGeometry args={[0.06, 0.72, 0.6]} />
          <meshStandardMaterial color="#e8eef5" roughness={0.5} />
        </mesh>
      ))}
      {/* LED strip under the desk edge */}
      <RGBStrip position={[0, 0.69, 0.34]} size={[4.6, 0.02, 0.02]} speed={0.2} offset={0.4} />

      {STATION_OFFSETS.map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          {/* monitor */}
          <group position={[0, 1.05, -0.18]}>
            <mesh castShadow>
              <boxGeometry args={[0.62, 0.38, 0.03]} />
              <meshStandardMaterial color="#10151d" />
            </mesh>
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.58, 0.34]} />
              <meshStandardMaterial
                color="#0b1526"
                emissive={STATION_COLORS[i]}
                emissiveIntensity={1.1}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[0, -0.24, 0.05]}>
              <cylinderGeometry args={[0.04, 0.09, 0.12, 10]} />
              <meshStandardMaterial color="#2a2f38" />
            </mesh>
          </group>
          {/* desktop tower under the desk, RGB face toward the room */}
          <group position={[0.32, 0.26, -0.08]}>
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.48, 0.42]} />
              <meshStandardMaterial color="#1a1f27" roughness={0.4} metalness={0.4} />
            </mesh>
            <RGBStrip position={[0, 0.1, 0.215]} size={[0.16, 0.05, 0.01]} speed={0.5} offset={i * 0.2} />
            <RGBStrip position={[0, -0.1, 0.215]} size={[0.16, 0.05, 0.01]} speed={0.5} offset={i * 0.2 + 0.5} />
          </group>
          {/* keyboard */}
          <mesh position={[0, 0.755, 0.08]}>
            <boxGeometry args={[0.42, 0.02, 0.15]} />
            <meshStandardMaterial color="#2a2f38" />
          </mesh>
          <RGBStrip position={[0, 0.768, 0.08]} size={[0.4, 0.005, 0.13]} speed={0.4} offset={i * 0.17} />
          <GamingChair
            position={[0, 0, 0.65]}
            rotation={Math.PI}
            accent={STATION_COLORS[i]}
          />
        </group>
      ))}
    </group>
  );
}

function Sofa() {
  return (
    <group position={[0, 0, 1.15]}>
      {/* main seat */}
      <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[2.6, 0.35, 0.95]} />
        <meshStandardMaterial color="#dfe7ee" roughness={0.9} />
      </mesh>
      {/* backrest */}
      <mesh castShadow position={[0, 0.62, 0.42]}>
        <boxGeometry args={[2.6, 0.55, 0.22]} />
        <meshStandardMaterial color="#d3dde6" roughness={0.9} />
      </mesh>
      {/* armrests */}
      {[-1.42, 1.42].map((x) => (
        <mesh key={x} castShadow position={[x, 0.42, 0.05]}>
          <boxGeometry args={[0.25, 0.62, 1.0]} />
          <meshStandardMaterial color="#d3dde6" roughness={0.9} />
        </mesh>
      ))}
      {/* cushions */}
      {[-0.7, 0.15, 0.95].map((x, i) => (
        <mesh key={x} castShadow position={[x, 0.52, 0.32]} rotation={[0.15, 0, (i - 1) * 0.05]}>
          <boxGeometry args={[0.42, 0.4, 0.14]} />
          <meshStandardMaterial
            color={["#7dd3fc", "#c4b5fd", "#6ee7b7"][i]}
            roughness={0.95}
          />
        </mesh>
      ))}
      {/* L-part (chaise) */}
      <mesh castShadow receiveShadow position={[-1.85, 0.28, -0.45]}>
        <boxGeometry args={[0.9, 0.35, 1.9]} />
        <meshStandardMaterial color="#dfe7ee" roughness={0.9} />
      </mesh>
    </group>
  );
}

function CoffeeTable() {
  return (
    <group position={[0.2, 0, -0.35]}>
      <mesh castShadow position={[0, 0.36, 0]}>
        <boxGeometry args={[1.1, 0.04, 0.6]} />
        <meshPhysicalMaterial
          color="#dff4ff"
          transparent
          opacity={0.45}
          roughness={0.1}
          transmission={0.6}
        />
      </mesh>
      {[
        [-0.48, -0.24],
        [0.48, -0.24],
        [-0.48, 0.24],
        [0.48, 0.24],
      ].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 0.17, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.34, 8]} />
          <meshStandardMaterial color={WOOD_DARK} />
        </mesh>
      ))}
      {/* controllers on the table */}
      <mesh castShadow position={[-0.2, 0.41, 0]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.16, 0.04, 0.11]} />
        <meshStandardMaterial color="#f2f6fa" />
      </mesh>
      <mesh castShadow position={[0.18, 0.41, 0.08]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.16, 0.04, 0.11]} />
        <meshStandardMaterial color="#1c2128" />
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0.3]}>
      <circleGeometry args={[1.7, 48]} />
      <meshStandardMaterial color="#eef4f9" roughness={1} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} color="#eaf4ff" />
      <directionalLight
        castShadow
        position={[-4, 5, 3]}
        intensity={1.6}
        color="#fff8ec"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.5, 20]} />
      </directionalLight>
      <pointLight position={[0, 2.4, 0]} intensity={12} color="#eaf6ff" distance={8} />
      <pointLight position={[0, 1.5, -2]} intensity={6} color="#7dd3fc" distance={5} />

      <Room />
      <TVSetup />
      <GamingDesk />
      <Sofa />
      <CoffeeTable />
      <Rug />
      <Plant position={[-3.5, 0, -2]} scale={1.4} />
      <Plant position={[2.3, 0, 2.1]} scale={1.2} />
      <Plant position={[-3.4, 0, 1.9]} scale={1} />
      <AirCon position={[2.2, 2.35, -D / 2 + 0.12]} />

      <Label position={[0, 2.5, -2.3]} text="大型テレビ &amp; RGBライト" />
      <Label position={[-1.15, 1.15, -2]} text="PS5" />
      <Label position={[1.1, 1.0, -2]} text="Nintendo Switch" />
      <Label position={[3.1, 1.8, 0]} text="ゲーミングデスクトップPC × 5" />
      <Label position={[0, 1.3, 1.4]} text="ソファ" />
      <Label position={[-3.5, 1.3, -2]} text="観葉植物" />

      <ContactShadows position={[0, 0.01, 0]} opacity={0.3} scale={12} blur={2.2} far={3} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        target={[0, 1, 0]}
        minDistance={3.2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={0.35}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function LivingRoomScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [5.2, 3.6, 5.6], fov: 45 }}
      className="!touch-none"
    >
      <color attach="background" args={["#eaf5ff"]} />
      <fog attach="fog" args={["#eaf5ff", 14, 26]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
