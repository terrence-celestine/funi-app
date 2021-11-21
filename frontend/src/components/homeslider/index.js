import "./homeslider.css";
import bannerDefaultMobile from "../../assets/banner-default-mob.png";
import loggedOutBG from "../../assets/banner-default.png";

const HomeSlider = ({ activeUser }) => {
  return (
    <div id="home-slider">
      <ul>
        {activeUser ? (
          <li className="slide">
            <picture>
              <source media="(max-width: 799px)" srcSet={bannerDefaultMobile} />
              <source media="(min-width: 800px)" srcSet={loggedOutBG} />
              <img
                src={loggedOutBG}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
            <div className="content">
              <p>
                Watch over 15,000 hours of anime anywhere, ad-free. Only thing
                missing are the snacks.
              </p>
              <button>Start Watching</button>
            </div>
          </li>
        ) : (
          <li className="slide">
            <picture>
              <source media="(max-width: 799px)" srcSet={bannerDefaultMobile} />
              <source media="(min-width: 800px)" srcSet={loggedOutBG} />
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
