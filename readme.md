# Currency Conversion

### Problem
company is looking to find the best currency conversion possible for our customers. However, we don’t have direct Canadian Dollar conversions to all currencies so we have to trade currencies for other currencies. It is possible that we can go from one currency to another, and that a currency could show up multiple times.

#### Example
```shell
Convert CAD to EUR
CAD -> GBP -> EUR
```

There are no cycles
```shell
CAD -> EUR -> GBP -> EUR
```

Utilizing the API data, return the best possible conversion rate for every currency we can get, assuming we start with $100 CAD. The best possible conversion rate should yield the highest possible amount of currency that you are converting to. Given the following example, the longer route yields the higher amount (95.00) and is therefore the best conversation rate.

```shell
CAD -> HKD = 90.00
CAD -> GBP -> DOGE -> HKD = 95.000
```

#### Get API URL - https://api-coding-challenge.neofinancial.com/currency-conversion
### Requirements

- Use one of the following languages: Javascript, Typescript, Java, C#, Python or Ruby
- Ensure you comment your code
- Use a REST call to get the data, do not hardcode it into your source code.
- Generate a CSV file as an output that contains optimal conversions from CAD to all currencies. The file should have the following
### format
- Currency Code (eg. AUD, USD, BTC)
- Currency Name (eg. Bitcoin, Hong Kong Dollar)
- Amount of currency, given we started with $100 CAD (ie. 1500.43)
- Path for the best conversion rate, pipe delimited (ie. CAD | GBP | EUR)

# Solution
Install NodeJs
- npm install
- npm test - it will show the message - All test cases passed successfully!
- npm start - it will generate a CSV file name best_conversions.csv

# Approach
**Assumtption** - I'm assuming we can only do the direct conversion. To include Indirect conversion, there is a simple a change we just need to include indirect conversion rate by doing 1/exchange_rate in graph.

The application finds the best conversion rate using a depth-first search (DFS) algorithm on the graph.

DFS traverses the graph in a depth-first manner, exploring as far as possible along each branch before backtracking. This approach ensures that we visit all possible paths from the starting currency (CAD) to other currencies. When DFS reaches a dead-end (i.e., a currency with no further outgoing edges), it go to the previous node and explores alternative paths with the highest conversion rate.
To avoid revisiting the same currency node in a single path, we use a visited data structure to keep track of already visited currencies

NOTE - Here we can't use dynamic programing(memoization). because it can lead to incorrect results because there are different conversion rates involved in different paths.

Time Complexity - O(M*N)
where M is the number of edges and N is the number of unique currencies.

Alternate Way - We can use Bellman Fords Algorithm which have the time complexity O(M*N*K). 
where k is the maximum path. In our case this algorithim takes K more time because while finding best rate we need to look into the path if currentCurrency is already visited or not.