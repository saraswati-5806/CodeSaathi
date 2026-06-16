"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [name, setName] = useState("Demo Student");
  const [email, setEmail] = useState("student@codesaathi.com");
  const [password, setPassword] = useState("Student@123");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("codesaathi_token");
    const savedRole = localStorage.getItem("codesaathi_role");

    if (token && savedRole === "student") window.location.href = "/dashboard";
    if (token && savedRole === "instructor") window.location.href = "/instructor/dashboard";
  }, []);

  const switchRole = (r) => {
    setRole(r);
    if (r === "instructor") {
      setName("Demo Instructor");
      setEmail("instructor@codesaathi.com");
      setPassword("Instructor@123");
    } else {
      setName("Demo Student");
      setEmail("student@codesaathi.com");
      setPassword("Student@123");
    }
  };

  const submit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login" ? { email, password } : { name, email, password, role };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || data.error || "Authentication failed");

      const user = data.user || data.data?.user || { name, email, role };
      const token = data.token || data.data?.token;
      const finalRole = user.role || role;

      if (!token) throw new Error("Token missing from backend response");

      localStorage.setItem("codesaathi_token", token);
      localStorage.setItem("codesaathi_role", finalRole);
      localStorage.setItem("codesaathi_user", JSON.stringify(user));

      window.location.href = finalRole === "instructor" ? "/instructor/dashboard" : "/dashboard";
    } catch (e) {
      setMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-bg min-h-screen flex items-center justify-center px-4 py-10">
      <section className="card w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-300 font-bold">Welcome to</p>
            <h1 className="hero-title mt-2">CodeSaathi</h1>
            <p className="text-slate-300 mt-5 leading-8">
              Register or login first. Students and instructors get different protected dashboards.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <button className={role === "student" ? "btn-blue" : "btn-dark"} onClick={() => switchRole("student")}>🎓 Student</button>
              <button className={role === "instructor" ? "btn-purple" : "btn-dark"} onClick={() => switchRole("instructor")}>👨‍🏫 Instructor</button>
            </div>

            <Link href="/" className="btn-dark mt-6">← Back to Landing</Link>
          </div>

          <div className="card">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className={mode === "login" ? "btn-blue" : "btn-dark"} onClick={() => setMode("login")}>Login</button>
              <button className={mode === "register" ? "btn-purple" : "btn-dark"} onClick={() => setMode("register")}>Register</button>
            </div>

            <h2 className="text-3xl font-black capitalize">{role} {mode}</h2>

            <div className="space-y-4 mt-6">
              {mode === "register" && <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />}
              <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

              {mode === "register" && (
                <select className="field" value={role} onChange={(e) => switchRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              )}

              <button className="btn-blue w-full" disabled={loading} onClick={submit}>
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
              </button>

              {message && <div className="mini-card text-red-300">{message}</div>}

              <div className="mini-card">
                <p className="font-bold">Demo Credentials</p>
                <p className="text-slate-400 mt-2">Student: student@codesaathi.com / Student@123</p>
                <p className="text-slate-400">Instructor: instructor@codesaathi.com / Instructor@123</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}