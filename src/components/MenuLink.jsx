import { motion } from "framer-motion";

const MenuLink = (props) => {
  return (
    <motion.a
      animate={{
        color: props.themeIcon ? "#ff704c" : "#1a202c",
      }}
      whileHover={{
        cursor: "pointer",
        color: props.themeIcon ? "#fff" : "#4668ee",
      }}
      href={props.navigate ? undefined : props.href}
      className="menu__button"
      onClick={() => (props.navigate ? props.trigger() : null)}
    >
      {props.children}
    </motion.a>
  );
};
export default MenuLink;
