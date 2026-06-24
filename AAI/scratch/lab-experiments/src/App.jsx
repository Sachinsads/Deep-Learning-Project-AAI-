import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Supersquare from "./components/Supersquare";
import Reverse from "./components/Reverse";
import Album from "./components/Album";
import { LayoutGrid, Type, Album as AlbumIcon, Home } from "lucide-react";

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #6366f1, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          React Lab Experiments
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Class & Functional Components with Axios</p>
      </header>

      <nav className="nav">
        <NavLink to="/supersquare" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
           <LayoutGrid size={18} style={{ marginRight: '8px' }} /> Super Square
        </NavLink>
        <NavLink to="/reverse" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
           <Type size={18} style={{ marginRight: '8px' }} /> Reverse Words
        </NavLink>
        <NavLink to="/albums" className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>
           <AlbumIcon size={18} style={{ marginRight: '8px' }} /> Album Details
        </NavLink>
      </nav>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/supersquare" />} />
          <Route path="/supersquare" element={<Supersquare />} />
          <Route path="/reverse" element={<Reverse />} />
          <Route path="/albums" element={<Album />} />
        </Routes>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        React JS Lab - Experiments 8a, 8b, 8c
      </footer>
    </div>
  );
}

export default App;
