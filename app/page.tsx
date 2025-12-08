"use client";

import React, { useEffect } from "react";


export default function Home() {
    useEffect(() => {
    const light = document.getElementById("cursor-light");
    if (!light) return;

    const move = (e: MouseEvent) => {
      light.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="page">
      <div id="cursor-light" className="cursor-light" />

      {/* live background */}
      <div className="bg-gradient" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* header */}
      <header className="header">
        <div className="header-inner">
          <span className="header-name">G Shreyas Shetty</span>
          <span className="header-tag">Portfolio</span>
        </div>
      </header>

      <div className="main-inner">
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-left">
            <div className="hero-pill">AI • FULL-STACK • DATA</div>

            <h1 className="hero-title">
              Designing <span>intelligent systems</span> that feel sharp,
              reliable and intentional.
            </h1>

            <p className="hero-subtitle">
              Computer Science &amp; Data Science student who enjoys
              building production-ready tools in the world of Tech!
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-ghost">
                Contact
              </a>
            </div>
          </div>

          <div className="hero-right">
  <div className="hero-avatar-shell">
    <div className="hero-avatar-halo" />
    <div className="hero-avatar-ring">
      <img
        src="/profile.jpg"
        alt="Profile picture of G Shreyas Shetty"
        className="hero-avatar-img"
      />
    </div>

    {/* hover greeting */}
    <div className="avatar-greeting">
      Hey <span>👋</span>
    </div>
  </div>
</div>

        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <span className="section-label">Selected work</span>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <h3 className="project-title">
                Pi-Net – AI Cybersecurity Threat Scanner
              </h3>
              <p className="project-sub">Real-time AI-powered threat analysis.</p>
              <p className="project-desc">
                Scans URLs and files using AI and external threat feeds to detect
                malware, phishing and suspicious behaviour, then surfaces a
                simple risk score and guidance for users.
              </p>
              <p className="project-meta">
                Google Gemini • VirusTotal • Express.js • Secure dashboard with
                parental controls &amp; curated security insights.
              </p>
              <div className="project-tags">
                <span className="project-tag">AI Security</span>
                <span className="project-tag">Full Stack</span>
                <span className="project-tag">REST APIs</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">JustiFile – AI FIR Assistance</h3>
              <p className="project-sub">Helping officers file FIRs faster.</p>
              <p className="project-desc">
                Guides officers through structured questions, suggests relevant
                IPC sections and generates clean summaries to reduce friction
                and errors while filing FIRs.
              </p>
              <p className="project-meta">
                ML &amp; NLP • React Native • Firebase • Encrypted on-device
                storage.
              </p>
              <div className="project-tags">
                <span className="project-tag">Legal Tech</span>
                <span className="project-tag">Mobile</span>
                <span className="project-tag">NLP</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">AI Grow – Smart Farming Assistant</h3>
              <p className="project-sub">
                Decision support for everyday farmers.
              </p>
              <p className="project-desc">
                Suggests suitable crops and basic treatments using soil,
                climate and user preferences, with simple image-based disease
                recognition to support early action.
              </p>
              <p className="project-meta">
                React Native • TensorFlow • Firebase.
              </p>
              <div className="project-tags">
                <span className="project-tag">Agri Tech</span>
                <span className="project-tag">Computer Vision</span>
              </div>
            </div>

            <div className="project-card">
              <h3 className="project-title">Expensify – AI Finance Tracker</h3>
              <p className="project-sub">Personal finance that feels light.</p>
              <p className="project-desc">
                Tracks income and expenses, then uses AI to provide simple,
                explanation-based budgeting suggestions instead of noisy charts.
              </p>
              <p className="project-meta">
                Chart.js • Generative AI • Web app.
              </p>
              <div className="project-tags">
                <span className="project-tag">Fintech</span>
                <span className="project-tag">Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
                {/* ACHIEVEMENTS */}
        <section id="achievements" className="section">
          <div className="section-header">
            <h2 className="section-title">Achievements</h2>
            <span className="section-label">Things I'm proud of</span>
          </div>

          <div className="achievements-card">
            <div className="achievement-row">
              <div className="achievement-pill-dot" />
              <div className="achievement-content">
                <p className="achievement-title">
                  Co-authored Research Paper (Scopus Preview)
                </p>
                <p className="achievement-text">
                  "AI-Driven Diagnostic System for Vehicles: Leveraging AI for Accurate
                  and Efficient Automotive Problem Solving" (2024).
                </p>
              </div>
            </div>

            <div className="achievement-row">
              <div className="achievement-pill-dot" />
              <div className="achievement-content">
                <p className="achievement-title">
                  Design Patent – 360° Aluminium Surface LED Strip
                </p>
                <p className="achievement-text">
                  Design Patent ID: 202441060562 for an aluminium surface-based 360°
                  LED strip ceiling downlight (2024).
                </p>
              </div>
            </div>

            <div className="achievement-row">
              <div className="achievement-pill-dot" />
              <div className="achievement-content">
                <p className="achievement-title">Hackathon &amp; Ideathon Wins</p>
                <p className="achievement-text">
                  Winner – CyberSecurity Track at Hackathena (JEC, Thrissur); 1st place
                  Intra-College Hackathon (NHCE); 2nd place College-Level Ideathon;
                  State-level participant (top 3%) at Ideathon, CIT Tumkur.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* CONTACT */}
        <section id="contact" className="section">
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
            <span className="section-label">Let&apos;s build something</span>
          </div>

          <div className="contact-card">
            <div className="contact-grid">
              <div className="contact-lines">
                <p>
                  Email:{" "}
                  <a href="mailto:gshreyasshetty@gmail.com">
                    gshreyasshetty@gmail.com
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/shreyasshettyg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/shreyasshettyg
                  </a>
                </p>
              </div>
              <div className="contact-info">
                <p className="contact-note">
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
