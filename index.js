const { fetchConversionRates } = require('./api');
const { buildGraph, findBestConversions, findUniqueCurrencies } = require('./conversion');
const { generateCSVData, writeToCSV } = require('./csv');

/**
 * Main function that do the currency conversion process.
 */
async function main() {

  // Fetch conversion rates from the API
  const seed = 50145;
  const conversionRates = await fetchConversionRates(seed);
  if (!conversionRates) {
    console.error('Failed to fetch data from the API. Exiting...');
    return;
  }

  // Build the currency conversion graph and find unique currencies
  const {graph, currencyNames} = buildGraph(conversionRates);
  const currencies = findUniqueCurrencies(conversionRates);

  const startCurrency = 'CAD';
  const startRate = 100; //CAD 100

  // Find the best conversions for each currency
  const bestConversions = findBestConversions(graph, currencies, startCurrency, startRate);

  // Generate CSV data and write to a file
  const csvData = generateCSVData(bestConversions, currencyNames);
  const outputFileName = 'best_conversions.csv';
  writeToCSV(csvData, outputFileName);

  console.log('Best Conversions have been written to', outputFileName);
}

main();