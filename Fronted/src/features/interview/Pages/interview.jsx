import React from 'react';

const interviewSteps = [
  { title: 'Intro & overview', detail: 'We align on the role, expectations, and your background.', time: '10 min' },
  { title: 'Technical deep dive', detail: 'We assess your thinking, execution, and problem-solving.', time: '25 min' },
  { title: 'Behavioral fit', detail: 'We explore communication, ownership, and collaboration.', time: '15 min' },
  { title: 'Q&A & next steps', detail: 'You ask questions and we share the hiring roadmap.', time: '10 min' },
];

const highlights = [
  { label: 'Interview score', value: '92%', accent: 'bg-emerald-500/20 text-emerald-300' },
  { label: 'Avg. response time', value: '24h', accent: 'bg-sky-500/20 text-sky-300' },
  { label: 'Role match', value: '96%', accent: 'bg-violet-500/20 text-violet-300' },
];

const skills = ['React', 'JavaScript', 'System Design', 'Node.js', 'Product Thinking', 'Communication'];

const schedule = [
  { day: 'Mon', date: '12', time: '10:00 AM', tag: 'Final round' },
  { day: 'Wed', date: '14', time: '2:30 PM', tag: 'Panel sync' },
  { day: 'Fri', date: '16', time: '11:00 AM', tag: 'Offer review' },
];

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-sm font-bold text-slate-950">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI Resume</p>
              <h1 className="text-sm font-semibold text-slate-100">Interview Portal</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#overview" className="transition hover:text-white">Overview</a>
            <a href="#process" className="transition hover:text-white">Process</a>
            <a href="#team" className="transition hover:text-white">Team</a>
            <a href="#resources" className="transition hover:text-white">Resources</a>
          </nav>

          <button className="rounded-full border border-cyan-400/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
            Book a slot
          </button>
        </header>

        <main className="space-y-8">
          <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Next round scheduled
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Frontend engineer interview</p>
                <h2 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
                  Build the future.<br />
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                    Lead with clarity.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-base text-slate-300 md:text-lg">
                This interview is designed to explore your product instincts, technical depth, and how you turn ambiguity into momentum.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]">
                  Start interview
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                  View agenda
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <div className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.accent}`}>
                      {item.label}
                    </div>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/80 p-5 shadow-xl shadow-violet-950/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Candidate</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Sarah Chen</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-xl font-black text-slate-950">
                  SC
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Profile strength</span>
                    <span className="font-semibold text-white">87%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div className="h-2.5 w-[87%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Role</p>
                    <p className="mt-3 text-lg font-semibold text-white">Senior Frontend</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                    <p className="mt-3 text-lg font-semibold text-white">Remote / US</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">Core strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Interview process</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">What to expect</h3>
                </div>
                <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  4 steps
                </div>
              </div>

              <div className="space-y-4">
                {interviewSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">{step.time}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="team" className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Panel</p>
              <h3 className="mt-2 text-3xl font-bold text-white">Meet your team</h3>

              <div className="mt-6 space-y-4">
                {[
                  { name: 'Maya Patel', role: 'Engineering Manager', badge: 'Leadership' },
                  { name: 'Owen Brooks', role: 'Senior Product Engineer', badge: 'Systems' },
                  { name: 'Nina Torres', role: 'Design & UX Lead', badge: 'Design' },
                ].map((member) => (
                  <div key={member.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 font-semibold text-slate-950">
                      {member.name.split(' ').map((x) => x[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.role}</p>
                    </div>
                    <span className="rounded-full border border-violet-400/40 bg-violet-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-violet-200">
                      {member.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="resources" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Schedule</p>
              <h3 className="mt-2 text-3xl font-bold text-white">Upcoming sessions</h3>

              <div className="mt-6 space-y-4">
                {schedule.map((item) => (
                  <div key={`${item.day}-${item.date}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-center">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-300">{item.day}</span>
                      <span className="text-2xl font-bold text-white">{item.date}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-300">{item.time}</p>
                      <p className="mt-1 text-base font-semibold text-white">{item.tag}</p>
                    </div>
                    <button className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/70 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Preparation checklist</p>
              <h3 className="mt-2 text-3xl font-bold text-white">Be ready to impress</h3>

              <div className="mt-6 space-y-4">
                {[
                  'Review the product architecture and trade-offs you have made recently.',
                  'Prepare 2–3 examples of user-impacting decisions and the outcomes you drove.',
                  'Bring a short list of questions around roadmap, culture, and engineering standards.',
                  'Be ready to discuss your process for shipping quality software in fast-moving teams.',
                ].map((point, idx) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-slate-950">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="text-sm text-cyan-100">
                  Need a quick reset? Join our mock interview room for a 15-minute walkthrough before the live session.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
