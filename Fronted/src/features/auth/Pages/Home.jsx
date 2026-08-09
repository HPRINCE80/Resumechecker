import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTION = 'Tell me about a time you disagreed with a teammate.';
const ANSWER =
  "In my last sprint, a teammate wanted to skip code review to hit a deadline. I pushed back and proposed a faster review step instead — we shipped on time without cutting corners.";
const TARGET_SCORE = 82;

const STEPS = [
  {
    n: '01',
    title: 'Upload your resume',
    body: 'Drop in a PDF or Word file. We read the roles, skills, and gaps in seconds — nothing to fill out by hand.',
  },
  {
    n: '02',
    title: 'Get your questions',
    body: "We turn your actual experience into the questions a hiring manager would ask you, not a generic bank.",
  },
  {
    n: '03',
    title: 'Practice out loud',
    body: 'Answer by voice or text. Get a transcript, a score, and one thing to fix before you try again.',
  },
];

const FEATURES = [
  {
    title: 'Built from your resume',
    body: 'Questions come from the roles and projects you actually list — not a template every candidate gets.',
    icon: (
      <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M15 3v4h4 M9 12h6 M9 16h6 M9 8h2" />
    ),
  },
  {
    title: 'Feedback on delivery',
    body: 'Clarity, pacing, and structure — scored per answer, not just a pass or fail at the end.',
    icon: <path d="M4 19V9 M10 19V5 M16 19v-7 M22 19H2" />,
  },
  {
    title: 'Transcripts you keep',
    body: 'Every session is saved word for word, so you can see exactly what changed between attempt one and five.',
    icon: <path d="M5 4h11l3 3v13H5V4Z M16 4v3h3 M8 11h6 M8 15h6" />,
  },
  {
    title: 'Practice on your schedule',
    body: 'No booking a slot. Run a session at 7am before the real thing, or twice in one evening.',
    icon: <path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M6 6l2 2 M16 16l2 2 M18 6l-2 2 M8 16l-2 2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />,
  },
];

const READOUT = [
  { value: '10,400+', label: 'Sessions practiced' },
  { value: '3.1×', label: 'Avg. score improvement by session 5' },
  { value: '68%', label: 'Say they felt calmer going in' },
  { value: '24/7', label: 'No slot to book' },
];

export default function Home() {
  const navigate = useNavigate();
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Transcript signature element state ----
  const [typedAnswer, setTypedAnswer] = useState(prefersReducedMotion ? ANSWER : '');
  const [phase, setPhase] = useState(prefersReducedMotion ? 'scored' : 'typing'); // 'typing' | 'scoring' | 'scored'
  const [score, setScore] = useState(prefersReducedMotion ? TARGET_SCORE : 0);
  const timeoutRef = useRef(null);

  const clearPending = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let charIndex = 0;
    let scoreValue = 0;

    const typeNext = () => {
      charIndex += 1;
      setTypedAnswer(ANSWER.slice(0, charIndex));
      if (charIndex < ANSWER.length) {
        timeoutRef.current = setTimeout(typeNext, 22);
      } else {
        setPhase('scoring');
        timeoutRef.current = setTimeout(scoreTick, 400);
      }
    };

    const scoreTick = () => {
      scoreValue += 2;
      setScore(Math.min(scoreValue, TARGET_SCORE));
      if (scoreValue < TARGET_SCORE) {
        timeoutRef.current = setTimeout(scoreTick, 18);
      } else {
        setPhase('scored');
        timeoutRef.current = setTimeout(resetCycle, 3200);
      }
    };

    const resetCycle = () => {
      charIndex = 0;
      scoreValue = 0;
      setTypedAnswer('');
      setScore(0);
      setPhase('typing');
      timeoutRef.current = setTimeout(typeNext, 500);
    };

    timeoutRef.current = setTimeout(typeNext, 700);
    return clearPending;
  }, [prefersReducedMotion, clearPending]);

  return (
    <div className="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root{
          --ink:#151E36;
          --ink-2:#1F2C4E;
          --paper:#EDEAE1;
          --paper-2:#E2DFD4;
          --brass:#C08A28;
          --brass-light:#E2B563;
          --sage:#3C8B6D;
          --charcoal:#2B2E36;
          --line:rgba(21,30,54,0.12);
          --line-dark:rgba(237,234,225,0.14);
        }

        *{box-sizing:border-box}
        .home{
          font-family:'Inter',system-ui,sans-serif;
          color:var(--charcoal);
          background:var(--paper);
          -webkit-font-smoothing:antialiased;
        }
        .home h1, .home h2, .home h3{
          font-family:'Fraunces',Georgia,serif;
          font-weight:500;
          line-height:1.08;
          margin:0;
        }
        .mono{
          font-family:'IBM Plex Mono',monospace;
          letter-spacing:0.06em;
        }
        .eyebrow{
          font-family:'IBM Plex Mono',monospace;
          font-size:12px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          display:flex;
          align-items:center;
          gap:8px;
        }
        .eyebrow::before{
          content:'';
          width:16px;
          height:1px;
          background:currentColor;
          opacity:0.6;
        }
        a{color:inherit}
        button{font-family:inherit}
        button:focus-visible, a:focus-visible{
          outline:2px solid var(--brass);
          outline-offset:3px;
        }

        /* ---------- Nav ---------- */
        .nav{
          max-width:1180px;
          margin:0 auto;
          padding:24px 24px 0;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        .logo{
          font-family:'Fraunces',serif;
          font-size:20px;
          font-weight:600;
          color:var(--paper);
          display:flex;
          align-items:center;
          gap:8px;
        }
        .logo-mark{
          width:10px;height:10px;border-radius:50%;
          background:var(--brass);
          display:inline-block;
        }
        .nav-login{
          background:none;
          border:1px solid var(--line-dark);
          color:var(--paper);
          padding:9px 18px;
          border-radius:999px;
          font-size:14px;
          cursor:pointer;
          transition:border-color .15s ease, background .15s ease;
        }
        .nav-login:hover{ border-color:var(--brass); background:rgba(224,181,99,0.08); }

        /* ---------- Hero ---------- */
        .hero{
          background:linear-gradient(180deg,var(--ink) 0%,var(--ink-2) 100%);
          padding-bottom:72px;
        }
        .hero-grid{
          max-width:1180px;
          margin:0 auto;
          padding:56px 24px 0;
          display:grid;
          grid-template-columns:1.05fr 0.95fr;
          gap:56px;
          align-items:center;
        }
        .hero-eyebrow{ color:var(--brass-light); margin-bottom:22px; }
        .hero-title{
          font-size:44px;
          color:var(--paper);
          max-width:11ch;
        }
        .hero-title em{
          font-style:normal;
          color:var(--brass-light);
        }
        .hero-sub{
          margin:22px 0 30px;
          font-size:17px;
          line-height:1.6;
          color:rgba(237,234,225,0.72);
          max-width:46ch;
        }
        .hero-actions{ display:flex; gap:14px; flex-wrap:wrap; }
        .btn{
          padding:13px 24px;
          border-radius:999px;
          border:0;
          font-size:15px;
          font-weight:600;
          cursor:pointer;
          transition:transform .15s ease, box-shadow .15s ease, background .15s ease;
        }
        .btn-primary{ background:var(--brass); color:var(--ink); }
        .btn-primary:hover{ background:var(--brass-light); transform:translateY(-1px); }
        .btn-ghost{
          background:transparent;
          color:var(--paper);
          border:1px solid var(--line-dark);
        }
        .btn-ghost:hover{ border-color:var(--brass-light); color:var(--brass-light); }

        /* ---------- Transcript card (signature element) ---------- */
        .transcript{
          background-color:black;
          background:var(--paper);
          border-radius:14px;
          padding:22px 22px 20px;
          box-shadow:0 30px 60px -20px rgba(0,0,0,0.45);
          border:1px solid rgba(0,0,0,0.06);
        }
        .transcript-head{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:16px;
          padding-bottom:14px;
          border-bottom:1px solid var(--line);
        }
        .transcript-head .eyebrow{ color:var(--ink); }
        .rec-dot{
          width:7px;height:7px;border-radius:50%;
          background:var(--sage);
          display:inline-block;
        }
        .transcript-row{ margin-bottom:16px; }
        .transcript-row-last{ margin-bottom:0; }
        .transcript-role{
          font-family:'IBM Plex Mono',monospace;
          font-size:11px;
          letter-spacing:0.1em;
          text-transform:uppercase;
          color:rgba(43,46,54,0.5);
          margin-bottom:6px;
          display:block;
        }
        .transcript-time{
          font-size:11px;
          color:rgba(43,46,54,0.5);
        }
        .transcript-q{
          font-size:15px;
          line-height:1.55;
          color:var(--ink);
        }
        .transcript-a{
          font-size:15px;
          line-height:1.6;
          min-height:78px;
          color:var(--charcoal);
        }
        .cursor{
          display:inline-block;
          width:2px;height:15px;
          background:var(--ink);
          margin-left:2px;
          vertical-align:-2px;
          animation:blink 1s steps(1) infinite;
        }
        @media (prefers-reduced-motion: reduce){ .cursor{ animation:none; opacity:0; } }
        @keyframes blink{ 50%{ opacity:0; } }

        .meter-row{
          display:flex;
          align-items:center;
          gap:10px;
          margin-top:6px;
        }
        .meter-track{
          flex:1;
          height:6px;
          border-radius:999px;
          background:var(--paper-2);
          overflow:hidden;
        }
        .meter-fill{
          height:100%;
          width:var(--meter-width, 0%);
          border-radius:999px;
          background:linear-gradient(90deg,var(--brass),var(--sage));
          transition:width .12s linear;
        }
        .meter-score{
          font-family:'IBM Plex Mono',monospace;
          font-size:13px;
          color:var(--ink);
          min-width:34px;
          text-align:right;
        }

        /* ---------- How it works ---------- */
        .steps{
          max-width:1180px;
          margin:0 auto;
          padding:96px 24px;
        }
        .section-head{ max-width:52ch; margin-bottom:52px; }
        .section-head .eyebrow{ color:var(--brass); margin-bottom:14px; }
        .section-head h2{ font-size:32px; color:var(--ink); }
        .steps-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:0;
        }
        .step{
          padding:0 28px 0 0;
          border-left:1px solid var(--line);
          padding-left:28px;
        }
        .step:first-child{ border-left:0; padding-left:0; }
        .step-n{
          font-family:'IBM Plex Mono',monospace;
          font-size:13px;
          color:var(--brass);
          margin-bottom:14px;
        }
        .step h3{ font-size:21px; color:var(--ink); margin-bottom:10px; }
        .step p{ font-size:15px; line-height:1.6; color:rgba(43,46,54,0.72); margin:0; }

        /* ---------- Features ---------- */
        .features{
          background:var(--ink);
          padding:88px 24px;
        }
        .features-inner{ max-width:1180px; margin:0 auto; }
        .features .section-head h2{ color:var(--paper); }
        .features .section-head .eyebrow{ color:var(--brass-light); }
        .features-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:1px;
          background:var(--line-dark);
          border:1px solid var(--line-dark);
        }
        .feature-card{
          background:var(--ink);
          padding:28px 22px;
        }
        .feature-card svg{
          width:26px;height:26px;
          stroke:var(--brass-light);
          fill:none;
          stroke-width:1.5;
          margin-bottom:18px;
        }
        .feature-card h3{
          font-size:16px;
          color:var(--paper);
          margin-bottom:8px;
          font-weight:600;
          font-family:'Inter',sans-serif;
        }
        .feature-card p{
          font-size:14px;
          line-height:1.55;
          color:rgba(237,234,225,0.62);
          margin:0;
        }

        /* ---------- Readout / stats ---------- */
        .readout{
          max-width:1180px;
          margin:0 auto;
          padding:80px 24px;
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:32px;
        }
        .readout-item{ border-top:2px solid var(--ink); padding-top:16px; }
        .readout-value{
          font-family:'Fraunces',serif;
          font-size:34px;
          color:var(--ink);
        }
        .readout-label{
          font-size:13px;
          color:rgba(43,46,54,0.6);
          margin-top:6px;
        }

        /* ---------- CTA ---------- */
        .cta{
          background:linear-gradient(180deg,var(--ink-2) 0%,var(--ink) 100%);
          padding:96px 24px;
          text-align:center;
        }
        .cta h2{
          color:var(--paper);
          font-size:36px;
          max-width:18ch;
          margin:0 auto 14px;
        }
        .cta p{
          color:rgba(237,234,225,0.68);
          font-size:16px;
          margin-bottom:32px;
        }

        /* ---------- Footer ---------- */
        .footer{
          padding:28px 24px;
          background:var(--ink);
          border-top:1px solid var(--line-dark);
          text-align:center;
        }
        .footer p{ color:rgba(237,234,225,0.5); font-size:13px; margin:0 0 8px; }
        .footer-links{ display:flex; gap:18px; justify-content:center; }
        .footer-links a{
          color:rgba(237,234,225,0.6);
          text-decoration:none;
          font-size:13px;
        }
        .footer-links a:hover{ color:var(--brass-light); }

        /* ---------- Responsive ---------- */
        @media (max-width:860px){
          .hero-grid{ grid-template-columns:1fr; gap:40px; }
          .hero-title{ font-size:34px; max-width:none; }
          .steps-grid{ grid-template-columns:1fr; gap:32px; }
          .step{ border-left:0; padding-left:0; }
          .features-grid{ grid-template-columns:repeat(2,1fr); }
          .readout{ grid-template-columns:repeat(2,1fr); }
          .cta h2{ font-size:28px; }
        }
        @media (max-width:520px){
          .features-grid{ grid-template-columns:1fr; }
          .readout{ grid-template-columns:1fr 1fr; }
        }
      `}</style>

      {/* Nav */}
      <div className="hero">
        <nav className="nav">
          <span className="logo"><span className="logo-mark" />Resume Interview</span>
          <button className="nav-login" onClick={() => navigate('/login')}>Log in</button>
        </nav>

        {/* Hero */}
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow eyebrow">AI mock interviews</div>
            <h1 className="hero-title">
              Practice the interview <em>before</em> it happens.
            </h1>
            <p className="hero-sub">
              Upload your resume. Get interview questions built from your own experience.
              Answer out loud, see exactly how you did, and go again before the real one.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/login')}>
                Start practicing — it's free
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('/learn')}>
                See how it works
              </button>
            </div>
          </div>

          {/* Signature transcript element */}
          <div className="transcript" role="group" aria-label="Example practice session transcript">
            <div className="transcript-head">
              <span className="eyebrow"><span className="rec-dot" />Session · Live</span>
              <span className="mono transcript-time">00:42</span>
            </div>

            <div className="transcript-row">
              <span className="transcript-role">Interviewer</span>
              <p className="transcript-q">{QUESTION}</p>
            </div>

            <div className="transcript-row">
              <span className="transcript-role">You</span>
              <p className="transcript-a">
                {typedAnswer}
                {phase === 'typing' && <span className="cursor" aria-hidden="true" />}
              </p>
            </div>

            <div className="transcript-row transcript-row-last">
              <span className="transcript-role">Clarity score</span>
              <div className="meter-row">
                <div className="meter-track">
                  <div className="meter-fill" style={{ '--meter-width': `${(score / 100) * 100}%` }} />
                </div>
                <span className="meter-score mono">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="steps" aria-label="How it works">
        <div className="section-head">
          <div className="eyebrow">How it works</div>
          <h2>Three steps, no scheduling</h2>
        </div>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n mono">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features" aria-label="What you get">
        <div className="features-inner">
          <div className="section-head">
            <div className="eyebrow">What you get</div>
            <h2>Not another template question bank</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {f.icon}
                </svg>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readout / stats */}
      <section className="readout" aria-label="Results so far">
        {READOUT.map((r) => (
          <div className="readout-item" key={r.label}>
            <div className="readout-value">{r.value}</div>
            <div className="readout-label">{r.label}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="cta" aria-label="Get started">
        <h2>Your next interview starts on this page.</h2>
        <p>Free to try. No card, no scheduling, no waiting for a slot.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Start practicing — it's free
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Resume Interview. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}