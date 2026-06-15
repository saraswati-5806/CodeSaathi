"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LeaderboardPage() {
  const [token, setToken] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@codesaathi.com", password: "Student@123" }),
    });
    const data = await res.json();
    setToken(data.token);
  };

  const loadLeaderboard = async () => {
    const res = await fetch(`${API_URL}/api/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLeaderboard(data.leaderboard || []);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-slate-300 mt-3">Track XP, badges, streaks, and student rankings.</p>

        <div className="flex gap-4 mt-6">
          <button onClick={login} className="bg-blue-600 px-5 py-3 rounded-xl font-semibold">Login Student</button>
          <button onClick={loadLeaderboard} disabled={!token} className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">Load Leaderboard</button>
        </div>

        <div className="mt-8 space-y-4">
          {leaderboard.map((user, index) => (
            <div key={user._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex justify-between">
              <div>
                <h2 className="text-xl font-bold">#{index + 1} {user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-300">{user.xp?.total || 0} XP</p>
                <p className="text-slate-400">{user.badges?.length || 0} badges</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}