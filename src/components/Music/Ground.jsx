import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useControls } from "leva";

const Ground = () => {
  const [floor, normal] = useTexture([
    "/textures/SurfaceImperfections003_1K_var1.jpg",
    "/textures/SurfaceImperfections003_1K_Normal.jpg",
  ]);

  const {
    blurWidth,
    blurHeight,
    mirror,
    mixBlur,
    mixStrength,
    mixContrast,
    depthScale,
    minDepthThreshold,
    maxDepthThreshold,
    depthToBlurRatioBias,
  } = useControls("ground", {
    blurWidth: {
      value: 442.57,
      min: 0,
      max: 1000,
      step: 0.01,
    },
    blurHeight: {
      value: 159.83,
      min: 0,
      max: 1000,
      step: 0.01,
    },
    mirror: {
      value: 0.65,
      min: 0,
      max: 1,
      step: 0.01,
    },
    mixBlur: {
      value: 100,
      min: 0,
      max: 1000,
      step: 0.01,
    },
    mixStrength: {
      value: 17.4,
      min: 0,
      max: 100,
      step: 0.01,
    },
    mixContrast: {
      value: 1,
      min: 0,
      max: 100,
      step: 0.01,
    },
    depthScale: {
      value: 0,
      min: 0,
      max: 100,
      step: 0.01,
    },
    minDepthThreshold: {
      value: 0,
      min: 0,
      max: 100,
      step: 0.01,
    },
    maxDepthThreshold: {
      value: 0.9,
      min: 0,
      max: 100,
      step: 0.01,
    },
    depthToBlurRatioBias: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        color="#322e2e"
        metalness={0.4}
        roughness={1}
        roughnessMap={floor}
        normalMap={normal}
        normalScale={[2, 2]}
        blur={[blurWidth, blurHeight]}
        resolution={1024}
        mirror={mirror}
        mixBlur={mixBlur}
        mixStrength={mixStrength}
        mixContrast={mixContrast} // Contrast of the reflections
        depthScale={depthScale} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={minDepthThreshold} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={maxDepthThreshold} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={depthToBlurRatioBias} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
      />
    </mesh>
  );
};
export default Ground;
