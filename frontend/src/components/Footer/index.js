import "./index.css";

const Footer = () => {
  const data = [
    "facebook.svg",
    "twitter.svg",
    "youtube.svg",
    "instagram.svg",
    "pinterest.svg",
    "discord.svg",
    "tiktok.svg",
  ];
  return (
    <footer>
      <ul className="links">
        <li key="about">
          <a href="#">About Funimation</a>
        </li>
        <li key="support">
          <a href="#">Customer Support</a>
        </li>
        <li key="terms">
          <a href="#">Terms of Use</a>
        </li>
        <li key="sales">
          <a href="#">Terms of Sale</a>
        </li>
        <li key="privacy">
          <a href="#">Privacy Policy</a>
        </li>
        <li key="do-not-sell">
          <a href="#">Do not Sell My Personal Information</a>
        </li>
        <li key="careers">
          <a href="#">Careers</a>
        </li>
      </ul>
      <div className="right">
        <ul className="social-media">
          {data.map((icon) => {
            const socialMediaIcon = require(`../../assets/icons/${icon}`);
            return (
              <li key={icon}>
                <img src={socialMediaIcon.default} alt={icon} />
              </li>
            );
          })}
        </ul>
        <span>©2017-21 Funimation Global Group, LLC. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
