import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Float, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

function LoadedModel({
  assetPath,
  modelScale,
  modelPosition,
  modelRotation,
  floatStrength,
  trackEyes,
  followStrength,
}) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(assetPath);
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const eyeTargetsRef = useRef([]);
  const headTargetsRef = useRef([]);

  useEffect(() => {
    const eyeTargets = [];
    const headTargets = [];

    clonedScene.traverse((obj) => {
      if (obj.name && /eye|iris|pupil/i.test(obj.name)) {
        eyeTargets.push({
          object: obj,
          rotationX: obj.rotation.x,
          rotationY: obj.rotation.y,
        });
      }

      if (obj.name && /head|neck/i.test(obj.name)) {
        headTargets.push({
          object: obj,
          rotationX: obj.rotation.x,
          rotationY: obj.rotation.y,
        });
      }
    });

    eyeTargetsRef.current = eyeTargets;
    headTargetsRef.current = headTargets;
  }, [clonedScene]);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.x +=
      (state.pointer.y * followStrength - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y +=
      (modelRotation[1] + state.pointer.x * (followStrength + 0.08) - groupRef.current.rotation.y) * 0.05;
    groupRef.current.position.x +=
      (modelPosition[0] + state.pointer.x * 0.12 - groupRef.current.position.x) * 0.035;

    if (trackEyes) {
      eyeTargetsRef.current.forEach((entry) => {
        entry.object.rotation.y = entry.rotationY + state.pointer.x * 0.22;
        entry.object.rotation.x = entry.rotationX - state.pointer.y * 0.16;
      });

      headTargetsRef.current.forEach((entry) => {
        entry.object.rotation.y = entry.rotationY + state.pointer.x * 0.12;
        entry.object.rotation.x = entry.rotationX - state.pointer.y * 0.08;
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={floatStrength}>
      <group ref={groupRef} position={modelPosition} rotation={modelRotation}>
        <Center>
          <primitive object={clonedScene} scale={modelScale} />
        </Center>
      </group>
    </Float>
  );
}

export default function ModelStage({
  assetPath,
  className = "",
  modelScale,
  modelPosition,
  modelRotation,
  floatStrength = 0.12,
  followStrength = 0.16,
  cameraPosition = [0, 0.4, 7.8],
  cameraFov = 30,
  shadowY = -2.45,
  shadowScale = 10,
  trackEyes = false,
}) {
  const [assetReady, setAssetReady] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch(assetPath, { method: "HEAD" })
      .then((response) => {
        if (mounted) {
          setAssetReady(response.ok);
        }
      })
      .catch(() => {
        if (mounted) {
          setAssetReady(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [assetPath]);

  if (assetReady !== true) {
    return <div className={`model-stage model-stage-fallback ${className}`} />;
  }

  return (
    <div className={`model-stage ${className}`}>
      <Canvas camera={{ position: cameraPosition, fov: cameraFov }} dpr={[1, 2]}>
        <ambientLight intensity={1.45} />
        <directionalLight position={[5, 7, 5]} intensity={2.2} color="#fff7ef" />
        <pointLight position={[-4, 2, 4]} intensity={1.4} color="#bbf7ff" />
        <pointLight position={[3, -1, 5]} intensity={1.2} color="#f4acff" />
        <Suspense fallback={null}>
          <LoadedModel
            assetPath={assetPath}
            modelScale={modelScale}
            modelPosition={modelPosition}
            modelRotation={modelRotation}
            floatStrength={floatStrength}
            trackEyes={trackEyes}
            followStrength={followStrength}
          />
        </Suspense>
        <ContactShadows
          position={[0, shadowY, 0]}
          opacity={0.35}
          scale={shadowScale}
          blur={2.5}
          far={4.2}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/nurse-hero.glb");
useGLTF.preload("/models/nurse-desk.glb");
