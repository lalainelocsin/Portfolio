import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import {
  FaCalendarCheck,
  FaFileWaveform,
  FaHeartPulse,
  FaHospitalUser,
  FaKitMedical,
  FaLaptopMedical,
  FaMicroscope,
  FaNotesMedical,
  FaPrescriptionBottleMedical,
  FaShieldHeart,
  FaStethoscope,
  FaUserDoctor,
} from "react-icons/fa6";
import * as THREE from "three";

const bubbleItems = [
  { title: "EHR", subtitle: "Patient charts", icon: FaFileWaveform, color: "#8fdcff", shell: "#f5d7df", position: [-3.2, 1.45, -0.55], size: 0.96 },
  { title: "SOAP", subtitle: "Clinical notes", icon: FaNotesMedical, color: "#ffd86d", shell: "#f3d0d9", position: [-1.35, 2.45, -0.22], size: 0.9 },
  { title: "Telehealth", subtitle: "Virtual support", icon: FaLaptopMedical, color: "#ffb0ef", shell: "#f4d6e0", position: [1.35, 2.45, -0.2], size: 0.95 },
  { title: "Vitals", subtitle: "Heart & BP", icon: FaHeartPulse, color: "#8fdcff", shell: "#f1d4de", position: [3.15, 1.45, -0.52], size: 0.98 },
  { title: "Stetho", subtitle: "Assessment", icon: FaStethoscope, color: "#ffd86d", shell: "#f7dde4", position: [-3.95, 0.05, -0.18], size: 0.98 },
  { title: "Claims", subtitle: "Benefits follow-up", icon: FaShieldHeart, color: "#cda4ff", shell: "#f2d4dd", position: [-1.95, 0.55, 0.52], size: 1.06 },
  { title: "Calendar", subtitle: "Scheduling", icon: FaCalendarCheck, color: "#8fdcff", shell: "#f3d8de", position: [0, 0.82, 0.66], size: 1.16 },
  { title: "Intake", subtitle: "Forms & triage", icon: FaHospitalUser, color: "#73ffd8", shell: "#f4dce4", position: [3.25, 0.45, 0.5], size: 0.98 },
  { title: "Rx", subtitle: "Medication", icon: FaPrescriptionBottleMedical, color: "#ffb0ef", shell: "#f3d2dd", position: [1.9, -0.28, 0.44], size: 1.02 },
  { title: "Labs", subtitle: "Results support", icon: FaMicroscope, color: "#73ffd8", shell: "#efd4dd", position: [4.0, -0.95, -0.05], size: 0.94 },
  { title: "Referrals", subtitle: "Provider routing", icon: FaUserDoctor, color: "#8fdcff", shell: "#f4dbe2", position: [-2.55, -1.72, -0.5], size: 1.0 },
  { title: "Admin", subtitle: "Process flow", icon: FaKitMedical, color: "#ffd86d", shell: "#f2cfd8", position: [0.25, -1.9, -0.22], size: 1.06 },
];

function Bubble({ item, index, positionsRef, velocitiesRef }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    const deltaFactor = Math.min(delta * 60, 1.6);
    const pointer = new THREE.Vector3(state.pointer.x * 4.8, state.pointer.y * 3.1, 0.6);
    const position = positionsRef.current[index];
    const velocity = velocitiesRef.current[index];
    const home = item.position;

    velocity.x += (home[0] - position.x) * 0.013 * deltaFactor;
    velocity.y += (home[1] - position.y) * 0.013 * deltaFactor;
    velocity.z += (home[2] - position.z) * 0.011 * deltaFactor;

    const away = position.clone().sub(pointer);
    const distance = away.length();

    if (distance < 2.25) {
      away.normalize();
      velocity.addScaledVector(away, (2.25 - distance) * 0.05 * deltaFactor);
    }

    for (let i = 0; i < positionsRef.current.length; i += 1) {
      if (i === index) {
        continue;
      }

      const other = positionsRef.current[i];
      const deltaPos = position.clone().sub(other);
      const minDistance = item.size + bubbleItems[i].size + 0.26;
      const currentDistance = deltaPos.length();

      if (currentDistance > 0 && currentDistance < minDistance) {
        deltaPos.normalize();
        velocity.addScaledVector(deltaPos, (minDistance - currentDistance) * 0.014 * deltaFactor);
      }
    }

    velocity.multiplyScalar(0.92);
    position.addScaledVector(velocity, deltaFactor * 0.24);

    ref.current.position.copy(position);
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.42 + index) * 0.08;
    ref.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.35 + index) * 0.12;
  });

  return (
    <Float speed={1.05} rotationIntensity={0.05} floatIntensity={0.16}>
      <group ref={ref} position={item.position}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[item.size, 56, 56]} />
          <meshPhysicalMaterial
            color={item.shell}
            roughness={0.15}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transmission={0.04}
            emissive={item.color}
            emissiveIntensity={0.04}
          />
        </mesh>

        <Html center transform sprite distanceFactor={9.1} position={[0, 0.04, item.size + 0.05]}>
          <div className="stack-bubble-ui">
            <span className="stack-bubble-icon" style={{ "--bubble-color": item.color }}>
              <item.icon />
            </span>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <small>{item.subtitle}</small>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function SoftClusterShadow() {
  return (
    <group position={[0, -3.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh scale={[2.15, 0.86, 1]}>
        <circleGeometry args={[4.2, 80]} />
        <meshBasicMaterial color="#030406" transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, 0.01, 0]} scale={[1.3, 0.42, 1]}>
        <circleGeometry args={[2.9, 80]} />
        <meshBasicMaterial color="#030406" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Cluster() {
  const groupRef = useRef(null);
  const positionsRef = useRef(bubbleItems.map((item) => new THREE.Vector3(...item.position)));
  const velocitiesRef = useRef(bubbleItems.map(() => new THREE.Vector3()));
  const items = useMemo(() => bubbleItems, []);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += (state.pointer.x * 0.13 - groupRef.current.rotation.y) * 0.026;
    groupRef.current.rotation.x += (state.pointer.y * 0.06 - groupRef.current.rotation.x) * 0.026;
  });

  return (
    <group ref={groupRef} rotation={[0.035, -0.06, 0]}>
      {items.map((item, index) => (
        <Bubble
          item={item}
          index={index}
          key={item.title}
          positionsRef={positionsRef}
          velocitiesRef={velocitiesRef}
        />
      ))}
    </group>
  );
}

export default function MedicalBubbles() {
  return (
    <div className="medical-bubbles-canvas">
      <Canvas
        camera={{ position: [0, 0.12, 13.4], fov: 27 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.08} />
        <directionalLight position={[5, 7, 5]} intensity={1.55} color="#fff7ef" />
        <pointLight color="#d9a0ff" position={[-5, 1, 6]} intensity={0.95} />
        <pointLight color="#88e3ff" position={[5, 2, 5]} intensity={0.8} />
        <Cluster />
        <SoftClusterShadow />
      </Canvas>
    </div>
  );
}
