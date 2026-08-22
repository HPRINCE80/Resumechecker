// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getInterviewReportById } from '../Services/interview.api.js';

// const severityAccent = {
//   high: 'bg-red-500/20 text-red-300 border-red-400/40',
//   medium: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
//   low: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
// };

// export default function InterviewPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const data = await getInterviewReportById(id);
//         setReport(data.interviewReport);
//       } catch (err) {
//         setError(err?.message || 'Failed to load report');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchReport();
//   }, [id]);

//   // ---- Loading state ----
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center">
//         <div className="animate-pulse text-slate-400 text-sm uppercase tracking-[0.2em]">
//           Loading interview report...
//         </div>
//       </div>
//     );
//   }

//   // ---- Error state ----
//   if (error || !report) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
//         <p className="text-slate-300">{error || 'Report not found'}</p>
//         <button
//           onClick={() => navigate('/')}
//           className="rounded-full border border-cyan-400/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
//         >
//           Back to home
//         </button>
//       </div>
//     );
//   }

//   const {
//     title,
//     matchScore,
//     technicalQuestions = [],
//     behavioralQuestions = [],
//     skillGaps = [],
//     preparationPlan = [],
//     createdAt,
//   } = report;

//   const highlights = [
//     { label: 'Match score', value: `${matchScore ?? 0}%`, accent: 'bg-emerald-500/20 text-emerald-300' },
//     { label: 'Technical Qs', value: technicalQuestions.length, accent: 'bg-sky-500/20 text-sky-300' },
//     { label: 'Behavioral Qs', value: behavioralQuestions.length, accent: 'bg-violet-500/20 text-violet-300' },
//   ];

//   return (
//     <div className="relative min-h-screen bg-slate-950 text-white">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />

//       <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-sm font-bold text-slate-950">
//               A
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI Resume</p>
//               <h1 className="text-sm font-semibold text-slate-100">Interview Report</h1>
//             </div>
//           </div>

//           <button
//             onClick={() => navigate('/')}
//             className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <path d="M3 10.5 12 3l9 7.5" />
//               <path d="M5 9.5V20h14V9.5" />
//               <path d="M9 20v-7h6v7" />
//             </svg>
//             Home
//           </button>
//         </header>

//         <main className="space-y-8">
//           {/* Overview */}
//           <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:p-8">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
//                 <span className="h-2 w-2 rounded-full bg-violet-400" />
//                 {createdAt ? `Generated ${new Date(createdAt).toLocaleDateString()}` : 'Report'}
//               </div>

//               <h2 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-5xl">
//                 {title || 'Untitled Position'}
//               </h2>

//               <div className="grid gap-4 sm:grid-cols-3">
//                 {highlights.map((item) => (
//                   <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
//                     <div className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.accent}`}>
//                       {item.label}
//                     </div>
//                     <p className="text-2xl font-bold text-white">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Skill Gaps */}
//           {skillGaps.length > 0 && (
//             <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
//               <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Analysis</p>
//               <h3 className="mt-2 text-3xl font-bold text-white">Skill gaps</h3>

//               <div className="mt-6 flex flex-wrap gap-3">
//                 {skillGaps.map((gap) => (
//                   <span
//                     key={gap.skill}
//                     className={`rounded-full border px-3 py-1.5 text-sm font-medium ${severityAccent[gap.severity] || severityAccent.medium}`}
//                   >
//                     {gap.skill} · {gap.severity}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Technical Questions */}
//           {technicalQuestions.length > 0 && (
//             <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
//               <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Practice</p>
//               <h3 className="mt-2 text-3xl font-bold text-white">Technical questions</h3>

//               <div className="mt-6 space-y-4">
//                 {technicalQuestions.map((q, index) => (
//                   <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
//                     <div className="flex gap-4">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">
//                         {index + 1}
//                       </div>
//                       <div className="flex-1 space-y-2">
//                         <h4 className="text-lg font-semibold text-white">{q.question}</h4>
//                         <p className="text-sm text-slate-400">
//                           <span className="text-slate-500">Why they ask this:</span> {q.intention}
//                         </p>
//                         <details className="mt-2 text-sm text-slate-300">
//                           <summary className="cursor-pointer text-cyan-300">Sample answer</summary>
//                           <p className="mt-2 leading-6">{q.answer}</p>
//                         </details>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Behavioral Questions */}
//           {behavioralQuestions.length > 0 && (
//             <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
//               <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Practice</p>
//               <h3 className="mt-2 text-3xl font-bold text-white">Behavioral questions</h3>

//               <div className="mt-6 space-y-4">
//                 {behavioralQuestions.map((q, index) => (
//                   <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
//                     <div className="flex gap-4">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 font-bold text-slate-950">
//                         {index + 1}
//                       </div>
//                       <div className="flex-1 space-y-2">
//                         <h4 className="text-lg font-semibold text-white">{q.question}</h4>
//                         <p className="text-sm text-slate-400">
//                           <span className="text-slate-500">Why they ask this:</span> {q.intention}
//                         </p>
//                         <details className="mt-2 text-sm text-slate-300">
//                           <summary className="cursor-pointer text-cyan-300">Sample answer</summary>
//                           <p className="mt-2 leading-6">{q.answer}</p>
//                         </details>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Preparation Plan */}
//           {preparationPlan.length > 0 && (
//             <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/70 p-6 backdrop-blur-xl">
//               <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Preparation plan</p>
//               <h3 className="mt-2 text-3xl font-bold text-white">Your day-by-day plan</h3>

//               <div className="mt-6 space-y-4">
//                 {preparationPlan
//                   .sort((a, b) => a.day - b.day)
//                   .map((plan) => (
//                     <div key={plan.day} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
//                       <div className="flex items-center gap-3 mb-3">
//                         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-bold text-slate-950">
//                           D{plan.day}
//                         </span>
//                         <h4 className="text-lg font-semibold text-white">{plan.focus}</h4>
//                       </div>
//                       <ul className="ml-11 space-y-1.5">
//                         {plan.tasks.map((task, i) => (
//                           <li key={i} className="text-sm text-slate-300 list-disc">
//                             {task}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//               </div>
//             </section>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInterviewReportById } from '../Services/interview.api.js';

const severityAccent = {
  high: 'bg-red-500/10 text-red-300 border-red-500/30',
  medium: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  low: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
};

const scoreBand = (score) => {
  if (score >= 75) return { color: '#3fb950', label: 'Strong match' };
  if (score >= 50) return { color: '#d29922', label: 'Moderate match' };
  return { color: '#f85149', label: 'Needs work' };
};

export default function InterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getInterviewReportById(id);
        setReport(data.interviewReport);
      } catch (err) {
        setError(err?.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReport();
  }, [id]);

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-pulse text-[#7d8590] text-sm uppercase tracking-[0.2em]">
          Loading interview report...
        </div>
      </div>
    );
  }

  // ---- Error state ----
  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center gap-4">
        <p className="text-[#e6edf3]">{error || 'Report not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#e6edf3] transition hover:bg-white/[0.08] hover:border-white/25"
        >
          Back to home
        </button>
      </div>
    );
  }

  const {
    title,
    matchScore = 0,
    technicalQuestions = [],
    behavioralQuestions = [],
    skillGaps = [],
    preparationPlan = [],
    createdAt,
  } = report;

  const band = scoreBand(matchScore);

  const highlights = [
    { label: 'Match score', value: `${matchScore}%` },
    { label: 'Technical Qs', value: technicalQuestions.length },
    { label: 'Behavioral Qs', value: behavioralQuestions.length },
  ];

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* subtle single-tone glow, not a rainbow blob */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,45,120,0.08),_transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl sm:rounded-full border border-[#2a3348] bg-[#161b22] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2d78] text-sm font-bold text-white">
              A
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#7d8590]">AI Resume</p>
              <h1 className="text-sm font-semibold text-[#e6edf3]">Interview Report</h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#e6edf3] transition hover:bg-white/[0.08] hover:border-white/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20h14V9.5" />
              <path d="M9 20v-7h6v7" />
            </svg>
            Home
          </button>
        </header>

        <main className="space-y-6">
          {/* Overview */}
          <section className="rounded-3xl border border-[#2a3348] bg-[#161b22] p-6 lg:p-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff2d78]/30 bg-[#ff2d78]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#ff6b9d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff2d78]" />
                {createdAt ? `Generated ${new Date(createdAt).toLocaleDateString()}` : 'Report'}
              </div>

              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#e6edf3] md:text-4xl">
                {title || 'Untitled Position'}
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#2a3348] bg-[#0d1117] p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#7d8590]">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-[#e6edf3]">{item.value}</p>

                    {item.label === 'Match score' && (
                      <div className="mt-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e2535]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${matchScore}%`, backgroundColor: band.color }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs" style={{ color: band.color }}>
                          {band.label}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skill Gaps */}
          {skillGaps.length > 0 && (
            <section className="rounded-3xl border border-[#2a3348] bg-[#161b22] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7d8590]">Analysis</p>
              <h3 className="mt-2 text-2xl font-bold text-[#e6edf3]">Skill gaps</h3>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {skillGaps.map((gap, index) => (
                  <span
                    key={`${gap.skill}-${index}`}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium ${severityAccent[gap.severity] || severityAccent.medium}`}
                  >
                    {gap.skill} · {gap.severity}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Technical Questions */}
          {technicalQuestions.length > 0 && (
            <section className="rounded-3xl border border-[#2a3348] bg-[#161b22] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7d8590]">Practice</p>
              <h3 className="mt-2 text-2xl font-bold text-[#e6edf3]">Technical questions</h3>

              <div className="mt-5 space-y-3">
                {technicalQuestions.map((q, index) => (
                  <div key={index} className="rounded-2xl border border-[#2a3348] bg-[#0d1117] p-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#ff2d78]/30 bg-[#ff2d78]/10 text-sm font-bold text-[#ff6b9d]">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-base font-semibold text-[#e6edf3]">{q.question}</h4>
                        <p className="text-sm text-[#7d8590]">
                          <span className="text-[#565f6f]">Why they ask this:</span> {q.intention}
                        </p>
                        <details className="mt-2 text-sm text-[#c9d1d9]">
                          <summary className="cursor-pointer text-[#ff6b9d]">Sample answer</summary>
                          <p className="mt-2 leading-6 text-[#a8b1bd]">{q.answer}</p>
                        </details>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Behavioral Questions */}
          {behavioralQuestions.length > 0 && (
            <section className="rounded-3xl border border-[#2a3348] bg-[#161b22] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7d8590]">Practice</p>
              <h3 className="mt-2 text-2xl font-bold text-[#e6edf3]">Behavioral questions</h3>

              <div className="mt-5 space-y-3">
                {behavioralQuestions.map((q, index) => (
                  <div key={index} className="rounded-2xl border border-[#2a3348] bg-[#0d1117] p-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#ff2d78]/30 bg-[#ff2d78]/10 text-sm font-bold text-[#ff6b9d]">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="text-base font-semibold text-[#e6edf3]">{q.question}</h4>
                        <p className="text-sm text-[#7d8590]">
                          <span className="text-[#565f6f]">Why they ask this:</span> {q.intention}
                        </p>
                        <details className="mt-2 text-sm text-[#c9d1d9]">
                          <summary className="cursor-pointer text-[#ff6b9d]">Sample answer</summary>
                          <p className="mt-2 leading-6 text-[#a8b1bd]">{q.answer}</p>
                        </details>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Preparation Plan */}
          {preparationPlan.length > 0 && (
            <section className="rounded-3xl border border-[#2a3348] bg-[#161b22] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7d8590]">Preparation plan</p>
              <h3 className="mt-2 text-2xl font-bold text-[#e6edf3]">Your day-by-day plan</h3>

              <div className="mt-5 space-y-3">
                {[...preparationPlan]
                  .sort((a, b) => a.day - b.day)
                  .map((plan) => (
                    <div key={plan.day} className="rounded-2xl border border-[#2a3348] bg-[#0d1117] p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ff2d78]/30 bg-[#ff2d78]/10 text-xs font-bold text-[#ff6b9d]">
                          D{plan.day}
                        </span>
                        <h4 className="text-base font-semibold text-[#e6edf3]">{plan.focus}</h4>
                      </div>
                      <ul className="ml-10 space-y-1.5">
                        {plan.tasks.map((task, i) => (
                          <li key={i} className="list-disc text-sm text-[#a8b1bd]">
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}