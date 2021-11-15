const Image = ({ name }) => {
  try {
    // Import image on demand
    const image = require(`../../assets/banners/${name}`);

    console.log(image);
    // If the image doesn't exist. return null
    if (!image) return null;
    return image.default;
  } catch (error) {
    console.log(`Image with name "${name}" does not exist`);
    return null;
  }
};

export default Image;
