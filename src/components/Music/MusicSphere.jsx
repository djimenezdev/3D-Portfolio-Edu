import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { damp } from "maath/easing";

const MusicSphere = (props) => {
  const sphereRef = useRef();
  let [i] = useState(0);
  useFrame((_state, delta) => {
    if (props.analyzerRef.current) {
      let dataArray = [];
      let avgFrequency = 0;
      const isPlaying = props.soundRef.current.playing();
      if (props.soundRef.current.playing()) {
        dataArray = new Uint8Array(props.analyzerRef.current.frequencyBinCount);
        props.analyzerRef.current.getByteFrequencyData(dataArray);
        avgFrequency =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      }

      damp(
        sphereRef.current.material._radius,
        "value",
        avgFrequency / 256 > 0.21 && isPlaying
          ? 1 - (avgFrequency / 256) * 0.7
          : avgFrequency / 256 < 0.21 && isPlaying
          ? 1 - (avgFrequency / 256) * 0.4
          : 1,
        0.1,
        delta
      ); // The avgFrequency is between 0 and 256, so we normalize it.
      damp(
        sphereRef.current.material._distort,
        "value",
        i % 2 === 0 && isPlaying ? 0.5 : i % 2 !== 0 && isPlaying ? 1.3 : 0,
        0.3,
        delta
      );
      if (isPlaying) {
        i++;
      } else {
        i = 0;
      }
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
