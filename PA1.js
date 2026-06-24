// Reads integers from the user, stores them in an array,
// Calculates mean, median, count, min, and max.
// Q to stop and see results.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numbers = [];

console.log("Integer Statistics Calculator");
console.log("Type a number and press Enter. Type 'q' when done.\n");

function promptUser() {
  rl.question("Enter an integer (or 'q' to quit): ", (input) => {
    const trimmed = input.trim();

    // Stop collecting if user types q or quit
    if (trimmed.toLowerCase() === 'q' || trimmed.toLowerCase() === 'quit') {
      rl.close();
      displayResults();
      return;
    }

    // Reject anything that isn't a whole number (no decimals, no letters)
    if (isNaN(trimmed) || trimmed === '' || !/^-?\d+$/.test(trimmed)) {
      console.log(`  Invalid input: "${trimmed}" is not an integer. Try again.\n`);
    } else {
      numbers.push(parseInt(trimmed, 10));
      console.log(`  Added. (${numbers.length} number(s) so far)\n`);
    }

    promptUser();
  });
}

// Returns the median of a sorted array
function calculateMedian(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function displayResults() {
  console.log("\n--- Results ---");

  if (numbers.length === 0) {
    console.log("No numbers entered.");
    return;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = numbers.reduce((sum, n) => sum + n, 0) / count;
  const median = calculateMedian(sorted);

  console.log(`Count  : ${count}`);
  console.log(`Mean   : ${mean}`);
  console.log(`Median : ${median}`);
  console.log(`Min    : ${min}`);
  console.log(`Max    : ${max}`);
}

promptUser();
