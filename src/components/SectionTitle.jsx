import { Text3D } from "@react-three/drei";
import { useRef, useState } from "react";
import { config } from "../config";
import { sleeper } from "../helpers";
import { useFrame } from "@react-three/fiber";

const SectionTitle = ({ children, ...props }) => {
  const titleRef = useRef();

  let [flickerInterval, setFlickerInterval] = useState(null);
  useFrame(() => {
    if (!props.themeIcon && children === config.home.subtitle) {
      clearInterval(flickerInterval);
      setFlickerInterval(null);
      titleRef.current.material.emissiveIntensity = 0;
    } else if (
      props.themeIcon &&
      !flickerInterval &&
      children === config.home.subtitle
    ) {
      setFlickerInterval(
        setInterval(async () => {
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
      );
    }
  });

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
