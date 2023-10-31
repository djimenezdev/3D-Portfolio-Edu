import Ground from "./Ground";
import Effects from "../Effects";
import MusicPlayer from "./MusicPlayer";

const MusicExperience = () => {
  return (
    <>
      <Effects />
      <Ground />
      <MusicPlayer position={[1.4, 0.43, -1]} />
    </>
  );
};
export default MusicExperience;
