"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { POSTER_FLEET, deriveTerm, type PosterCar } from "@/content/media";
import { useWebglHealth } from "@/lib/use-webgl-health";

const DOWN_MIN = 180000;
const DOWN_MAX = 680000;
const INST_MIN = 7000;
const INST_MAX = 21000;
const X_SPAN = 3.2;
const Y_SPAN = 1.9;
const Z_STEP = 1.35;

const RAIL_COLORS = ["#e2723a", "#e2c23a", "#7ab8e0", "#c98be0", "#8bd18f", "#e07a9d"];

function toX(down: number) {
  return ((down - DOWN_MIN) / (DOWN_MAX - DOWN_MIN)) * X_SPAN * 2 - X_SPAN;
}
function toY(inst: number) {
  return ((inst - INST_MIN) / (INST_MAX - INST_MIN)) * Y_SPAN * 2 - Y_SPAN;
}

function instalmentAt(car: PosterCar, down: number) {
  const [a, b] = car.pairs;
  const t = (down - a.down) / (b.down - a.down);
  return a.instalment + t * (b.instalment - a.instalment);
}

function Rail({ car, index, caliperDown }: { car: PosterCar; index: number; color: string; caliperDown: number }) {
  const z = (index - (POSTER_FLEET.length - 1) / 2) * Z_STEP;
  const [a, b] = car.pairs;
  const full = useMemo(() => {
    const pts: [number, number][] = [
      [DOWN_MIN, instalmentAt(car, DOWN_MIN)],
      [DOWN_MAX, instalmentAt(car, DOWN_MAX)],
    ];
    return pts.map(([d, i]) => new THREE.Vector3(toX(d), toY(i), z));
  }, [car, z]);
  const solid = useMemo(() => {
    const dLo = Math.min(a.down, b.down);
    const dHi = Math.max(a.down, b.down);
    return [dLo, dHi].map((d) => new THREE.Vector3(toX(d), toY(instalmentAt(car, d)), z));
  }, [a.down, b.down, car, z]);
  const markers = useMemo(
    () => car.pairs.map((p) => new THREE.Vector3(toX(p.down), toY(p.instalment), z)),
    [car.pairs, z],
  );
  const color = RAIL_COLORS[index % RAIL_COLORS.length];
  const caliperY = toY(instalmentAt(car, caliperDown));

  return (
    <group>
      <Line points={full} color={color} transparent opacity={0.28} lineWidth={1} dashed dashSize={0.06} gapSize={0.07} />
      <Line points={solid} color={color} lineWidth={2.4} />
      {markers.map((m, i) => (
        <mesh key={i} position={m}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[toX(caliperDown), caliperY, z]}>
        <sphereGeometry args={[0.05, 14, 14]} />
        <meshBasicMaterial color="#fdc941" toneMapped={false} />
      </mesh>
    </group>
  );
}

function CaliperPlane({ down }: { down: number }) {
  const x = toX(down);
  const depth = Z_STEP * POSTER_FLEET.length;
  return (
    <mesh position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[depth, Y_SPAN * 2.4]} />
      <meshBasicMaterial color="#fdc941" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Rig({ dragRef }: { dragRef: React.MutableRefObject<number> }) {
  const angle = useRef(0.5);
  useFrame((state, dt) => {
    angle.current += (dragRef.current - angle.current) * Math.min(1, dt * 3);
    const idle = state.clock.elapsedTime * 0.05;
    const a = angle.current + Math.sin(idle) * 0.06;
    const radius = 8.5;
    state.camera.position.x = Math.sin(a) * radius;
    state.camera.position.z = Math.cos(a) * radius;
    state.camera.position.y = 1.3;
    state.camera.lookAt(0, -0.1, 0);
  });
  return null;
}

function Scene({ caliperDown, dragRef }: { caliperDown: number; dragRef: React.MutableRefObject<number> }) {
  return (
    <>
      <Rig dragRef={dragRef} />
      <CaliperPlane down={caliperDown} />
      {POSTER_FLEET.map((car, i) => (
        <Rail key={car.id} car={car} index={i} color={RAIL_COLORS[i % RAIL_COLORS.length]} caliperDown={caliperDown} />
      ))}
    </>
  );
}

export function Rails({
  caliperLabel,
  caliperReadout,
}: {
  caliperLabel: string;
  caliperReadout: string;
}) {
  const [ready, setReady] = useState<boolean | null>(null);
  const [caliperDown, setCaliperDown] = useState(400000);
  const { lost, bind } = useWebglHealth();
  const dragRef = useRef(0.5);
  const hostRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("webgl2") || c.getContext("webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(!!ctx);
    } catch {
      setReady(false);
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const onDown = () => { dragging.current = true; };
    const onUp = () => { dragging.current = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const rect = host.getBoundingClientRect();
      const t = (e.clientX - rect.left) / rect.width;
      dragRef.current = 0.5 + (t - 0.5) * 2.2;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const predictions = POSTER_FLEET.map((car) => instalmentAt(car, caliperDown));
  const lo = Math.round(Math.min(...predictions)).toLocaleString();
  const hi = Math.round(Math.max(...predictions)).toLocaleString();
  const readout = caliperReadout.replace("{lo}", lo).replace("{hi}", hi);

  return (
    <div>
      <div ref={hostRef} className="rails-host relative aspect-square w-full min-w-0 cursor-grab overflow-hidden rounded-sm bg-panel active:cursor-grabbing sm:aspect-[16/9]">
        {ready && !lost ? (
          <Canvas camera={{ position: [0, 1.3, 8.5], fov: 34 }} dpr={[1, 1.5]} onCreated={({ gl }) => bind(gl.domElement)}>
            <Scene caliperDown={caliperDown} dragRef={dragRef} />
          </Canvas>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="fine text-muted">WebGL unavailable — see the table below for the same figures.</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="label mb-2 tnum">{caliperLabel}: {caliperDown.toLocaleString()} EGP</p>
        <input
          type="range"
          min={DOWN_MIN}
          max={DOWN_MAX}
          step={5000}
          value={caliperDown}
          onChange={(e) => setCaliperDown(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <p className="fine mt-2 text-muted">{readout}</p>
      </div>
    </div>
  );
}

export { deriveTerm };
