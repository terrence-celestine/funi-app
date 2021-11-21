import "./topbar.css";
import { useEffect, useState } from "react";
const Topbar = () => {
  const [topBarArr] = useState([
    "MY HERO ACADEMIA: THE STRONGEST HERO - SEE THE MOVIE. PLAY THE GAME. UNLOCK IN-GAME REWARDS. USE CODE: TSHWHMDEKU",
    "MY HERO ACADEMIA: WORLD HEROES' MISSION - BUY TICKETS NOW ",
  ]);

  const [topBarIndex, updateTopBarIndex] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      const interval = setInterval(() => {
        updateTopBarIndex((curr) =>
          curr + 1 >= topBarArr.length ? 0 : curr + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  return (
    <div id="top-bar">
      <span>{topBarArr[topBarIndex]}</span>
    </div>
  );
};

export default Topbar;
