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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-slate-900 rounded-full"></span>
          <span className="font-bold text-base tracking-tight">InterviewEngine</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/resume-builder")}
            className="px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
          >
            Resume Builder
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-3.5 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 flex-1">
        {/* Page Header */}
        <header className="mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Strategy Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Generate your custom interview plan.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Paste the target job description and provide your profile details to build a tailored roadmap.
          </p>
        </header>

        {/* Workspace Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left Panel: Job Description */}
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="jobDescription" className="font-semibold text-sm text-slate-900">
                  Target Job Description
                </label>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 rounded">
                  Required
                </span>
              </div>
              <textarea
                value={jobDescription}
                id="jobDescription"
                name="jobDescription"
                aria-label="Target job description"
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-64 sm:h-72 border border-slate-200 rounded-lg p-3.5 text-sm bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 resize-y transition"
                placeholder="Paste complete job description, requirements, and tech stack here..."
                maxLength={5000}
              />
              <div className="text-xs text-slate-400 text-right mt-2">
                {jobDescription.length} / 5000
              </div>
            </div>

            {/* Right Panel: Candidate Profile */}
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-sm text-slate-900">Your Professional Profile</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded">
                  Recommended
                </span>
              </div>

              {/* Resume File Upload */}
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
                  className="flex items-center justify-center p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400 cursor-pointer transition text-center"
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="truncate max-w-[220px]">
                      {resumeFileName ? resumeFileName : "Upload resume (PDF, DOCX up to 5MB)"}
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex items-center text-center my-3">
                <div className="flex-1 border-b border-slate-200"></div>
                <span className="px-3 text-xs text-slate-400 lowercase">or enter quick summary</span>
                <div className="flex-1 border-b border-slate-200"></div>
              </div>

              {/* Self Description */}
              <div className="flex flex-col flex-1">
                <textarea
                  value={selfDescription}
                  maxLength={1000}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  name="selfDescription"
                  className="w-full h-28 border border-slate-200 rounded-lg p-3 text-sm bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 resize-none transition"
                  placeholder="Summary of experience, key skills, and domain expertise..."
                />
                <div className="text-xs text-slate-400 text-right mt-1.5">
                  {selfDescription.length} / 1000
                </div>
              </div>
            </div>

          </div>

          {/* Card Action Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 sm:px-8 bg-slate-50/80 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Requires either a resume or a short description.
            </span>
            <button
              type="button"
              onClick={handleGenerateReport}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-medium text-sm px-6 py-2.5 rounded-lg transition inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Analyzing profile &amp; role...
                </>
              ) : (
                "Generate Interview Strategy"
              )}
            </button>
          </div>
        </div>

        {/* Recent Reports Section */}
        {reports.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-4 cursor-pointer transition shadow-2xs hover:shadow-md flex justify-between items-center"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="min-w-0 pr-2">
                    <h3 className="text-sm font-semibold text-slate-900 truncate mb-1">
                      {report.title || "Untitled Role"}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2 py-1 rounded ${
                      report.matchScore >= 80
                        ? "bg-emerald-50 text-emerald-700"
                        : report.matchScore >= 60
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {report.matchScore}% Match
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="max-w-5xl w-full mx-auto px-6 py-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} InterviewEngine. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-slate-900 transition">Privacy</a>
          <a href="#terms" className="hover:text-slate-900 transition">Terms</a>
          <a href="#support" className="hover:text-slate-900 transition">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;