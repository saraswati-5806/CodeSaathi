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

    if (token && savedRole === "instructor") {
      window.location.href = "/instructor/dashboard";
    }

    if (token && savedRole === "student") {
      window.location.href = "/dashboard";
    }
  }, []);

  const switchRole = (nextRole) => {
    setRole(nextRole);

    if (nextRole === "instructor") {
      setName("Demo Instructor");
      setEmail("instructor@codesaathi.com");
      setPassword("Instructor@123");
    } else {
      setName("Demo Student");
      setEmail("student@codesaathi.com");
      setPassword("Student@123");
    }
  };

  const submitAuth = async () => {
    setLoading(true);
    setMessage("");

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

      const body =
        mode === "login"
          ? { email, password }
          : { name, email, password, role };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Authentication failed");
      }

      const finalUser = data.user || data.data?.user || { name, email, role };
      const finalToken = data.token || data.data?.token;
      const finalRole = finalUser.role || role;

      if (!finalToken) {
        throw new Error("Token missing from backend response");
      }

      localStorage.setItem("codesaathi_token", finalToken);
      localStorage.setItem("codesaathi_role", finalRole);
      localStorage.setItem("codesaathi_user", JSON.stringify(finalUser));

      if (finalRole === "instructor") {
        window.location.href = "/instructor/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-bg min-h-screen flex items-center justify-center px-4 py-10">
      <section className="card w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-300 font-bold">
              AI-Powered LMS & Coding Platform
            </p>

            <h1 className="hero-title mt-3">CodeSaathi</h1>

            <p className="text-slate-300 mt-5 leading-8 text-lg">
              Login or register first to access the platform. Students and
              instructors get separate dashboards, navigation menus, features,
              and protected workflows.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <button
                type="button"
                className={role === "student" ? "btn-blue" : "btn-dark"}
                onClick={() => switchRole("student")}
              >
                🎓 Student
              </button>

              <button
                type="button"
                className={role === "instructor" ? "btn-purple" : "btn-dark"}
                onClick={() => switchRole("instructor")}
              >
                👨‍🏫 Instructor
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="mini-card">
                <b>Role Based</b>
                <p className="text-slate-400 mt-2">Separate access control</p>
              </div>

              <div className="mini-card">
                <b>JWT Auth</b>
                <p className="text-slate-400 mt-2">Secure token login</p>
              </div>

              <div className="mini-card">
                <b>AI LMS</b>
                <p className="text-slate-400 mt-2">Gemini learning support</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className={mode === "login" ? "btn-blue" : "btn-dark"}
                onClick={() => setMode("login")}
              >
                Login
              </button>

              <button
                type="button"
                className={mode === "register" ? "btn-purple" : "btn-dark"}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            <p className="text-purple-300 font-bold capitalize">
              {role} {mode}
            </p>

            <h2 className="text-3xl font-black mt-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <div className="space-y-4 mt-6">
              {mode === "register" && (
                <input
                  className="field"
                  placeholder="Full Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              )}

              <input
                className="field"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                className="field"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {mode === "register" && (
                <select
                  className="field"
                  value={role}
                  onChange={(event) => switchRole(event.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              )}

              <button
                type="button"
                onClick={submitAuth}
                disabled={loading}
                className="btn-blue w-full"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>

              {message && <div className="mini-card text-red-300">{message}</div>}

              <div className="mini-card">
                <p className="font-bold">Demo Credentials</p>
                <p className="text-slate-400 mt-2">
                  Student: student@codesaathi.com / Student@123
                </p>
                <p className="text-slate-400 mt-1">
                  Instructor: instructor@codesaathi.com / Instructor@123
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}