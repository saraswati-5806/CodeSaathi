"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoCertificates } from "../../lib/demoData";

export default function CertificatesPage() {
  const [role, setRole] = useState("student");

  useEffect(() => {
    setRole(localStorage.getItem("codesaathi_role") || "student");
  }, []);

  const downloadCertificate = (certificate) => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <title>CodeSaathi Certificate</title>
  <style>
    body { font-family: Arial; padding: 40px; text-align: center; }
    .cert { border: 10px solid #9333ea; padding: 50px; border-radius: 20px; }
    h1 { color: #6b21a8; }
  </style>
</head>
<body>
  <div class="cert">
    <h1>CodeSaathi Certificate</h1>
    <h2>Certificate of Completion</h2>
    <p>Awarded to</p>
    <h2>${certificate.learner}</h2>
    <p>For successfully completing</p>
    <h2>${certificate.title}</h2>
    <p>Certificate ID: ${certificate.id}</p>
    <p>Status: ${certificate.status}</p>
  </div>
</body>
</html>
`;

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${certificate.id}-certificate.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  if (role === "instructor") {
    return (
      <AppShell>
        <div className="card">
          <h1 className="page-title">Certificates</h1>
          <p className="text-slate-300 mt-4">
            Certificates are downloadable from the student dashboard after course completion.
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Certificate Center</p>
          <h1 className="page-title mt-2">Verified Certificates</h1>
        </div>

        <div className="grid-fit">
          {demoCertificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white text-slate-950 rounded-3xl p-8 border-8 border-purple-500"
            >
              <p className="font-bold text-purple-700">CodeSaathi Certificate</p>
              <h2 className="text-3xl font-black mt-5">
                Certificate of Completion
              </h2>

              <p className="mt-5">
                Awarded to <b>{certificate.learner}</b>
              </p>

              <p className="mt-3">
                For completing <b>{certificate.title}</b>
              </p>

              <p className="mt-5">
                Certificate ID: <b>{certificate.id}</b>
              </p>

              <p>
                Status: <b>{certificate.status}</b>
              </p>

              <div className="mt-6 border-2 border-slate-900 w-28 h-28 flex items-center justify-center text-xs font-bold">
                QR VERIFY
              </div>

              <button
                className="mt-6 bg-purple-700 text-white px-5 py-3 rounded-xl font-bold"
                onClick={() => downloadCertificate(certificate)}
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}