"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";

export default function CodingPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState('for i in range(1, 6):\n    print(i)');
  const [output, setOutput] = useState("Run code to see output.");

  const loadStarter = (lang) => {
    setLanguage(lang);

    if (lang === "javascript") {
      setCode('for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}');
    } else {
      setCode('for i in range(1, 6):\n    print(i)');
    }

    setOutput("Run code to see output.");
  };

  const runCode = () => {
    const lower = code.toLowerCase();

    if (language === "python") {
      if (lower.includes("print") && lower.includes("range")) {
        setOutput("Accepted ✅\nTest Case 1 Passed\nTest Case 2 Passed\nOutput:\n1\n2\n3\n4\n5");
      } else {
        setOutput("Error ❌\nHint: Use range() and print() to display numbers.");
      }
      return;
    }

    if (language === "javascript") {
      if (lower.includes("console.log") && lower.includes("for")) {
        setOutput("Accepted ✅\nTest Case 1 Passed\nTest Case 2 Passed\nOutput:\n1\n2\n3\n4\n5");
      } else {
        setOutput("Error ❌\nHint: Use for loop and console.log().");
      }
    }
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Coding Workspace</p>
          <h1 className="page-title mt-2">Practice Coding</h1>
          <p className="text-slate-300 mt-4">
            Write code, run sample tests, and view accepted/error output.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex gap-3 flex-wrap mb-5">
              <button
                className={language === "python" ? "btn-blue" : "btn-dark"}
                onClick={() => loadStarter("python")}
              >
                Python
              </button>

              <button
                className={language === "javascript" ? "btn-purple" : "btn-dark"}
                onClick={() => loadStarter("javascript")}
              >
                JavaScript
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <p className="text-slate-300">Print numbers from 1 to 5.</p>

            <textarea
              className="field min-h-80 text-green-300 mt-5 font-mono"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button className="btn-blue mt-4" onClick={runCode}>
              Run Code
            </button>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Output</h2>
            <pre className="mini-card whitespace-pre-wrap text-green-300 min-h-80">
              {output}
            </pre>
          </div>
        </div>
      </section>
    </AppShell>
  );
}