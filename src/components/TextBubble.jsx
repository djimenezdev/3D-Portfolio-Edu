/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { Text, useGLTF } from "@react-three/drei";

export function TextBubble(props) {
  const { nodes, materials } = useGLTF("/models/textBubble.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TextBubble.geometry}
        material={materials["Material.001"]}
        scale={[1.5, 0.8, 0.05]}
      />
      <Text
        font="/fonts/RobotoSlab-Regular.ttf"
        material-color="red"
        characters="bo!"
        position-z={0.055}
      >
        Boo!
        <meshBasicMaterial color="#4F09C6" toneMapped={false} />
      </Text>
    </group>
  );
}

useGLTF.preload("/models/textBubble.glb");
