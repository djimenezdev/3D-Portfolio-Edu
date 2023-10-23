import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { config } from "./config";
import { MotionConfig } from "framer-motion";
import Interface from "./components/Interface";
import Menu from "./components/Menu";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense } from "react";
import CanvasSettings from "./components/CanvasSettings";
import Music from "./components/Music";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva
        hidden={
          !Boolean(
            Number(new URLSearchParams(window.location.search).get("debug"))
          )
        }
      />
      <LoadingScreen />
      <Canvas camera={{ position: [0, 0.5, 5], fov: 42 }}>
        <CanvasSettings />
        <ScrollControls
          pages={config.sections.length}
          damping={0.1}
          maxSpeed={0.2}
        >
          <MotionConfig
            transition={{
              duration: 0.6,
            }}
          >
            <Suspense fallback={null}>
              <group position-y={-1}>
                <Experience />
              </group>
            </Suspense>
          </MotionConfig>
          <Scroll html>
            <MotionConfig
              transition={{
                duration: 1,
              }}
            >
              <Interface />
            </MotionConfig>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu />
      <Music />
    </>
  );
}

export default App;
