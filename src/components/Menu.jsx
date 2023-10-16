import { atom } from "jotai";

export const halloweenAtom = atom(false);

const Menu = () => {
  return (
    <div className="menu">
      <img src="logo.png" alt="logo" className="menu__logo" />
      <div className="menu__buttons">
        <a href="#home" className="menu__button">
          Home
        </a>
        <a href="#skills" className="menu__button">
          Skills
        </a>
        <a href="#projects" className="menu__button">
          Projects
        </a>
        <a href="#contact" className="menu__button">
          Contact
        </a>
      </div>
    </div>
  );
};
export default Menu;
