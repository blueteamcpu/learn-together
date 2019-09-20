const axios = require('axios');
const {
  existsAsync,
  getAsync,
  setExAsync,
  cacheDurationInSeconds,
} = require('../server/redis');

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
      let { data: zips } = await queryForZips(
        generateRequestUrl(myZip, radius)
      );

      zips = zips.zip_codes.map(z => parseInt(z, 10));

      await setExAsync(key, cacheDurationInSeconds, JSON.stringify(zips));

      return zips;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getZipsNearMe;
