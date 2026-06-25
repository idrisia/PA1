// Integer Product Checker

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store valid integers entered by the user
const integers = [];

// Prompt the user repeatedly until they enter q or Q
function promptUser() {
  rl.question("Enter an integer (or 'q' to quit): ", (input) => {
    const trimmed = input.trim();

    // Quit if user enters q or Q
    if (trimmed.toLowerCase() === "q") {
      rl.close();
      processResults();
      return;
    }

    const parsed = parseInt(trimmed, 10);

    // Validate input is a whole integer
    if (isNaN(parsed) || !Number.isInteger(Number(trimmed))) {
      console.log(`Error: "${trimmed}" is not a valid integer. Please enter a whole number or 'q' to quit.`);
    } else {
      integers.push(parsed);
    }

    promptUser();
  });
}

// Echo integers and check if any two multiply to equal a third
function processResults() {
  if (integers.length === 0) {
    console.log("\nNo integers were entered.");
    return;
  }

  console.log(`\nYou entered: ${integers.join(", ")}`);

  if (integers.length < 3) {
    console.log("Condition was not met (need at least 3 integers).");
    return;
  }

  let conditionMet = false;

  for (let i = 0; i < integers.length; i++) {
    for (let j = 0; j < integers.length; j++) {
      if (i === j) continue;

      const product = integers[i] * integers[j];

      for (let k = 0; k < integers.length; k++) {
        if (k === i || k === j) continue;

        if (product === integers[k]) {
          console.log(`Condition is met: ${integers[i]} x ${integers[j]} = ${integers[k]}`);
          conditionMet = true;
          break;
        }
      }
      if (conditionMet) break;
    }
    if (conditionMet) break;
  }

  if (!conditionMet) {
    console.log("Condition was not met.");
  }
}

console.log("=== Integer Product Checker ===");
promptUser();
