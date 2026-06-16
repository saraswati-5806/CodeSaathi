"use client";

import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";

const defaultResources = [
  {
    id: "res-1",
    title: "Python Loop Notes",
    type: "Notes",
    url: "https://docs.python.org/3/tutorial/controlflow.html",
  },
  {
    id: "res-2",
    title: "Python Beginner Video",
    type: "Video",
    url: "https://www.youtube.com/embed/kqtD5dpn9C8",
  },
];

export default function ResourcesPage() {
  const [role, setRole] = useState("student");
  const [resources, setResources] = useState(defaultResources);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Notes");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("codesaathi_role") || "student");

    const saved = JSON.parse(localStorage.getItem("codesaathi_resources") || "[]");

    if (saved.length) {
      setResources(saved);
    } else {
      localStorage.setItem("codesaathi_resources", JSON.stringify(defaultResources));
    }
  }, []);

  const saveResource = () => {
    if (!title || !url) {
      setMessage("Title and URL are required.");
      return;
    }

    const newResource = {
      id: `res-${Date.now()}`,
      title,
      type,
      url,
    };

    const updated = [newResource, ...resources];
    setResources(updated);
    localStorage.setItem("codesaathi_resources", JSON.stringify(updated));

    setTitle("");
    setUrl("");
    setType("Notes");
    setMessage("Resource saved and visible to students.");
  };

  const deleteResource = (id) => {
    const updated = resources.filter((resource) => resource.id !== id);
    setResources(updated);
    localStorage.setItem("codesaathi_resources", JSON.stringify(updated));
  };

  return (
    <AppShell>
      <section>
        <div className="card mb-6">
          <p className="text-purple-300 font-bold">Learning Resources</p>
          <h1 className="page-title mt-2">Resources Center</h1>
          <p className="text-slate-300 mt-4">
            {role === "instructor"
              ? "Add notes, videos, references and study links for students."
              : "Access notes, videos and study references shared by instructors."}
          </p>

          {message && <div className="mini-card text-green-300 mt-4">{message}</div>}
        </div>

        {role === "instructor" && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Add Resource</h2>

            <div className="grid md:grid-cols-4 gap-4">
              <input
                className="field"
                placeholder="Resource title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Notes</option>
                <option>Video</option>
                <option>PDF</option>
                <option>Reference</option>
              </select>

              <input
                className="field"
                placeholder="Resource URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <button className="btn-purple" onClick={saveResource}>
                Save Resource
              </button>
            </div>
          </div>
        )}

        <div className="grid-fit">
          {resources.map((resource) => (
            <div className="card" key={resource.id}>
              <span className="badge">{resource.type}</span>
              <h2 className="text-2xl font-bold mt-4">{resource.title}</h2>

              <p className="text-slate-400 break-all mt-3">{resource.url}</p>

              <div className="flex flex-wrap gap-3 mt-5">
                <a href={resource.url} target="_blank" className="btn-blue">
                  Open Resource
                </a>

                {role === "instructor" && (
                  <button className="btn-dark" onClick={() => deleteResource(resource.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}