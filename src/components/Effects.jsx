import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { folder, useControls } from "leva";

const Effects = () => {
  const { lumSmooth, lumThres, bloomRadius } = useControls("Effects", {
    bloom: folder({
      lumSmooth: {
        value: 0.025,
        min: 0,
        max: 1,
        step: 0.01,
      },
      lumThres: {
        value: 0.9,
        min: 0,
        max: 10,
        step: 0.01,
      },
      bloomRadius: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
  });
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceSmoothing={lumSmooth}
        luminanceThreshold={lumThres}
        radius={bloomRadius}
      />
    </EffectComposer>
  );
};
export default Effects;
