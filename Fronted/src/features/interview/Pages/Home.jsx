import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../Hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setResumeFileName(file.name);
    } else {
      setResumeFileName("");
      if (file) {
        e.target.value = "";
        window.alert("Please choose a PDF or DOCX file smaller than 5MB.");
      }
    }
  };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files[0];
    if (!jobDescription.trim()) {
      window.alert("Please add the target job description first.");
      return;
    }
    if (!resumeFile && !selfDescription.trim()) {
      window.alert("Upload a resume or add a quick self-description.");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Floating Modern Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 lg:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            InterviewEngine
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/resume-builder")}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition"
          >
            Resume Builder
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-3.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-900/50 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Next-Gen AI Strategy Generator
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Engineer your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">dream career</span> move.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Provide the target role details and your background to construct an elite custom interview preparation blueprint.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Job Description (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <label htmlFor="jobDescription" className="font-semibold text-base text-white">
                    Target Job Description
                  </label>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                  Required
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Paste the detailed responsibilities, qualifications, and core tech stack.
              </p>
            </div>

            <div className="flex-1 flex flex-col">
              <textarea
                value={jobDescription}
                id="jobDescription"
                name="jobDescription"
                aria-label="Target job description"
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-56 sm:h-64 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-y transition"
                placeholder="e.g. Senior Backend Engineer at Stripe requiring deep knowledge of distributed systems, Go, and AWS..."
                maxLength={5000}
              />
              <div className="text-xs text-slate-500 text-right mt-2 font-mono">
                {jobDescription.length} / 5000 chars
              </div>
            </div>
          </div>

          {/* Card 2: Candidate Profile (1 Column Bento Box) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition">
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <span className="font-semibold text-base text-white">Your Profile</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  Flexible
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="mb-4">
                <input
                  ref={resumeInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl bg-slate-950/40 hover:bg-slate-950/70 cursor-pointer transition text-center group/drop"
                >
                  <svg className="w-6 h-6 text-slate-400 group-hover/drop:text-indigo-400 mb-1.5 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  <span className="text-xs font-medium text-slate-300 truncate max-w-[200px]">
                    {resumeFileName ? resumeFileName : "Upload Resume (PDF/DOCX)"}
                  </span>
                </label>
              </div>

              <div className="flex items-center text-center my-3">
                <div className="flex-1 border-b border-slate-800"></div>
                <span className="px-3 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">or summary</span>
                <div className="flex-1 border-b border-slate-800"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <textarea
                value={selfDescription}
                maxLength={1000}
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                className="w-full h-24 bg-slate-950/60 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none transition"
                placeholder="Brief summary of skills..."
              />
              <div className="text-xs text-slate-500 text-right mt-1 font-mono">
                {selfDescription.length} / 1000
              </div>
            </div>
          </div>

        </div>

        {/* Action Bar Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 mb-16 shadow-xl">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            AI engine ready &bull; Requires resume or quick summary
          </div>
          <button
            type="button"
            onClick={handleGenerateReport}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 hover:opacity-95 active:scale-[0.98] text-white font-semibold text-sm px-8 py-3 rounded-xl transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Synthesizing Strategy Plan...
              </>
            ) : (
              <>
                <span>Generate Strategy Blueprint</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </>
            )}
          </button>
        </div>

        {/* Recent Reports List */}
        {reports.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Recent Interview Blueprints</h2>
              <span className="text-xs font-medium text-slate-400">{reports.length} generated</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-5 cursor-pointer transition shadow-lg hover:shadow-indigo-500/5 group flex flex-col justify-between"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition truncate mb-1">
                      {report.title || "Untitled Role"}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Created on {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-800/60">
                    <span className="text-xs text-slate-400 font-medium">Match Score</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        report.matchScore >= 80
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : report.matchScore >= 60
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {report.matchScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center sm:text-left">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} InterviewEngine. Built for elite candidates.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#support" className="hover:text-slate-300 transition">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;