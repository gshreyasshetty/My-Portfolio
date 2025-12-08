"use client";

import React from "react";

export default function Home() {
  return (
    <main className="page">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <span className="header-tag">Portfolio</span>
        </div>
      </header>

      {/* Main hero */}
      <div className="main-inner">
        <section className="hero">
          {/* Left side */}
          <div className="hero-left">
            <h1 className="hero-name">G Shreyas Shetty</h1>

<div className="hero-tags-below">AI • Full-Stack • Data</div>

<div className="hero-lines">
  <p>🚀 Building intelligent systems that think, learn and scale.</p>
  <p>🛠 Engineering modern applications with precision, performance and purpose.</p>
</div>

<div className="hero-actions">
  <a href="mailto:gshreyasshetty@gmail.com" className="btn-primary">Email</a>
  <a href="https://github.com/shreyasshettyg" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
</div>
          </div>

          {/* Right side – simple photo */}
          <div className="hero-right">
            <div className="avatar-shell">
              <div className="avatar-ring">
                <img
                  src="/profile.jpg"
                  alt="G Shreyas Shetty"
                  className="avatar-img"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
