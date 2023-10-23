import { Text3D } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { config } from "../config";
import { sleeper } from "../helpers";

const SectionTitle = ({ children, ...props }) => {
  const titleRef = useRef();

  useEffect(() => {
    const flickerInterval =
      children === config.home.subtitle
        ? setInterval(async () => {
            titleRef.current.material.emissiveIntensity = 1;
            await sleeper(100);
            titleRef.current.material.emissiveIntensity = 0;
            await sleeper(300);
            titleRef.current.material.emissiveIntensity = 2;
            await sleeper(200);
            titleRef.current.material.emissiveIntensity = 0.8;
            await sleeper(200);
            titleRef.current.material.emissiveIntensity = 2.3;
          }, 5000)
        : null;
    return () => {
      if (flickerInterval) {
        clearInterval(flickerInterval);
      }
    };
  }, []);

  return (
    <Text3D ref={titleRef} font="fonts/Inter_Bold.json" size={0.3} {...props}>
      {children}
      <meshStandardMaterial
        color={props.themeIcon ? "#ff704c" : "white"}
        emissive={props.themeIcon ? "#ff704c" : undefined}
        emissiveIntensity={props.themeIcon ? 2.3 : 0}
        toneMapped={false}
      />
    </Text3D>
  );
};
export default SectionTitle;
