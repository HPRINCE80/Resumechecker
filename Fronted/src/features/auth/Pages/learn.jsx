import React from 'react';
import { useNavigate } from 'react-router-dom';

const DETAILED_STEPS = [
  {
    n: '01',
    title: 'Upload your resume',
    body: 'Drop in a PDF or Word file. We parse your actual roles, projects, and skills — no forms to fill, no manual entry.',
    detail: 'Works with resumes up to 5MB. If you don\'t have one handy, a quick self-description works just as well.',
  },
  {
    n: '02',
    title: 'We build your questions',
    body: 'Your resume and the job description you\'re targeting get matched against each other to generate the exact questions a hiring manager would ask you.',
    detail: 'Behavioral, technical, and gap-focused questions — tailored to your background, not a generic bank everyone gets.',
  },
  {
    n: '03',
    title: 'Practice out loud',
    body: 'Answer each question by voice or text, just like a real interview. No pausing to think through what to say beforehand.',
    detail: 'Every session runs at your pace — 7am before the real thing, or twice in one evening.',
  },
  {
    n: '04',
    title: 'Get your score & transcript',
    body: 'Each answer is scored on clarity, structure, and delivery. The full transcript is saved so you can compare attempt one to attempt five.',
    detail: 'See exactly what to fix before you go into the real interview — not just a vague "good job."',
  },
];

const FAQS = [
  {
    q: 'Do I need a resume to start?',
    a: 'No — a short self-description of your experience works too. A resume just gives more precise, tailored questions.',
  },
  {
    q: 'How long does one practice session take?',
    a: 'Most sessions run 15–30 minutes depending on how many questions you answer. There\'s no fixed length — stop whenever you want.',
  },
  {
    q: 'Is my data kept private?',
    a: 'Your resume and transcripts are tied to your account only and are never shared or used to train question banks for other users.',
  },
  {
    q: 'Can I practice for a specific job posting?',
    a: 'Yes — paste the job description alongside your resume and the questions will be built specifically around that role.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="how-it-works">
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
        .how-it-works{
          font-family:'Inter',system-ui,sans-serif;
          color:var(--charcoal);
          background:var(--paper);
          -webkit-font-smoothing:antialiased;
        }
        .how-it-works h1, .how-it-works h2, .how-it-works h3{
          font-family:'Fraunces',Georgia,serif;
          font-weight:500;
          line-height:1.1;
          margin:0;
        }
        .mono{ font-family:'IBM Plex Mono',monospace; letter-spacing:0.06em; }
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
          width:16px; height:1px;
          background:currentColor;
          opacity:0.6;
        }
        button{font-family:inherit}
        button:focus-visible{ outline:2px solid var(--brass); outline-offset:3px; }

        /* Nav */
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
          cursor:pointer;
        }
        .logo-mark{ width:10px;height:10px;border-radius:50%; background:var(--brass); display:inline-block; }
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

        /* Header */
        .header{
          background:linear-gradient(180deg,var(--ink) 0%,var(--ink-2) 100%);
          padding:56px 24px 72px;
        }
        .header-inner{ max-width:760px; margin:0 auto; text-align:center; }
        .header-eyebrow{ color:var(--brass-light); justify-content:center; margin-bottom:22px; }
        .header h1{ font-size:40px; color:var(--paper); }
        .header p{
          margin:20px auto 0;
          font-size:17px;
          line-height:1.6;
          color:rgba(237,234,225,0.72);
          max-width:52ch;
        }

        /* Detailed steps */
        .detail-steps{
          max-width:880px;
          margin:0 auto;
          padding:88px 24px;
        }
        .detail-step{
          display:grid;
          grid-template-columns:80px 1fr;
          gap:28px;
          padding:36px 0;
          border-top:1px solid var(--line);
        }
        .detail-step:first-child{ border-top:0; padding-top:0; }
        .detail-step-n{
          font-family:'IBM Plex Mono',monospace;
          font-size:15px;
          color:var(--brass);
        }
        .detail-step h3{ font-size:24px; color:var(--ink); margin-bottom:10px; }
        .detail-step-body{ font-size:16px; line-height:1.65; color:var(--charcoal); margin-bottom:10px; }
        .detail-step-detail{ font-size:14px; line-height:1.6; color:rgba(43,46,54,0.6); }

        /* FAQ */
        .faq{ background:var(--ink); padding:88px 24px; }
        .faq-inner{ max-width:760px; margin:0 auto; }
        .faq .section-head{ margin-bottom:48px; text-align:center; }
        .faq .eyebrow{ color:var(--brass-light); justify-content:center; }
        .faq h2{ font-size:32px; color:var(--paper); margin-top:14px; }
        .faq-item{
          padding:24px 0;
          border-top:1px solid var(--line-dark);
        }
        .faq-item:last-child{ border-bottom:1px solid var(--line-dark); }
        .faq-item h3{
          font-family:'Inter',sans-serif;
          font-weight:600;
          font-size:16px;
          color:var(--paper);
          margin-bottom:8px;
        }
        .faq-item p{
          font-size:14px;
          line-height:1.6;
          color:rgba(237,234,225,0.62);
          margin:0;
        }

        /* CTA */
        .cta{
          background:linear-gradient(180deg,var(--ink-2) 0%,var(--ink) 100%);
          padding:96px 24px;
          text-align:center;
        }
        .cta h2{ color:var(--paper); font-size:36px; max-width:18ch; margin:0 auto 14px; }
        .cta p{ color:rgba(237,234,225,0.68); font-size:16px; margin-bottom:32px; }
        .btn{
          padding:13px 24px;
          border-radius:999px;
          border:0;
          font-size:15px;
          font-weight:600;
          cursor:pointer;
          transition:transform .15s ease, background .15s ease;
        }
        .btn-primary{ background:var(--brass); color:var(--ink); }
        .btn-primary:hover{ background:var(--brass-light); transform:translateY(-1px); }

        /* Footer */
        .footer{
          padding:28px 24px;
          background:var(--ink);
          border-top:1px solid var(--line-dark);
          text-align:center;
        }
        .footer p{ color:rgba(237,234,225,0.5); font-size:13px; margin:0; }

        @media (max-width:600px){
          .header h1{ font-size:30px; }
          .detail-step{ grid-template-columns:1fr; gap:10px; }
        }
      `}</style>

      {/* Nav */}
      <div className="header">
        <nav className="nav">
          <span className="logo" onClick={() => navigate('/')}>
            <span className="logo-mark" />Resume Interview
          </span>
          <button className="nav-login" onClick={() => navigate('/login')}>Log in</button>
        </nav>

        <div className="header-inner">
          <div className="header-eyebrow eyebrow">How it works</div>
          <h1>Four steps between you and a sharper interview.</h1>
          <p>No scheduling, no generic question bank. Everything is built from your actual resume and the role you're going for.</p>
        </div>
      </div>

      {/* Detailed Steps */}
      <section className="detail-steps">
        {DETAILED_STEPS.map((s) => (
          <div className="detail-step" key={s.n}>
            <div className="detail-step-n mono">{s.n}</div>
            <div>
              <h3>{s.title}</h3>
              <p className="detail-step-body">{s.body}</p>
              <p className="detail-step-detail">{s.detail}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq-inner">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          {FAQS.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to see how you'd actually do?</h2>
        <p>Free to try. No card, no scheduling.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Start practicing — it's free
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Resume Interview. All rights reserved.</p>
      </footer>
    </div>
  );
}