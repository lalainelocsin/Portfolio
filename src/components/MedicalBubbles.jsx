import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Html } from "@react-three/drei";
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
  { title: "EHR", subtitle: "Patient charts", icon: FaFileWaveform, color: "#8fdcff", shell: "#f7fbff", position: [-4.3, 1.8, -0.8], size: 1.05 },
  { title: "SOAP", subtitle: "Clinical notes", icon: FaNotesMedical, color: "#ffd86d", shell: "#fff9f1", position: [-2.15, 2.85, -0.3], size: 0.92 },
  { title: "Telehealth", subtitle: "Virtual support", icon: FaLaptopMedical, color: "#ffb0ef", shell: "#fff8ff", position: [0.15, 3.1, -0.2], size: 0.96 },
  { title: "Vitals", subtitle: "Heart & BP", icon: FaHeartPulse, color: "#8fdcff", shell: "#f9fbff", position: [2.75, 2.45, -0.4], size: 1.02 },
  { title: "Intake", subtitle: "Forms & triage", icon: FaHospitalUser, color: "#73ffd8", shell: "#f5fffd", position: [4.45, 1.15, -0.9], size: 0.92 },
  { title: "Stetho", subtitle: "Assessment", icon: FaStethoscope, color: "#ffd86d", shell: "#fffdf6", position: [-4.65, -0.55, -0.2], size: 0.98 },
  { title: "Claims", subtitle: "Benefits follow-up", icon: FaShieldHeart, color: "#cda4ff", shell: "#f9f6ff", position: [-2.25, 0.3, 0.6], size: 1.08 },
  { title: "Calendar", subtitle: "Scheduling", icon: FaCalendarCheck, color: "#8fdcff", shell: "#f6fbff", position: [0.15, 0.85, 0.72], size: 1.16 },
  { title: "Rx", subtitle: "Medication", icon: FaPrescriptionBottleMedical, color: "#ffb0ef", shell: "#fff7fc", position: [2.45, 0.2, 0.58], size: 1.02 },
  { title: "Labs", subtitle: "Results support", icon: FaMicroscope, color: "#73ffd8", shell: "#f5fffd", position: [4.7, -0.75, -0.1], size: 0.94 },
  { title: "Referrals", subtitle: "Provider routing", icon: FaUserDoctor, color: "#8fdcff", shell: "#f7fbff", position: [-3.35, -2.2, -0.7], size: 1.02 },
  { title: "Admin", subtitle: "Process flow", icon: FaKitMedical, color: "#ffd86d", shell: "#fffbf3", position: [-0.95, -2.55, -0.25], size: 1.06 },
];

function Bubble({ item, index, positionsRef, velocitiesRef }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    const deltaFactor = Math.min(delta * 60, 1.6);
    const pointer = new THREE.Vector3(state.pointer.x * 5.2, state.pointer.y * 3.4, 0.6);
    const position = positionsRef.current[index];
    const velocity = velocitiesRef.current[index];
    const home = item.position;

    velocity.x += (home[0] - position.x) * 0.014 * deltaFactor;
    velocity.y += (home[1] - position.y) * 0.014 * deltaFactor;
    velocity.z += (home[2] - position.z) * 0.012 * deltaFactor;

    const away = position.clone().sub(pointer);
    const distance = away.length();

    if (distance < 2.4) {
      away.normalize();
      velocity.addScaledVector(away, (2.4 - distance) * 0.05 * deltaFactor);
    }

    for (let i = 0; i < positionsRef.current.length; i += 1) {
      if (i === index) {
        continue;
      }

      const other = positionsRef.current[i];
      const deltaPos = position.clone().sub(other);
      const minDistance = item.size + bubbleItems[i].size + 0.3;
      const currentDistance = deltaPos.length();

      if (currentDistance > 0 && currentDistance < minDistance) {
        deltaPos.normalize();
        velocity.addScaledVector(deltaPos, (minDistance - currentDistance) * 0.014 * deltaFactor);
      }
    }

    velocity.multiplyScalar(0.92);
    position.addScaledVector(velocity, deltaFactor * 0.26);

    ref.current.position.copy(position);
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.45 + index) * 0.08;
    ref.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.38 + index) * 0.12;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.16}>
      <group ref={ref} position={item.position}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[item.size, 56, 56]} />
          <meshPhysicalMaterial
            color={item.shell}
            roughness={0.12}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transmission={0.04}
            emissive={item.color}
            emissiveIntensity={0.03}
          />
        </mesh>

        <Html center transform sprite distanceFactor={9.5} position={[0, 0.04, item.size + 0.05]}>
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

function Cluster() {
  const groupRef = useRef(null);
  const positionsRef = useRef(bubbleItems.map((item) => new THREE.Vector3(...item.position)));
  const velocitiesRef = useRef(bubbleItems.map(() => new THREE.Vector3()));
  const items = useMemo(() => bubbleItems, []);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += (state.pointer.x * 0.18 - groupRef.current.rotation.y) * 0.028;
    groupRef.current.rotation.x += (state.pointer.y * 0.08 - groupRef.current.rotation.x) * 0.028;
  });

  return (
    <group ref={groupRef} rotation={[0.06, -0.16, 0]}>
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
      <Canvas camera={{ position: [0, 0.35, 12.5], fov: 28 }} dpr={[1, 2]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 7, 5]} intensity={1.65} color="#fff7ef" />
        <pointLight color="#d9a0ff" position={[-5, 1, 6]} intensity={1.05} />
        <pointLight color="#88e3ff" position={[5, 2, 5]} intensity={0.85} />
        <Cluster />
        <ContactShadows
          position={[0, -3.7, 0]}
          opacity={0.2}
          scale={15}
          blur={2.8}
          far={4.5}
        />
      </Canvas>
    </div>
  );
}
