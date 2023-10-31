import { RoundedBox } from "@react-three/drei";
import { Play } from "./Play";
import { useEffect, useRef, useState } from "react";
import MusicSphere from "./MusicSphere";
import { Pause } from "./Pause";

const MusicPlayer = (meshProps) => {
  const [playing, setPlaying] = useState(false);
  const soundRef = useRef();
  const analyzerRef = useRef();

  useEffect(() => {
    const onEnd = () => {
      setPlaying(false);
    };
    soundRef.current = new Howl({
      src: ["/music/halloween.mp3"],
      volume: 0.5,
      onplay: () => {
        analyzerRef.current = Howler.ctx.createAnalyser(); // Create an analyzer
        Howler.masterGain.connect(analyzerRef.current); // Connect Howler's masterGain to the analyzer
        analyzerRef.current.fftSize = 512;
      },
    });

    if (soundRef.current) {
      soundRef.current.on("end", onEnd);
    }

    return () => {
      soundRef.current.off("end", onEnd);
    };
  }, []);

  return (
    <>
      <MusicSphere soundRef={soundRef} analyzerRef={analyzerRef} />
      <group {...meshProps}>
        <RoundedBox
          onPointerOver={(e) => e.stopPropagation()}
          args={[1.5, 0.7, 1]} // Width, height, depth. Default is [1, 1, 1]
          radius={0.05} // Radius of the rounded corners. Default is 0.05
          smoothness={4} // The number of curve segments. Default is 4
          bevelSegments={10} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
          creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
        >
          <meshStandardMaterial color="#9a07a5" />
        </RoundedBox>
        <Play
          position={[0, 0, 0.5]}
          scale={0.25}
          playing={playing}
          setPlaying={setPlaying}
          soundRef={soundRef}
        />
        <Pause
          position={[-0.07, 0, 0.4]}
          scale={0.4}
          playing={playing}
          setPlaying={setPlaying}
          soundRef={soundRef}
        />
      </group>
    </>
  );
};
export default MusicPlayer;
