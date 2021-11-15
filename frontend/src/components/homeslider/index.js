import "./homeslider.css";
import bannerDefaultMobile from "../../assets/banner-default-mob.png";
import loggedOutBG from "../../assets/banner-default.png";

const HomeSlider = ({ activeUser }) => {
  return (
    <div id="home-slider">
      <ul>
        {activeUser ? (
          <li>
            <div className="content">
              <p>
                With Quirks on the line, their fight is our future. In theaters
                now, subbed &amp; dubbed.
              </p>
              <button>Buy Tickets</button>
            </div>
          </li>
        ) : (
          <li className="logged-out">
            <picture>
              <source media="(max-width: 799px)" srcset={bannerDefaultMobile} />
              <source media="(min-width: 800px)" srcset={loggedOutBG} />
              <img
                src={loggedOutBG}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
            <div className="content">
              <h2>If it’s Anime, it’s Funimation.</h2>
              <p>
                Watch over 15,000 hours of anime anywhere, ad-free. Only thing
                missing are the snacks.
              </p>
              <button>Watch Now</button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HomeSlider;
