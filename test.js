// test.js
const assert = require('assert');
const { fetchConversionRates } = require('./api');
const { buildGraph, findBestConversions } = require('./conversion');

// Test Case: Valid API Data Retrieval
async function testApiDataRetrieval() {
  const seed = 70849;
  const conversionRates = await fetchConversionRates(seed);
  assert.ok(conversionRates, 'API data retrieval should be successful');
}

// Test Case: Building the Graph
function testBuildGraph() {
  // Sample conversion rates data
  const conversionRates = [
    {
      "exchangeRate": 6.163994065019935,
      "fromCurrencyCode": "CAD",
      "fromCurrencyName": "Canada Dollar",
      "toCurrencyCode": "HKD",
      "toCurrencyName": "Hong Kong Dollar"
    },
  ];

  const { graph } = buildGraph(conversionRates);
  assert.ok(graph['CAD'], 'Graph should have CAD currency');
}

// Test Case: Finding Best Conversion
function testFindBestConversion() {
  // Sample graph and starting currency
  const graph = {
    "CAD": [
      { "currency": "HKD", "rate": 60 },
    ],
  };
  const startCurrency = "CAD";
  const startRate = 100;
  const currencies = ['CAD', 'HKD'];
  const bestConversions = findBestConversions(graph, currencies, startCurrency, startRate);

  assert.strictEqual(bestConversions['HKD'].amount, 100 * 60, 'Incorrect conversion amount for HKD');
}

// Run the test cases
(async () => {
  try {
    await testApiDataRetrieval();
    testBuildGraph();
    testFindBestConversion();
    console.log('All test cases passed successfully!');
  } catch (error) {
    console.error('Test case failed:', error.message);
  }
})();