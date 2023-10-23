import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { halloweenAtom } from "./Menu";
import { Howl } from "howler";
import { spiderManSound } from "./Spider";

export const halloweenMusic = new Howl({
  src: ["/music/halloween.mp3"],
  volume: 0.5,
});

const Music = () => {
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);
  const [themeIcon] = useAtom(halloweenAtom);

  const controlMusic = () => {
    setPlay((prev) => !prev);
    if (spiderManSound.playing()) spiderManSound.stop();
    if (halloweenMusic.playing()) {
      halloweenMusic.pause();
    } else {
      halloweenMusic.play();
    }
  };

  useEffect(() => {
    const onEnd = () => {
      setPlay(false);
    };
    halloweenMusic.on("end", onEnd);
    return () => {
      halloweenMusic.off("end", onEnd);
    };
  }, []);

  return (
    <motion.div
      className="music__box"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={controlMusic}
      style={{ pointerEvents: themeIcon ? "all" : "none" }}
      initial={{
        opacity: 0,
      }}
      animate={{
        background: hover ? "#ff704c" : "#08060F00",
        opacity: themeIcon ? 1 : 0,
      }}
    >
      <motion.svg
        style={{ pointerEvents: play ? "none" : "all" }}
        animate={{
          opacity: play ? 0 : 1,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        {/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
        <motion.path
          fill="#ff704c"
          animate={{
            fill: hover ? "#fff" : "#ff704c",
          }}
          d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"
        />
      </motion.svg>
      <motion.svg
        initial={{
          opacity: 0,
        }}
        onClick={() => setPlay(true)}
        style={{ pointerEvents: !play ? "none" : "all" }}
        animate={{
          opacity: !play ? 0 : 1,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        {/* <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
        <motion.path
          fill="#ff704c"
          animate={{
            fill: hover ? "#fff" : "#ff704c",
          }}
          d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
        />
      </motion.svg>
    </motion.div>
  );
};
export default Music;
