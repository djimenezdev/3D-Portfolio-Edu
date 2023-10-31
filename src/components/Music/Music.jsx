import { Leva } from "leva";
import LoadingScreen from "../LoadingScreen";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MusicExperience from "./MusicExperience";
import MusicSettings from "./MusicSettings";
import MusicNav from "./MusicNav";
import { useProgress } from "@react-three/drei";

const Music = () => {
  const { active } = useProgress();
  return (
    <>
      {!active && <MusicNav />}
      <Leva
        hidden={
          !Boolean(
            Number(new URLSearchParams(window.location.search).get("debug"))
          )
        }
      />
      <LoadingScreen />
      <Canvas
        camera={{ position: [2, 0.5, 5], fov: 42 }}
        gl={{ alpha: false }}
        shadows
      >
        <MusicSettings />
        <Suspense fallback={null}>
          <group position-y={-1}>
            <MusicExperience />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
};
export default Music;
