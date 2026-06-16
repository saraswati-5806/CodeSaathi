"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("role") || "student";

  const [role, setRole] = useState(requestedRole);
  const [email, setEmail] = useState(
    requestedRole === "instructor"
      ? "instructor@codesaathi.com"
      : "student@codesaathi.com"
  );
  const [password, setPassword] = useState(
    requestedRole === "instructor" ? "Instructor@123" : "Student@123"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("codesaathi_token");
    const savedRole = localStorage.getItem("codesaathi_role");

    if (savedToken && savedRole === "instructor") {
      window.location.href = "/instructor/dashboard";
    }

    if (savedToken && savedRole === "student") {
      window.location.href = "/dashboard";
    }
  }, []);

  const switchRole = (nextRole) => {
    setRole(nextRole);

    if (nextRole === "instructor") {
      setEmail("instructor@codesaathi.com");
      setPassword("Instructor@123");
    } else {
      setEmail("student@codesaathi.com");
      setPassword("Student@123");
    }
  };

  const login = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      const finalRole = data.user?.role || role;

      localStorage.setItem("codesaathi_token", data.token);
      localStorage.setItem("codesaathi_role", finalRole);
      localStorage.setItem(
        "codesaathi_user",
        JSON.stringify(data.user || { email, role: finalRole })
      );

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
    <main className="app-bg min-h-screen flex items-center justify-center px-4">
      <section className="card w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-purple-300 font-bold">Welcome to</p>
            <h1 className="hero-title mt-2">CodeSaathi</h1>
            <p className="text-slate-300 mt-5 leading-8">
              Login first to access the LMS workspace. Students and instructors
              get different dashboards, navigation menus, and workflows.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <button
                className={role === "student" ? "btn-blue" : "btn-dark"}
                onClick={() => switchRole("student")}
              >
                Student Login
              </button>
              <button
                className={role === "instructor" ? "btn-purple" : "btn-dark"}
                onClick={() => switchRole("instructor")}
              >
                Instructor Login
              </button>
            </div>
          </div>

          <div className="card">
            <p className="text-purple-300 font-bold capitalize">{role} Access</p>
            <h2 className="text-3xl font-black mt-2">Sign In</h2>

            <div className="space-y-4 mt-6">
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

              <button onClick={login} disabled={loading} className="btn-blue w-full">
                {loading ? "Logging in..." : "Login"}
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