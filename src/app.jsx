import React from "react";
import "./app.css";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Lalaine R. Locsin, RN</h1>
        <p>Medical Virtual Assistant</p>
      </header>

      <section>
        <h2>About Me</h2>
        <p>
          Registered Nurse transitioning into a Medical Virtual Assistant role with expertise in EMR/EHR, telehealth, and patient coordination.
        </p>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          <li>EMR/EHR Management</li>
          <li>Medical Documentation</li>
          <li>Telehealth Support</li>
          <li>Patient Coordination</li>
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <p>Staff Nurse - Graman Medical Hospital (2023-2024)</p>
        <p>Ward / OR Nurse - DOH Hospital (2024-2025)</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Email: work.lalainelocsin@gmail.com</p>
      </section>
    </div>
  );
}
