const axios = require('axios');
const { existsAsync, getAsync, setAsync } = require('../server/redis');

// cache string 'zips-zipcode-radius'

const generateCacheString = (zip, radius) => {
  return `zips-${zip}-${radius}`;
};

const generateRequestUrl = (zip, radius) => {
  return `https://www.zipcodeapi.com/rest/${process.env.ZIP_KEY}/radius.json/${zip}/${radius}/mile?minimal`;
};

const queryForZips = url => {
  return axios.get(url);
};

const getZipsNearMe = async (myZip, radius) => {
  try {
    const key = generateCacheString(myZip, radius);

    if (await existsAsync(key)) {
      const zips = await getAsync(key);

      return JSON.parse(zips);
    } else {
      const { data: zips } = await queryForZips(
        generateRequestUrl(myZip, radius)
      );

      await setAsync(key, JSON.stringify(zips));

      return zips;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getZipsNearMe;
