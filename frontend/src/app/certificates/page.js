"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import { demoCertificates } from "../../lib/demoData";

export default function CertificatesPage() {
  const [role, setRole] = useState("student");

  useEffect(() => {
    setRole(localStorage.getItem("codesaathi_role") || "student");
  }, []);

  if (role === "instructor") {
    return (
      <AppShell>
        <section>
          <div className="card">
            <p className="text-purple-300 font-bold">Instructor Access</p>
            <h1 className="page-title mt-2">Certificates are Student-only</h1>
            <p className="text-slate-300 mt-4">
              Instructors can manage courses, resources, assessments and analytics.
              Certificates are visible only in the student learning flow.
            </p>
            <a href="/instructor/dashboard" className="btn-purple mt-6">
              Back to Instructor Dashboard
            </a>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Certificate Workflow</p>
          <h1 className="page-title mt-2">Certificate Center</h1>
          <p className="text-slate-300 mt-4">
            View verified certificates earned after course completion.
          </p>
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

              <p className="mt-2">
                Status: <b>{certificate.status}</b>
              </p>

              <div className="mt-6 border-2 border-slate-900 w-28 h-28 flex items-center justify-center text-center text-xs font-bold">
                QR VERIFY
              </div>

              <button className="mt-6 bg-purple-700 text-white px-5 py-3 rounded-xl font-bold">
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}