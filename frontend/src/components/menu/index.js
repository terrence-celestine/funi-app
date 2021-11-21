import "./menu.css";
import logo from "../../assets/icons/logo.svg";
import hamburgerMenu from "../../assets/icons/mobile-menu.png";
import { useState } from "react";

const Menu = ({ activeUser }) => {
  const [hovered, setHovered] = useState(false);

  const showSubMenu = (e) => {
    setHovered((hovered) => !hovered);
  };

  const hideSubMenu = (e) => {
    setHovered((hovered) => !hovered);
  };

  return (
    <div id="menu" className={hovered ? "show-menu" : ""}>
      <a href="#trigger" className="trigger">
        <img src={hamburgerMenu} alt="mobile menu trigger" />
      </a>
      <a href="/" className="logo">
        <img src={logo} alt="funimation logo" />
      </a>
      <ul
        className="nav"
        onMouseEnter={(e) => showSubMenu(e)}
        onMouseLeave={(e) => hideSubMenu(e)}
      >
        {activeUser ? (
          <li className="parent">
            <a href="/">My Anime</a>
            <ul>
              <li>
                <a href="/">Watch List</a>
              </li>
              <li>
                <a href="/">Digital Copy</a>
              </li>
            </ul>
          </li>
        ) : (
          ""
        )}
        <li className="parent">
          <a href="/">Stream</a>
          <ul>
            <li>
              <a href="/">All Titles</a>
            </li>
            <li>
              <a href="/">Current Seasons</a>
            </li>
            <li>
              <a href="/">Schedule</a>
            </li>
          </ul>
        </li>
        <li className="parent">
          <a href="/">Discover</a>
          <ul>
            <li>
              <a href="/">Games</a>
            </li>
            <li>
              <a href="/">News</a>
            </li>
            <li>
              <a href="/">Theatrical</a>
            </li>
          </ul>
        </li>
        <li className="parent">
          <a href="/">Shop</a>
          <ul>
            <li>
              <a href="/">Accesories</a>
            </li>

            <li>
              <a href="/">Apparel</a>
            </li>

            <li>
              <a href="/">Home Goods</a>
            </li>

            <li>
              <a href="/">Gift Cards</a>
            </li>

            <li>
              <a href="/">Sale</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
