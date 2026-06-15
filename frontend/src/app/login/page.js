"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-slate-300 mt-3">
          Use demo login buttons inside Student Dashboard or Instructor Dashboard.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <Link
            href="/dashboard"
            className="bg-blue-600 rounded-2xl p-6 font-semibold text-center"
          >
            Continue as Student
          </Link>

          <Link
            href="/instructor/dashboard"
            className="bg-purple-600 rounded-2xl p-6 font-semibold text-center"
          >
            Continue as Instructor
          </Link>
        </div>
      </section>
    </main>
  );
}