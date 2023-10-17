import { Text3D } from "@react-three/drei";

const SectionTitle = ({ children, ...props }) => {
  return (
    <Text3D font="fonts/Inter_Bold.json" size={0.3} {...props}>
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
