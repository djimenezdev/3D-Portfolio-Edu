/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/models/me.glb -o src/components/Avatar.jsx -k -r public
*/

import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Avatar(props) {
  const { nodes, materials } = useGLTF("/models/me.glb");
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: walkAnimation } = useFBX("/animations/Walking.fbx");
  const { animations: landingAnimation } = useFBX("/animations/Landing.fbx");

  const group = useRef();
  const landing = useRef(false);
  idleAnimation[0].name = "Idle";
  walkAnimation[0].name = "Walking";
  landingAnimation[0].name = "Landing";

  const { actions } = useAnimations(
    [idleAnimation[0], walkAnimation[0], landingAnimation[0]],
    group
  );
  const [animation, setAnimation] = useState("Landing");

  const scrollData = useScroll();
  const lastScroll = useRef(0);

  // trigger this one on load and when switching between modes
  useEffect(() => {
    actions["Landing"]
      .reset()
      .setLoop(THREE.LoopOnce)
      .startAt(1)
      .fadeIn(0.5)
      .play()
      .crossFadeTo(actions["Idle"], 3)
      .play();
    return () => {
      actions["Landing"].fadeOut(0.5);
      actions["Idle"].fadeOut(0.5);
    };
  }, []);

  useEffect(() => {
    if (animation === "Landing") return;
    if (!landing.current) {
      landing.current = true;
    }
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].fadeOut(0.5);
    };
  }, [animation]);

  useFrame(() => {
    const scrollDelta = scrollData.offset - lastScroll.current;
    let rotationTarget = 0;
    if (Math.abs(scrollDelta) > 0.00001) {
      setAnimation("Walking");
      if (scrollDelta > 0) {
        rotationTarget = !props.isMobile ? 0 : Math.PI / 2;
      } else {
        rotationTarget = !props.isMobile ? Math.PI : -Math.PI / 2;
      }
    } else {
      if (landing.current) {
        setAnimation("Idle");
      }
    }
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      rotationTarget,
      0.1
    );
    lastScroll.current = scrollData.offset;
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/me.glb");
useFBX.preload("/animations/Idle.fbx");
useFBX.preload("/animations/Walking.fbx");
