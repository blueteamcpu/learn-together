const axios = require('axios');
const { getAsync } = require('../server/redis');

// cache string 'zips-zipcode-radius'

const generateCacheString = (zip, radius) => {
  return `zips-${zip}-${radius}`;
};

const generateRequestUrl = (zip, radius) => {
  return `https://www.zipcodeapi.com/rest/${process.env.ZIP_KEY}/radius.json/${zip}/${radius}/mile?minimal`;
};

const queryForZips = async url => {
  try {
    const { data: zipcodes } = await axios.get(url);
    return zipcodes;
  } catch (error) {
    throw error;
  }
};

// const getZipsNearMe = async (myZip, distance) => {
//   if (redis.exists())
// }
