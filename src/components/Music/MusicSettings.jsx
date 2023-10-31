import { OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useRef, useState } from "react";
import * as THREE from "three";

const MusicSettings = () => {
  const [spotlight] = useState(() => new THREE.SpotLight("#fff"));
  const spotLightRef = useRef();
  const debug = Boolean(
    Number(new URLSearchParams(window.location.search).get("debug"))
  );
  useHelper(debug && spotLightRef, THREE.SpotLightHelper, "teal");

  const {
    intensity,
    distance,
    angle,
    penumbra,
    decay,
    spotPosX,
    spotPosY,
    spotPosZ,
    targetX,
    targetY,
    targetZ,
  } = useControls("SpotLight", {
    intensity: {
      value: 7.84,
      min: 0,
      max: 10,
      step: 0.001,
    },
    distance: {
      value: 29.7,
      min: 0,
      max: 100,
      step: 0.001,
    },
    angle: {
      value: 0.58,
      min: 0,
      max: 1,
      step: 0.001,
    },
    penumbra: {
      value: 0.26,
      min: 0,
      max: 1,
      step: 0.001,
    },
    decay: {
      value: 0.53,
      min: 0,
      max: 2,
      step: 0.001,
    },
    spotPosX: {
      value: 1.4,
      min: -100,
      max: 100,
      step: 0.001,
    },
    spotPosY: {
      value: 2.07,
      min: -100,
      max: 100,
      step: 0.001,
    },
    spotPosZ: {
      value: 0.11,
      min: -100,
      max: 100,
      step: 0.001,
    },
    targetX: {
      value: 6.48,
      min: -100,
      max: 100,
      step: 0.001,
    },
    targetY: {
      value: -91.66,
      min: -100,
      max: 100,
      step: 0.001,
    },
    targetZ: {
      value: -50.8,
      min: -100,
      max: 100,
      step: 0.001,
    },
  });
  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 15, 20]} />
      <ambientLight intensity={0.8} />

      <group>
        <primitive
          ref={spotLightRef}
          object={spotlight}
          intensity={intensity}
          penumbra={penumbra}
          position={[spotPosX, spotPosY, spotPosZ]}
          distance={distance}
          angle={angle}
          decay={decay}
          color="#a601e1"
          castShadow
        />
        <primitive
          object={spotlight.target}
          position={[targetX, targetY, targetZ]}
        />
      </group>
      {/* <OrbitControls /> */}
    </>
  );
};

export default MusicSettings;
