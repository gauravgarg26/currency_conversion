// csv.js
const { parse } = require('json2csv');

/**
 * Generates CSV data from the best conversions and currency names.
 * @param {Object} bestConversions - An object containing the best conversion amounts and paths.
 * @param {Object} currencyNames - An object containing currency names with currency codes as keys.
 * @returns {string} - The CSV data as a string.
 */
function generateCSVData(bestConversions, currencyNames) {
  const csvFields = ['Currency Code', 'Currency Name', 'Amount of currency', 'Path for best conversion rate'];
  const csvData = [];

  for (const currency in bestConversions) {
    const currencyName = currencyNames[currency];
    const { amount, path } = bestConversions[currency];
    csvData.push({
      'Currency Code': currency,
      'Currency Name': currencyName,
      'Amount of currency': amount,
      'Path for best conversion rate': path.join(' | '),
    });
  }
  const csvOptions = { fields: csvFields, header: true, delimiter: ',' };
  return parse(csvData, csvOptions);
}

/**
 * Writes CSV data to the specified output file.
 * @param {string} data - The CSV data as a string.
 * @param {string} outputFileName - The name of the output file to write the CSV data.
 */
function writeToCSV(data, outputFileName) {
  const fs = require('fs');
  fs.writeFileSync(outputFileName, data, 'utf8');
}

module.exports = { generateCSVData, writeToCSV };
