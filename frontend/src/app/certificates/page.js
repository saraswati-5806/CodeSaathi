"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CertificatesPage() {
  const [role, setRole] = useState("student");
  const [token, setToken] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [courseId, setCourseId] = useState("demo-course");
  const [courseTitle, setCourseTitle] = useState("Python Programming Foundations");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("codesaathi_role") || "student";
    const savedToken = localStorage.getItem("codesaathi_token") || "";

    setRole(savedRole);
    setToken(savedToken);

    if (savedRole === "student") {
      loadCertificates(savedToken);
    }
  }, []);

  const authHeaders = (savedToken = token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${savedToken}`,
  });

  const loadCertificates = async (savedToken = token) => {
    try {
      const res = await fetch(`${API_URL}/api/certificates/my`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setCertificates(data.certificates || []);
      }
    } catch {
      setMessage("Certificates could not be loaded.");
    }
  };

  const issueCertificate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/certificates/issue`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          courseId,
          courseTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Certificate issue failed");
      }

      setMessage("Certificate issued and saved in MongoDB.");
      loadCertificates(token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const downloadCertificate = (certificate) => {
    const certCode = certificate.certificateCode || certificate._id || "CERT-DEMO";

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
    <h2>CodeSaathi Learner</h2>
    <p>For successfully completing</p>
    <h2>${certificate.courseTitle || courseTitle}</h2>
    <p>Certificate ID: ${certCode}</p>
    <p>Status: Verified</p>
  </div>
</body>
</html>
`;

    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${certCode}-certificate.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (role === "instructor") {
    return (
      <AppShell>
        <div className="card">
          <h1 className="page-title">Certificate Center</h1>
          <p className="text-slate-300 mt-4">
            Certificates are issued to students after completion. Instructors can monitor them from analytics.
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
          <p className="text-slate-300 mt-4">
            Issue, verify and download course completion certificates.
          </p>

          {message && <div className="mini-card mt-4 text-green-300">{message}</div>}
        </div>

        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-4">Issue Demo Certificate</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input className="field" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
            <input
              className="field"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            <button className="btn-purple" onClick={issueCertificate}>
              Issue Certificate
            </button>
          </div>
        </div>

        <div className="grid-fit">
          {certificates.length === 0 && (
            <div className="card">No certificates yet. Click Issue Certificate.</div>
          )}

          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="bg-white text-slate-950 rounded-3xl p-8 border-8 border-purple-500"
            >
              <p className="font-bold text-purple-700">CodeSaathi Certificate</p>
              <h2 className="text-3xl font-black mt-5">Certificate of Completion</h2>
              <p className="mt-5">Awarded to <b>CodeSaathi Learner</b></p>
              <p className="mt-3">For completing <b>{certificate.courseTitle}</b></p>
              <p className="mt-5">Certificate ID: <b>{certificate.certificateCode}</b></p>
              <p>Status: <b>Verified</b></p>

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