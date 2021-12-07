// Generate a dummy test by returning an anonymous closure over some random
// delay and boolean representing mock runtime and test result.
// The closure will run a callback on the mocked test metrics.
function generateDummyTest() {
  let delay = 7000 + Math.random() * 7000;
  let testPassed = Math.random() > 0.5;

  return function (callback) {
    setTimeout(function () {
      callback(testPassed, delay);
    }, delay);
  };
}

// Declaring and initializing this array calls the generateDummyTest function
// closing over both the result and delay in each case. 'Running' the tests will
// therefore be deterministic.
export const tests = [
  {
    description: "commas are rotated properly",
    run: generateDummyTest()
  },
  {
    description: "exclamation points stand up straight",
    run: generateDummyTest()
  },
  {
    description: "run-on sentences don't run forever",
    run: generateDummyTest()
  },
  {
    description: "question marks curl down, not up",
    run: generateDummyTest()
  },
  {
    description: "semicolons are adequately waterproof",
    run: generateDummyTest()
  },
  {
    description: "capital letters can do yoga",
    run: generateDummyTest()
  }
];
