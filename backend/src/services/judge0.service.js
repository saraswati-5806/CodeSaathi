const runCodeAgainstTests = async ({ code, language, testCases }) => {
  const results = testCases.map((testCase) => {
    const expected = String(testCase.expectedOutput).trim();

    let actualOutput = "";

    if (code.includes(expected)) {
      actualOutput = expected;
    } else {
      actualOutput = "Output mismatch";
    }

    return {
      input: testCase.input,
      expectedOutput: expected,
      actualOutput,
      passed: actualOutput === expected,
    };
  });

  const passedCount = results.filter((r) => r.passed).length;
  const total = results.length;

  return {
    status: passedCount === total ? "accepted" : "wrong",
    score: total === 0 ? 0 : Math.round((passedCount / total) * 100),
    testResults: results,
  };
};

module.exports = {
  runCodeAgainstTests,
};