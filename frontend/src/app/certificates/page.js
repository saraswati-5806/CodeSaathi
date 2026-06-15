"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CertificatesPage() {
  const [token, setToken] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [output, setOutput] = useState(null);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });
    const data = await res.json();
    setToken(data.token);
  };

  const issueCertificate = async () => {
    const res = await fetch(`${API_URL}/api/certificates/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        courseId: "demo-course",
        courseTitle: "Python Programming Foundation",
      }),
    });
    setOutput(await res.json());
  };

  const loadCertificates = async () => {
    const res = await fetch(`${API_URL}/api/certificates/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCertificates(data.certificates || []);
    setOutput(data);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">Certificate Center</h1>
        <p className="text-slate-300 mt-3">Issue, view, and verify course completion certificates.</p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button onClick={login} className="bg-blue-600 px-5 py-3 rounded-xl font-semibold">Login Student</button>
          <button disabled={!token} onClick={issueCertificate} className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">Issue Demo Certificate</button>
          <button disabled={!token} onClick={loadCertificates} className="bg-slate-800 px-5 py-3 rounded-xl font-semibold">Load Certificates</button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white text-slate-950 rounded-2xl p-6 border-4 border-purple-500">
              <p className="text-sm font-semibold text-purple-700">CodeSaathi Certificate</p>
              <h2 className="text-2xl font-bold mt-3">{cert.courseTitle}</h2>
              <p className="mt-3">Certificate Code: <b>{cert.certificateCode}</b></p>
              <p className="text-sm mt-2">Status: {cert.status}</p>
            </div>
          ))}
        </div>

        {output && (
          <pre className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-auto text-green-300 text-sm">
            {JSON.stringify(output, null, 2)}
          </pre>
        )}
      </section>
    </main>
  );
}