"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import { RGBStrip, Plant, AirCon, WOOD, WOOD_DARK } from "./furniture";

/* 2F free space: 4.2m wide (x), 5m deep (z), 2.5m tall */
const W = 4.2;
const D = 5;
const H = 2.5;

function Label({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return (
    <Html position={position} center distanceFactor={6} zIndexRange={[10, 0]}>
      <div className="pointer-events-none flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-[11px] font-bold text-emerald-800 shadow-[0_2px_12px_-2px_rgba(52,211,153,0.4)] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
        {text}
      </div>
    </Html>
  );
}

function Room() {
  return (
    <group>
      {/* wood floor */}
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
          <planeGeometry args={[0.014, D]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.9} />
        </mesh>
      ))}

      {/* back wall */}
      <mesh receiveShadow position={[0, H / 2, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.9} />
      </mesh>
      {/* left wall */}
      <mesh receiveShadow position={[-W / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f4f9ff" roughness={0.9} />
      </mesh>
      {/* right wall with a bright window */}
      <mesh receiveShadow position={[W / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial color="#f4f9ff" roughness={0.9} />
      </mesh>
      <group position={[W / 2 - 0.02, 1.5, -0.6]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 1.3]} />
          <meshStandardMaterial
            color="#dff2ff"
            emissive="#bfe6ff"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        {[-0.81, 0, 0.81].map((x) => (
          <mesh key={x} position={[x, 0, 0.01]}>
            <planeGeometry args={[0.06, 1.36]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
        <mesh position={[0, 0.66, 0.01]}>
          <planeGeometry args={[1.68, 0.06]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, -0.66, 0.01]}>
          <planeGeometry args={[1.68, 0.06]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* RGB LED strips along ceiling edges */}
      <RGBStrip position={[0, H - 0.06, -D / 2 + 0.05]} size={[W - 0.2, 0.05, 0.05]} offset={0.15} />
      <RGBStrip position={[-W / 2 + 0.05, H - 0.06, 0]} size={[0.05, 0.05, D - 0.2]} offset={0.55} />
    </group>
  );
}

function PingPongTable() {
  return (
    <group position={[0.35, 0, 0.55]}>
      {/* table top */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[1.25, 0.05, 2.1]} />
        <meshStandardMaterial color="#1f7fbf" roughness={0.5} />
      </mesh>
      {/* white edge lines */}
      {[-0.61, 0.61].map((x) => (
        <mesh key={`x${x}`} position={[x, 0.726, 0]}>
          <boxGeometry args={[0.025, 0.004, 2.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {[-1.04, 1.04].map((z) => (
        <mesh key={`z${z}`} position={[0, 0.726, z]}>
          <boxGeometry args={[1.25, 0.004, 0.025]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* center line */}
      <mesh position={[0, 0.726, 0]}>
        <boxGeometry args={[0.02, 0.004, 2.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* net */}
      <mesh position={[0, 0.79, 0]}>
        <boxGeometry args={[1.35, 0.13, 0.015]} />
        <meshStandardMaterial color="#e8f1f8" transparent opacity={0.75} />
      </mesh>
      {[-0.67, 0.67].map((x) => (
        <mesh key={`n${x}`} castShadow position={[x, 0.77, 0]}>
          <boxGeometry args={[0.03, 0.16, 0.03]} />
          <meshStandardMaterial color="#2a2f38" />
        </mesh>
      ))}
      {/* legs */}
      {[
        [-0.5, -0.85],
        [0.5, -0.85],
        [-0.5, 0.85],
        [0.5, 0.85],
      ].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 0.34, z]}>
          <boxGeometry args={[0.06, 0.68, 0.06]} />
          <meshStandardMaterial color="#3a4150" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* paddles */}
      <group position={[-0.3, 0.74, 0.7]} rotation={[0, 0.5, 0]}>
        <mesh castShadow rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.015, 20]} />
          <meshStandardMaterial color="#c0392b" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.13]}>
          <boxGeometry args={[0.035, 0.015, 0.1]} />
          <meshStandardMaterial color={WOOD_DARK} />
        </mesh>
      </group>
      <group position={[0.35, 0.74, -0.75]} rotation={[0, -2.2, 0]}>
        <mesh castShadow rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.015, 20]} />
          <meshStandardMaterial color="#1c2128" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0, 0.13]}>
          <boxGeometry args={[0.035, 0.015, 0.1]} />
          <meshStandardMaterial color={WOOD_DARK} />
        </mesh>
      </group>
      {/* ball */}
      <mesh castShadow position={[0.15, 0.745, 0.3]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
    </group>
  );
}

/* deterministic book rows (stable colors/heights, no Math.random) */
const BOOK_COLORS = ["#7dd3fc", "#c4b5fd", "#6ee7b7", "#fca5a5", "#fcd34d", "#93c5fd"];
const BOOK_ROWS = [0.38, 0.82, 1.26, 1.7];

function Bookshelf({
  position,
  rotation = 0,
  width = 1.1,
}: {
  position: [number, number, number];
  rotation?: number;
  width?: number;
}) {
  const bookCount = Math.floor(width / 0.09);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* open shelf: back panel + sides + top, books visible in front */}
      <mesh castShadow receiveShadow position={[0, 1, -0.13]}>
        <boxGeometry args={[width + 0.1, 2, 0.03]} />
        <meshStandardMaterial color="#f4f7fa" roughness={0.5} />
      </mesh>
      {[-(width / 2 + 0.025), width / 2 + 0.025].map((x) => (
        <mesh key={x} castShadow position={[x, 1, 0]}>
          <boxGeometry args={[0.05, 2, 0.3]} />
          <meshStandardMaterial color="#f4f7fa" roughness={0.5} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 2, 0]}>
        <boxGeometry args={[width + 0.1, 0.04, 0.3]} />
        <meshStandardMaterial color="#f4f7fa" roughness={0.5} />
      </mesh>
      {/* shelf boards */}
      {BOOK_ROWS.map((y) => (
        <mesh key={y} position={[0, y - 0.19, 0]}>
          <boxGeometry args={[width, 0.03, 0.28]} />
          <meshStandardMaterial color="#e3ebf2" roughness={0.6} />
        </mesh>
      ))}
      {/* books */}
      {BOOK_ROWS.map((y, r) =>
        Array.from({ length: bookCount }, (_, i) => {
          const h = 0.26 + ((i * 7 + r * 3) % 4) * 0.02;
          return (
            <mesh
              key={`${r}-${i}`}
              castShadow
              position={[-width / 2 + 0.07 + i * 0.09, y - 0.175 + h / 2 + 0.015, 0.01]}
              rotation={[0, 0, (i + r) % 5 === 4 ? 0.08 : 0]}
            >
              <boxGeometry args={[0.055, h, 0.19]} />
              <meshStandardMaterial
                color={BOOK_COLORS[(i * 3 + r) % BOOK_COLORS.length]}
                roughness={0.85}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

function BeanBag({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow scale={[1, 0.62, 1]} position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.38, 20, 16]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <mesh castShadow scale={[0.8, 0.45, 0.8]} position={[0, 0.42, -0.1]}>
        <sphereGeometry args={[0.3, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} color="#eaf4ff" />
      <directionalLight
        castShadow
        position={[4, 5, 3]}
        intensity={1.5}
        color="#fff8ec"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.5, 16]} />
      </directionalLight>
      <pointLight position={[0, 2.2, 0]} intensity={9} color="#eaf6ff" distance={7} />
      <pointLight position={[-1.5, 1.4, -1.8]} intensity={3} color="#a7f3d0" distance={4} />

      <Room />
      <PingPongTable />
      {/* bookshelves against the back wall */}
      <Bookshelf position={[-1.05, 0, -D / 2 + 0.18]} width={1.3} />
      <Bookshelf position={[0.55, 0, -D / 2 + 0.18]} width={1.3} />
      {/* reading corner */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-1.35, 0.008, 1.35]}>
        <circleGeometry args={[0.95, 40]} />
        <meshStandardMaterial color="#eef4f9" roughness={1} />
      </mesh>
      <BeanBag position={[-1.5, 0, 1.0]} color="#93c5fd" />
      <BeanBag position={[-1.1, 0, 1.8]} color="#c4b5fd" />
      <Plant position={[-1.75, 0, -1.6]} scale={1.2} />
      <Plant position={[1.7, 0, 2.05]} scale={1} />
      <AirCon position={[1.2, 2.15, -D / 2 + 0.12]} />

      <Label position={[0.35, 1.35, 0.55]} text="ミニ卓球台" />
      <Label position={[-0.25, 2.2, -2.3]} text="本棚（マンガ・ボードゲーム）" />
      <Label position={[-1.4, 0.95, 1.4]} text="読書コーナー" />
      <Label position={[-1.75, 1.5, -1.6]} text="観葉植物" />

      <ContactShadows position={[0, 0.01, 0]} opacity={0.3} scale={9} blur={2.2} far={2.5} />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        target={[0, 0.85, 0]}
        minDistance={2.4}
        maxDistance={8.5}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={0.35}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function FreeSpaceScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.8, 2.9, 4.4], fov: 45 }}
      className="!touch-none"
    >
      <color attach="background" args={["#eefaf4"]} />
      <fog attach="fog" args={["#eefaf4", 12, 22]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
