import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  SiAsana,
  SiCalendly,
  SiCanva,
  SiDropbox,
  SiGmail,
  SiGooglecalendar,
  SiGoogledocs,
  SiGoogledrive,
  SiGoogleforms,
  SiGooglemeet,
  SiGooglesheets,
  SiNotion,
  SiSlack,
  SiTrello,
  SiTypeform,
  SiZoom,
} from "react-icons/si";
import {
  FaCalendarCheck,
  FaFacebookF,
  FaFileLines,
  FaFileWaveform,
  FaHeartPulse,
  FaHospitalUser,
  FaKitMedical,
  FaLaptopMedical,
  FaLinkedinIn,
  FaLocationDot,
  FaNotesMedical,
  FaPhoneVolume,
  FaPrescriptionBottleMedical,
  FaShieldHeart,
  FaStethoscope,
  FaUserDoctor,
} from "react-icons/fa6";
import { HiOutlineClipboardDocumentCheck, HiOutlineEnvelope } from "react-icons/hi2";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import "./app.css";

const MedicalBubbles = lazy(() => import("./components/MedicalBubbles"));
const ModelStage = lazy(() => import("./components/ModelStage"));

const profile = {
  name: "Lalaine R. Locsin, RN",
  shortName: "Lalaine Locsin",
  email: "work.lalainelocsin@gmail.com",
  phone: "+63 956 556 8648",
  phoneHref: "tel:+639565568648",
  location: "Manila, Philippines",
  linkedin: "https://www.linkedin.com/in/lalaine-locsin-90ba193b2/",
  facebook: "https://www.facebook.com/locsinlalaine",
  resume: "/assets/profile/resume.pdf",
};

const heroTags = [
  "Registered Nurse",
  "EMR / EHR Documentation",
  "Patient Coordination",
  "Telehealth Support",
];

const ambientPills = [
  { label: "EMR Ready", className: "pill-one" },
  { label: "Scheduling", className: "pill-two" },
  { label: "Telehealth", className: "pill-three" },
  { label: "Chart Prep", className: "pill-four" },
];

const heroStrengths = [
  {
    icon: FaShieldHeart,
    title: "Calm patient-facing communication",
    text: "Hospital experience built around timely endorsements, follow-up, and respectful support.",
  },
  {
    icon: FaFileWaveform,
    title: "Records discipline and workflow accuracy",
    text: "Strong fit for medical documentation, chart-prep support, and organized admin handling.",
  },
  {
    icon: FaLaptopMedical,
    title: "Remote-ready healthcare support direction",
    text: "Presented honestly for clinics, providers, and agencies needing dependable coordination assistance.",
  },
];

const stackHighlights = [
  "Hospital-based workflow familiarity",
  "Healthcare terms and equipment cues shown as animated icon badges",
  "Responsive motion designed for desktop, tablet, and mobile viewing",
];

const toolKeys = [
  {
    label: "Gmail",
    icon: SiGmail,
    tone: "key-red",
    detail: "Inbox support, provider communication, patient follow-up, and message organization.",
  },
  {
    label: "Calendar",
    icon: SiGooglecalendar,
    tone: "key-blue",
    detail: "Appointment scheduling, reminders, reschedules, and cleaner daily coordination.",
  },
  {
    label: "Drive",
    icon: SiGoogledrive,
    tone: "key-green",
    detail: "Shared access to forms, trackers, references, and secure workflow files.",
  },
  {
    label: "Docs",
    icon: SiGoogledocs,
    tone: "key-sky",
    detail: "Templates, scripts, chart-prep notes, and polished documentation support.",
  },
  {
    label: "Sheets",
    icon: SiGooglesheets,
    tone: "key-teal",
    detail: "Logs, follow-up sheets, referral tracking, and admin visibility across tasks.",
  },
  {
    label: "Zoom",
    icon: SiZoom,
    tone: "key-blue",
    detail: "Virtual coordination and telehealth-adjacent call support.",
  },
  {
    label: "Meet",
    icon: SiGooglemeet,
    tone: "key-green",
    detail: "Remote communication for internal coordination and patient-facing support.",
  },
  {
    label: "Outlook",
    icon: HiOutlineEnvelope,
    tone: "key-violet",
    detail: "Professional inbox handling and scheduled correspondence support.",
  },
  {
    label: "Teams",
    icon: FaHospitalUser,
    tone: "key-slate",
    detail: "Team messaging, updates, and smoother handoffs across remote workflows.",
  },
  {
    label: "Slack",
    icon: SiSlack,
    tone: "key-slate",
    detail: "Fast internal follow-up, approvals, and task coordination.",
  },
  {
    label: "Notion",
    icon: SiNotion,
    tone: "key-slate",
    detail: "SOPs, process notes, onboarding references, and knowledge capture.",
  },
  {
    label: "RingCentral",
    icon: MdOutlinePhoneInTalk,
    tone: "key-orange",
    detail: "Call handling, patient outreach, and phone-based support workflows.",
  },
  {
    label: "Calendly",
    icon: SiCalendly,
    tone: "key-cyan",
    detail: "Booking flows and clean appointment-request handoffs.",
  },
  {
    label: "DocuSign",
    icon: HiOutlineClipboardDocumentCheck,
    tone: "key-gold",
    detail: "Digital paperwork, forms, signatures, and document-completion follow-up.",
  },
  {
    label: "Google Forms",
    icon: SiGoogleforms,
    tone: "key-green",
    detail: "Structured intake, screening questionnaires, and information capture.",
  },
  {
    label: "Dropbox",
    icon: SiDropbox,
    tone: "key-blue",
    detail: "Shared folders, organized storage, and remote file access support.",
  },
  {
    label: "Canva",
    icon: SiCanva,
    tone: "key-cyan",
    detail: "Simple patient-facing visuals and clean internal presentation materials.",
  },
  {
    label: "Trello",
    icon: SiTrello,
    tone: "key-sky",
    detail: "Board-based task tracking for multi-step admin support.",
  },
  {
    label: "Asana",
    icon: SiAsana,
    tone: "key-red",
    detail: "Structured task ownership and follow-through on time-sensitive work.",
  },
  {
    label: "Typeform",
    icon: SiTypeform,
    tone: "key-orange",
    detail: "Digital forms and elegant information-gathering flows.",
  },
];

const services = [
  {
    title: "Patient Coordination",
    subtitle: "Scheduling, reminders, follow-up care support",
    text:
      "Built around timely communication, appointment handling, and patient-facing coordination shaped by real hospital workflow experience.",
    chips: ["Scheduling", "Reminders", "Patient Calls", "Follow-up"],
  },
  {
    title: "Records & Workflow",
    subtitle: "Documentation, chart prep, admin structure",
    text:
      "Strong fit for record-sensitive support where detail, process discipline, and organized admin handling matter every day.",
    chips: ["EMR Ready", "SOAP Notes", "Chart Prep", "Referral Logs"],
  },
  {
    title: "Remote Clinical Support",
    subtitle: "Telehealth-adjacent admin and intake support",
    text:
      "Presented for healthcare teams that need a dependable assistant with clinical awareness, fast learning, and a polished remote support presence.",
    chips: ["Telehealth", "Intake", "Inbox Support", "Task Tracking"],
  },
];

const experience = [
  {
    period: "June 2024 - December 2025",
    title: "General Ward Nurse / Operating Room Nurse",
    meta: "DOH - Joni Villanueva General Hospital - Bocaue, Bulacan",
    text:
      "Assisted in surgical procedures, managed patient care cycles, maintained compliant medical records, and coordinated with ward and OR teams for efficient workflow.",
  },
  {
    period: "January 2023 - May 2024",
    title: "Staff Nurse",
    meta: "Graman Medical Hospital Inc - Malolos, Bulacan",
    text:
      "Provided comprehensive patient care, maintained accurate EMR records, handled admissions and discharges, and ensured timely clinical documentation.",
  },
  {
    period: "Current Direction",
    title: "Medical / Healthcare Virtual Assistant Candidate",
    meta: "Transitioning from bedside healthcare to remote support",
    text:
      "Now reframing hospital-based strengths into client-ready remote support focused on scheduling, communication, records discipline, intake, and follow-through.",
  },
];

const footerLinks = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: HiOutlineEnvelope,
    text: profile.email,
  },
  {
    label: "Phone",
    href: profile.phoneHref,
    icon: FaPhoneVolume,
    text: profile.phone,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: FaLinkedinIn,
    text: "linkedin.com/in/lalaine-locsin-90ba193b2",
  },
  {
    label: "Facebook",
    href: profile.facebook,
    icon: FaFacebookF,
    text: "facebook.com/locsinlalaine",
  },
  {
    label: "Resume",
    href: profile.resume,
    icon: FaFileLines,
    text: "View Resume",
  },
];

export default function App() {
  const pageRef = useRef(null);
  const boardRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [activeTool, setActiveTool] = useState(0);
  const [pressedTool, setPressedTool] = useState(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      page.style.setProperty("--pointer-x", `${x}%`);
      page.style.setProperty("--pointer-y", `${y}%`);
      page.style.setProperty("--cursor-left", `${event.clientX}px`);
      page.style.setProperty("--cursor-top", `${event.clientY}px`);
      setCursorVisible(true);
    };

    const handlePointerLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      revealTargets.forEach((target) => observer.unobserve(target));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const board = boardRef.current;

    if (!board) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const rect = board.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      board.style.setProperty("--board-rotate-x", `${67 + (0.5 - y) * 9}deg`);
      board.style.setProperty("--board-rotate-z", `${-31 + (x - 0.5) * 12}deg`);
      board.style.setProperty("--board-glow-x", `${x * 100}%`);
      board.style.setProperty("--board-glow-y", `${y * 100}%`);
    };

    const handlePointerLeave = () => {
      board.style.setProperty("--board-rotate-x", "67deg");
      board.style.setProperty("--board-rotate-z", "-31deg");
      board.style.setProperty("--board-glow-x", "50%");
      board.style.setProperty("--board-glow-y", "46%");
      setPressedTool(null);
    };

    board.addEventListener("pointermove", handlePointerMove);
    board.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      board.removeEventListener("pointermove", handlePointerMove);
      board.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (pressedTool === null) {
        setActiveTool((current) => (current + 1) % toolKeys.length);
      }
    }, 1700);

    return () => {
      window.clearInterval(timer);
    };
  }, [pressedTool]);

  const currentTool = toolKeys[activeTool];

  return (
    <div className="page-shell" ref={pageRef}>
      <div className="page-aurora page-aurora-one" />
      <div className="page-aurora page-aurora-two" />
      <div className="page-aurora page-aurora-three" />
      <div className="page-noise" />

      <div className={`health-cursor${cursorVisible ? " is-visible" : ""}`}>
        <div className="health-cursor-ring" />
        <div className="health-cursor-core">+</div>
      </div>

      <header className="site-header">
        <a className="header-brand" href="#home">
          <span>LL</span>
          <small>RN / Healthcare VA</small>
        </a>

        <a className="header-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          <a href="#stack">Stack</a>
          <a href="#tools">Tools</a>
          <a href="#services">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home" data-reveal>
          <div className="hero-grid-overlay" />
          <div className="hero-pulse hero-pulse-one" />
          <div className="hero-pulse hero-pulse-two" />

          <div className="hero-copy hero-copy-left" data-reveal style={{ transitionDelay: "80ms" }}>
            <p className="hero-kicker">Hello! I&apos;m</p>
            <h1 className="hero-name">
              LALAINE
              <br />
              <span>LOCSIN</span>
            </h1>
            <p className="hero-text">
              Registered Nurse with private and public hospital experience,
              now positioning for Medical Virtual Assistant and Healthcare
              Virtual Assistant roles in a more premium, client-ready format.
            </p>

            <div className="hero-actions">
              <a
                className="cta cta-primary"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <a className="cta cta-secondary" href="#tools">
                Explore Tools
              </a>
            </div>

            <div className="hero-inline-meta">
              <span>
                <FaPhoneVolume />
                {profile.phone}
              </span>
              <span>
                <FaLocationDot />
                {profile.location}
              </span>
            </div>
          </div>

          <div className="hero-stage-wrap" data-reveal style={{ transitionDelay: "160ms" }}>
            <div className="hero-stage-orb" />
            <div className="hero-stage-ring" />
            <div className="hero-stage-patch">Hi! I&apos;m Lalaine Locsin</div>

            {ambientPills.map((pill) => (
              <span className={`hero-float-pill ${pill.className}`} key={pill.label}>
                {pill.label}
              </span>
            ))}

            <Suspense fallback={<div className="model-stage model-stage-fallback hero-model-stage" />}>
              <ModelStage
                assetPath="/models/nurse-hero.glb"
                className="hero-model-stage"
                modelScale={2.55}
                modelPosition={[0, -2.25, 0]}
                modelRotation={[0, 0.18, 0]}
                floatStrength={0.18}
                cameraPosition={[0, 0.38, 5.35]}
                cameraFov={24}
                shadowY={-3.05}
                shadowScale={13.5}
                trackEyes
              />
            </Suspense>
          </div>

          <div className="hero-copy hero-copy-right" data-reveal style={{ transitionDelay: "240ms" }}>
            <p className="hero-kicker">Healthcare Virtual Assistant Candidate</p>
            <h2 className="hero-role">
              PATIENT-
              <br />
              CENTERED
              <br />
              REMOTE SUPPORT
            </h2>
            <p className="hero-text">
              Built around patient coordination, medical documentation,
              telehealth support awareness, and dependable follow-through that
              translates well into remote healthcare operations.
            </p>

            <div className="hero-proof-list">
              {heroStrengths.map((item, index) => (
                <article
                  className="hero-proof-item"
                  key={item.title}
                  data-reveal
                  style={{ transitionDelay: `${280 + index * 90}ms` }}
                >
                  <item.icon />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="intro-ribbon" data-reveal>
          <div className="tag-row">
            {heroTags.map((tag) => (
              <span className="hero-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="quick-links">
            {footerLinks.map((item) => (
              <a
                className="quick-link"
                href={item.href}
                key={item.label}
                target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
              >
                <item.icon />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="stack-section" id="stack" data-reveal>
          <div className="section-heading stack-heading" data-reveal style={{ transitionDelay: "80ms" }}>
            <p className="section-kicker">MY HEALTHCARE STACK</p>
            <h2>Healthcare language, systems, and equipment familiarity presented as animated floating badges.</h2>
            <p>
              Instead of clumped text bubbles, this section now treats your
              healthcare stack as interactive floating elements that drift,
              separate, and react to the cursor.
            </p>
          </div>

          <div className="stack-highlight-row" data-reveal style={{ transitionDelay: "140ms" }}>
            {stackHighlights.map((item) => (
              <span className="stack-highlight" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="stack-stage" data-reveal style={{ transitionDelay: "220ms" }}>
            <Suspense fallback={<div className="stack-loading" />}>
              <MedicalBubbles />
            </Suspense>
          </div>
        </section>

        <section className="tools-section" id="tools" data-reveal>
          <div className="tools-copy" data-reveal style={{ transitionDelay: "80ms" }}>
            <p className="section-kicker">TOOLS I CAN WORK WITH</p>
            <h2>Digital platforms I can use to support patient coordination, records flow, and daily healthcare admin work.</h2>
            <p>
              This section presents common healthcare support tools in a more
              visual way, showing the kind of systems connected to scheduling,
              inbox support, intake, chart-related admin tasks, and organized
              follow-through for clinics and providers.
            </p>

            <div className="tool-focus-panel">
              <p className="focus-kicker">Current focus</p>
              <h3>{currentTool.label}</h3>
              <p>{currentTool.detail}</p>
            </div>
          </div>

          <div className="keyboard-scene" data-reveal style={{ transitionDelay: "180ms" }}>
            <div className="keyboard-copy-angle">
              scheduling, records support, inbox management, patient coordination
            </div>

            <div className="keyboard-meta">
              <span className="keyboard-title">TOOLS</span>
            </div>

            <div className="keyboard-stage">
              <button className="keyboard-arrow keyboard-arrow-left" aria-label="Previous tools" type="button">
                &lt;
              </button>

              <div className="keyboard-board" ref={boardRef}>
                {toolKeys.map((tool, index) => (
                  <button
                    className={`tool-key ${tool.tone}${index === activeTool ? " is-active" : ""}${
                      index === pressedTool ? " is-pressed" : ""
                    }`}
                    key={tool.label}
                    onMouseEnter={() => {
                      setActiveTool(index);
                      setPressedTool(index);
                    }}
                    onMouseLeave={() => setPressedTool(null)}
                    onFocus={() => {
                      setActiveTool(index);
                      setPressedTool(index);
                    }}
                    onBlur={() => setPressedTool(null)}
                    onPointerDown={() => {
                      setActiveTool(index);
                      setPressedTool(index);
                    }}
                    onPointerUp={() => setPressedTool(index)}
                    type="button"
                  >
                    <span className="tool-key-cap">
                      <tool.icon aria-hidden="true" className="tool-key-logo" />
                      <span className="tool-key-label">{tool.label}</span>
                    </span>
                  </button>
                ))}
              </div>

              <button className="keyboard-arrow keyboard-arrow-right" aria-label="Next tools" type="button">
                &gt;
              </button>
            </div>
          </div>
        </section>

        <section className="services-section" id="services" data-reveal>
          <div className="whatido-title" data-reveal style={{ transitionDelay: "80ms" }}>
            <h2>
              W<span>HAT</span>
              <br />
              I <em>DO</em>
            </h2>
          </div>

          <div className="whatido-stage" data-reveal style={{ transitionDelay: "160ms" }}>
            <div className="desk-stage-orb" />
            <Suspense fallback={<div className="model-stage model-stage-fallback desk-model-stage" />}>
              <ModelStage
                assetPath="/models/nurse-desk.glb"
                className="desk-model-stage"
                modelScale={2.08}
                modelPosition={[0, -2.45, 0]}
                modelRotation={[0, -0.42, 0]}
                floatStrength={0.05}
                cameraPosition={[0, -0.18, 6.3]}
                cameraFov={28}
                shadowY={-3.1}
                shadowScale={12.5}
              />
            </Suspense>
          </div>

          <div className="service-cards">
            {services.map((service, index) => (
              <article
                className="service-card"
                key={service.title}
                data-reveal
                style={{ transitionDelay: `${220 + index * 90}ms` }}
              >
                <div className="service-corners" />
                <h3>{service.title}</h3>
                <h4>{service.subtitle}</h4>
                <p>{service.text}</p>
                <div className="service-chip-row">
                  {service.chips.map((chip) => (
                    <span className="service-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <span className="service-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" data-reveal>
          <div className="section-heading" data-reveal style={{ transitionDelay: "80ms" }}>
            <p className="section-kicker">EXPERIENCE</p>
            <h2>Professional background positioned for healthcare clients and agencies.</h2>
            <p>
              The details below come directly from your resume, but they are
              now presented in a cleaner premium layout that supports your
              transition into remote healthcare assistance.
            </p>
          </div>

          <div className="experience-grid">
            {experience.map((item, index) => (
              <article
                className="experience-card"
                key={`${item.period}-${item.title}`}
                data-reveal
                style={{ transitionDelay: `${180 + index * 90}ms` }}
              >
                <p className="experience-period">{item.period}</p>
                <h3>{item.title}</h3>
                <h4>{item.meta}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-panel" data-reveal style={{ transitionDelay: "80ms" }}>
            <div>
              <p className="section-kicker">OPEN TO OPPORTUNITIES</p>
              <h2>Available for Medical VA and Healthcare VA opportunities.</h2>
              <p>
                If a clinic, provider, or healthcare agency needs a calm,
                organized, healthcare-aware support professional, this portfolio
                is built to show that direction clearly.
              </p>
            </div>

            <div className="contact-actions">
              <a
                className="cta cta-primary"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <a className="cta cta-secondary" href={`mailto:${profile.email}`}>
                Send Email
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer" data-reveal>
          <div className="footer-copy">
            <p className="section-kicker">CONTACT DETAILS</p>
            <h2>{profile.name}</h2>
            <p>
              {profile.location} | {profile.phone}
            </p>
          </div>

          <div className="footer-link-grid">
            {footerLinks.map((item, index) => (
              <a
                className="footer-link"
                href={item.href}
                key={item.label}
                target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                data-reveal
                style={{ transitionDelay: `${120 + index * 70}ms` }}
              >
                <span className="footer-link-icon">
                  <item.icon />
                </span>
                <span className="footer-link-copy">
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </span>
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
