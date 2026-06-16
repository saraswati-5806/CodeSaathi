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
    const html = `
CodeSaathi Certificate of Completion

Awarded to: ${certificate.learner}
Course: ${certificate.title}
Certificate ID: ${certificate.id}
Status: ${certificate.status}
`;
    const blob = new Blob([html], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${certificate.id}-certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (role === "instructor") {
    return (
      <AppShell>
        <div className="card">
          <h1 className="page-title">Student Certificates</h1>
          <p className="text-slate-300 mt-4">Certificates are visible to students after course completion.</p>
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
          {demoCertificates.map((c) => (
            <div key={c.id} className="bg-white text-slate-950 rounded-3xl p-8 border-8 border-purple-500">
              <p className="font-bold text-purple-700">CodeSaathi Certificate</p>
              <h2 className="text-3xl font-black mt-5">Certificate of Completion</h2>
              <p className="mt-5">Awarded to <b>{c.learner}</b></p>
              <p className="mt-3">For completing <b>{c.title}</b></p>
              <p className="mt-5">Certificate ID: <b>{c.id}</b></p>
              <p>Status: <b>{c.status}</b></p>
              <div className="mt-6 border-2 border-slate-900 w-28 h-28 flex items-center justify-center text-xs font-bold">QR VERIFY</div>
              <button className="mt-6 bg-purple-700 text-white px-5 py-3 rounded-xl font-bold" onClick={() => downloadCertificate(c)}>Download Certificate</button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}