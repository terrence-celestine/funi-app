import React from "react";

const Thumbnail = ({ show, name }) => {
  try {
    // Import image on demand
    const image = require(`../../assets/thumbnails/${show}/${name}`);

    // If the image doesn't exist. return null
    if (!image) return null;
    return <img src={image.default} alt={name} />;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};

export default Thumbnail;
