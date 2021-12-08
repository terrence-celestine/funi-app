import "./menu.css";
import logo from "../../assets/icons/logo.svg";
import hamburgerMenu from "../../assets/icons/mobile-menu.png";
import searchIcon from "../../assets/icons/search.png";

import { useState, useEffect, useRef } from "react";

const Menu = ({ activeUser, logOutUser }) => {
  const [hovered, setHovered] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const delayDebounceFn = setTimeout(() => {
        // Send Axios request here
        fetch("/search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm: searchTerm }),
        })
          .then((response) => response.json())
          .then((data) => setSearchResults(data));
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const showSubMenu = (e) => {
    setHovered((hovered) => !hovered);
    if (activeSearch) {
      setActiveSearch(false);
    }
  };

  const hideSubMenu = (e) => {
    setHovered((hovered) => !hovered);
  };

  const showSearchBar = () => {
    setActiveSearch(!activeSearch);
  };

  return (
    <div id="menu" className={hovered ? "show-menu" : ""}>
      <div className="main-menu">
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
      {activeUser ? (
        <ul className="user-menu">
          <li>
            <img
              className="search"
              onClick={() => showSearchBar()}
              src={searchIcon}
              alt="search icon"
            />
          </li>
          <li>
            <a href="#" onClick={() => logOutUser()}>
              Log Out
            </a>
          </li>
        </ul>
      ) : (
        <ul className="user-menu">
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      )}
      {activeUser ? (
        <div className={activeSearch ? "search-bar show" : "search-bar"}>
          <input
            type="text"
            placeholder="Search for a show"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <ul className="search-results">
            {searchResults.length > 0
              ? searchResults.map((item) => (
                  <li key={item.handle}>
                    <a href={"/shows/" + item.handle}>{item.title}</a>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Menu;
