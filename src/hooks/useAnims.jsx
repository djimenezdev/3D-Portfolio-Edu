import { useFBX } from "@react-three/drei";

const useAnims = () => {
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: walkAnimation } = useFBX("/animations/Walking.fbx");
  const { animations: landingAnimation } = useFBX("/animations/Landing.fbx");
  const { animations: punchAnimation } = useFBX("/animations/Punching Bag.fbx");
  return {
    idleAnimation,
    walkAnimation,
    landingAnimation,
    punchAnimation,
  };
};
export default useAnims;

useFBX.preload("/animations/Idle.fbx");
useFBX.preload("/animations/Walking.fbx");
useFBX.preload("/animations/Landing.fbx");
useFBX.preload("/animations/Punching Bag.fbx");
