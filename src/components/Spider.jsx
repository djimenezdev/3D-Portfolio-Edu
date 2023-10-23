/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { Box, useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp } from "maath/easing";
import { Howl } from "howler";
import { halloweenMusic } from "./Music";

export const spiderManSound = new Howl({
  src: ["/music/spiderman.mp3"],
  volume: 0.5,
});

export function Spider(props) {
  const { nodes, materials } = useGLTF("/models/spider.glb");
  const web = useRef();
  const spider = useRef();
  const [hover, setHover] = useState(false);

  const webEndYVal = props["position-y"] - 0.135;
  const spiderGlow = new THREE.Color("#6CB6C1");
  useFrame((_state, delta) => {
    if (!web.current) return;
    web.current.scale.y = props.visible
      ? THREE.MathUtils.lerp(web.current.scale.y, 3, delta)
      : 1;
    // calculates the new y of web based on location of the top of it
    // uses the top of the web as the reference point to calc difference in position of top of web
    // when the web scales, so I take the difference to calc y so it looks like it's growing downward from same position
    const newHeight = 0.27 * web.current.scale.y;
    const newWebStart = newHeight / 2 + 0.27;
    const difference = newWebStart - 0.405;
    const newY = 0.27 - difference;
    web.current.position.y = newY;

    // now will do same but for bottom of web for spider pos calc
    const newWebEnd = newHeight / 2 + 0.27;
    const differenceEnd = newWebEnd - webEndYVal;
    const newYEnd = 0.27 - differenceEnd;
    spider.current.position.y = props.visible
      ? THREE.MathUtils.lerp(spider.current.position.y, newYEnd, delta)
      : 0;

    // make abdomen of spider glow when hovering like a radioactive spider
    materials["Material.001"].toneMapped = false;
    materials["Material.001"].emissive = spiderGlow;
    damp(
      materials["Material.001"],
      "emissiveIntensity",
      hover ? 3 : 0,
      0.1,
      delta
    );
  });

  useCursor(props.visible && hover);

  useEffect(() => {
    const spiderListener = () => {
      const timeout = setTimeout(() => {
        spiderManSound.stop();
        clearTimeout(timeout);
      }, 4000);
    };
    spiderManSound.on("play", spiderListener);
    return () => {
      spiderManSound.off("play", spiderListener);
    };
  }, []);

  const spiderManMeme = () => {
    if (halloweenMusic.playing()) halloweenMusic.stop();
    if (props.visible && !spiderManSound.playing()) {
      spiderManSound.play();
    }
  };
  return (
    <>
      <Box
        visible={props.visible}
        ref={web}
        args={[0.03, 0.27, 0.01]}
        position-y={0.27}
        material-color="#fff"
      />
      <group
        ref={spider}
        {...props}
        dispose={null}
        onClick={spiderManMeme}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Spider.geometry}
          material={materials["Material.002"]}
          position={[0, 0, 0.649]}
          scale={0.35}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Abdomen.geometry}
            material={materials["Material.001"]}
            position={[0, 0, -1.853]}
            scale={1.429}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.eye.geometry}
            material={materials["Material.003"]}
            position={[0.5, 0.506, 0.562]}
            scale={0.143}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.eye_2.geometry}
            material={materials["Material.004"]}
            position={[-0.547, 0.506, 0.562]}
            scale={0.143}
          />
          <group
            position={[2.186, 0, -2.805]}
            rotation={[0, 0.781, 0]}
            scale={[0.857, 0.057, 0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube004.geometry}
              material={materials["Material.007"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube004_1.geometry}
              material={materials["Material.008"]}
            />
          </group>
          <group
            position={[-2.186, 0, -2.805]}
            rotation={[-Math.PI, 0.781, 0]}
            scale={[-0.857, -0.057, -0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube006.geometry}
              material={materials["Material.011"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube006_1.geometry}
              material={materials["Material.012"]}
            />
          </group>
          <group
            position={[-2.111, 0, -2.137]}
            rotation={[-Math.PI, 0.781, 0]}
            scale={[-0.726, -0.057, -0.049]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube007.geometry}
              material={materials["Material.013"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube007_1.geometry}
              material={materials["Material.014"]}
            />
          </group>
          <group
            position={[2.111, 0, -2.137]}
            rotation={[0, 0.781, 0]}
            scale={[0.726, 0.057, 0.049]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials["Material.015"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube008_1.geometry}
              material={materials["Material.016"]}
            />
          </group>
          <group
            position={[1.754, 0, -1.205]}
            rotation={[0, 0.741, 0]}
            scale={[0.286, 0.057, 0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube014.geometry}
              material={materials["Material.026"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube014_1.geometry}
              material={materials["Material.025"]}
            />
          </group>
          <group
            position={[-1.754, 0, -1.205]}
            rotation={[-Math.PI, 0.741, 0]}
            scale={[-0.286, -0.057, -0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube015.geometry}
              material={materials["Material.027"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube015_1.geometry}
              material={materials["Material.028"]}
            />
          </group>
          <group
            position={[1.445, 0, 0.082]}
            rotation={[-Math.PI, 0.741, 0]}
            scale={[0.286, 0.057, 0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube016.geometry}
              material={materials["Material.029"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube016_1.geometry}
              material={materials["Material.030"]}
            />
          </group>
          <group
            position={[-1.381, 0, 0.082]}
            rotation={[0, 0.741, 0]}
            scale={[-0.286, -0.057, -0.057]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube017.geometry}
              material={materials["Material.031"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube017_1.geometry}
              material={materials["Material.032"]}
            />
          </group>
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/models/spider.glb");