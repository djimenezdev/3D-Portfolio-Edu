import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { dampC } from "maath/easing";
import { useAtom } from "jotai";
import { halloweenAtom } from "./Menu";
import { OrbitControls, useProgress } from "@react-three/drei";

const CanvasSettings = () => {
  const colorRef = useRef();
  const fogRef = useRef();
  const [themeIcon] = useAtom(halloweenAtom);
  const { active } = useProgress();

  useFrame((_state, delta) => {
    if (!colorRef.current || !fogRef.current) return;
    dampC(colorRef.current, themeIcon ? "#0B021A" : "#f5f3ee", 0.1, delta);
    dampC(fogRef.current.color, themeIcon ? "#0B021A" : "#f5f3ee", 0.1, delta);
  });

  return (
    <>
      <color ref={colorRef} attach="background" args={["#f5f3ee"]} />
      <fog ref={fogRef} attach="fog" args={["#f5f3ee", 10, 20]} />
      <ambientLight intensity={0.35} />
      <directionalLight intensity={0.5} position={[0, 2, 1]} />
    </>
  );
};
export default CanvasSettings;
