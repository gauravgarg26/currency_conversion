/**
 * Builds a graph representing currency conversions from the provided conversion rates.
 * @param {Array} conversionRates - An array of objects representing conversion rates.
 * @returns {Object} - An object representing the graph with currency codes as keys
 *                     and their conversion details as values.
 */
function buildGraph(conversionRates) {
  const graph = {};
  const currencyNames = {};
  
  for (const rate of conversionRates) {
    if (!graph[rate.fromCurrencyCode]) {
      graph[rate.fromCurrencyCode] = [];
    }
    graph[rate.fromCurrencyCode].push({
      currency: rate.toCurrencyCode,
      rate: rate.exchangeRate,
    });
    currencyNames[rate.fromCurrencyCode] = rate.fromCurrencyName;
    currencyNames[rate.toCurrencyCode] = rate.toCurrencyName;
  }

  return {graph, currencyNames};
}


/**
 * Finds all unique currencies from the provided conversion rates.
 * @param {Array} conversionRates - An array of objects representing conversion rates.
 * @returns {Array} - An array containing all unique currency codes found in the conversion rates.
 */
function findUniqueCurrencies(conversionRates) {
  const currencies = new Set();
  for (const rate of conversionRates) {
    currencies.add(rate.fromCurrencyCode);
    currencies.add(rate.toCurrencyCode);
  }
  return Array.from(currencies);
}

/**
 * Helper function for DFS traversal to find the best conversion amount.
 * @param {Object} graph - The graph representing currency conversions.
 * @param {string} currentCurrency - The current currency being explored during DFS.
 * @param {string} targetCurrency - The target currency to find the best conversion to.
 * @param {number} amount - The current conversion amount.
 * @param {Object} visited - An object to keep track of visited currencies during DFS.
 * @param {Array} path - An array to store the path taken during DFS traversal.
 * @param {Array} maxPath - An array to store the max path taken during DFS traversal when we get the targetCurrency.
 * 
 * @returns {number} - The best conversion amount to the target currency from the current currency.
 */
function findBestConversionAmount(graph, currentCurrency, targetCurrency, amount, visited, path, maxPath) {
  if (currentCurrency === targetCurrency) {
    if(maxPath.amount < amount){
      maxPath.amount = amount;
      maxPath.path = [...path, currentCurrency];
    }
    return;
  }

  visited[currentCurrency] = true;

  for (const { currency, rate } of graph[currentCurrency] || []) {
    if (!visited[currency]) {
      findBestConversionAmount(graph, currency, targetCurrency, amount * rate, visited, [...path, currentCurrency], maxPath);
    }
  }
  visited[currentCurrency] = false;
}


/**
 * Finds the best conversion amount to all other currencies from the provided graph starting with a given currency.
 * @param {Object} graph - The graph representing currency conversions.
 * @param {string} startCurrency - The currency code to start the conversion from Default CAD.
 * @param {string} startRate - Initial amount, Defalt 100CAD.
 * @param {string} currencies - List of unique currencies given in the problem.
 * @returns {Object} - An object containing the best conversion amount and the path to achieve it.
 */
function findBestConversions(graph, currencies, startCurrency, startRate) {
  let bestConversion = {};

  for(const currency of currencies){
    const maxPath = { amount: 0, path: [] };
    if (currency !== startCurrency) {
      findBestConversionAmount(graph, startCurrency, currency, startRate, {}, [], maxPath);
      bestConversion[currency] = maxPath;
    }
  }
  bestConversion = Object.fromEntries(Object.entries(bestConversion).sort());

  return bestConversion;
}

module.exports = { buildGraph, findBestConversionAmount, findBestConversions, findUniqueCurrencies };
