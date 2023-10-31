import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { damp } from "maath/easing";

const MusicSphere = (props) => {
  const sphereRef = useRef();
  let [i] = useState(0);
  useFrame((_state, delta) => {
    console.log(props.soundRef.current.playing());
    if (props.analyzerRef.current && props.soundRef.current.playing()) {
      const dataArray = new Uint8Array(
        props.analyzerRef.current.frequencyBinCount
      );
      props.analyzerRef.current.getByteFrequencyData(dataArray);

      const avgFrequency =
        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

      damp(
        sphereRef.current.material._radius,
        "value",
        avgFrequency / 256 > 0.21
          ? 1 - (avgFrequency / 256) * 0.7
          : 1 - (avgFrequency / 256) * 0.4,
        0.1,
        delta
      ); // The avgFrequency is between 0 and 256, so we normalize it.
      damp(
        sphereRef.current.material._distort,
        "value",
        i % 2 === 0 ? 0.5 : 1.3,
        0.3,
        delta
      );
      i++;
    } else {
      if (!props.soundRef.current.playing()) {
        damp(sphereRef.current.material._radius, "value", 1, 0.1, delta);
        damp(sphereRef.current.material._distort, "value", 0, 0.1, delta);
      }
    }
  });

  return (
    <>
      <mesh ref={sphereRef} position={[-1.5, 1.5, 1]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <MeshDistortMaterial
          opacity={0.8}
          transparent
          distort={0.4}
          speed={0}
          color={[15, 5, 1]}
          toneMapped={false}
        />
      </mesh>
    </>
  );
};
export default MusicSphere;
