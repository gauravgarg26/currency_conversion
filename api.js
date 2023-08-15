// api.js
const axios = require('axios');


/**
 * Fetches the conversion rates data from the API based on the provided seed.
 * @param {number} seed - The seed value for fetching data from the API.
 * @returns {Promise<Array>} - A promise that resolves to the conversion rates data.
 *                             Returns null if an error occurs during API call.
 */
async function fetchConversionRates(seed) {
  const apiUrl = `https://api-coding-challenge.neofinancial.com/currency-conversion?seed=${seed}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    return null;
  }
}

module.exports = { fetchConversionRates };