import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { dampC } from "maath/easing";

const CanvasSettings = () => {
  const colorRef = useRef();

  useFrame((_state, delta) => {
    /* if (colorRef.current) {
      dampC(colorRef.current, "skyblue", 1, delta);
    } */
  });

  return (
    <>
      <color ref={colorRef} attach="background" args={["#f5f3ee"]} />
      <fog attach="fog" args={["#f5f3ee", 10, 50]} />
    </>
  );
};
export default CanvasSettings;
