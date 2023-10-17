import { atom, useAtom } from "jotai";
import { motion } from "framer-motion";
import sunIcon from "../assets/sun.png";
import pumpkinIcon from "../assets/pumpkin.png";
import MenuLink from "./MenuLink";

export const halloweenAtom = atom(false);

const Menu = () => {
  const [themeIcon, setThemeIcon] = useAtom(halloweenAtom);
  return (
    <motion.div
      animate={{
        backgroundColor: themeIcon ? "#0b021a0" : "#f5f3ef8a",
        backdropFilter: themeIcon ? "none" : "blur(8px)",
      }}
      className="menu"
    >
      {/* <img src="logo.png" alt="logo" className="menu__logo" /> */}
      <div className="menu__icons">
        <motion.img
          className="menu__icon"
          animate={{
            opacity: !themeIcon ? 0 : 1,
          }}
          src={sunIcon}
          alt="Sun Icon"
        />
        <motion.img
          className="menu__icon"
          animate={{
            opacity: !themeIcon ? 1 : 0,
          }}
          src={pumpkinIcon}
          alt="Pumpkin Icon"
        />
      </div>
      <div className="menu__buttons">
        <MenuLink themeIcon={themeIcon} href="#home">
          Home
        </MenuLink>
        <MenuLink themeIcon={themeIcon} href="#skills">
          Skills
        </MenuLink>
        <MenuLink themeIcon={themeIcon} href="#projects">
          Projects
        </MenuLink>
        <MenuLink themeIcon={themeIcon} href="#contact">
          Contact
        </MenuLink>
        <div className="menu__icons">
          <motion.img
            className="menu__icon"
            style={{ pointerEvents: !themeIcon ? "none" : "auto" }}
            onClick={() => setThemeIcon(false)}
            animate={{
              opacity: !themeIcon ? 0 : 1,
            }}
            src={sunIcon}
            alt="Sun Icon"
          />
          <motion.img
            className={"menu__icon"}
            style={{ pointerEvents: !themeIcon ? "auto" : "none" }}
            onClick={() => setThemeIcon(true)}
            animate={{
              opacity: !themeIcon ? 1 : 0,
            }}
            src={pumpkinIcon}
            alt="Pumpkin Icon"
          />
        </div>
      </div>
    </motion.div>
  );
};
export default Menu;
