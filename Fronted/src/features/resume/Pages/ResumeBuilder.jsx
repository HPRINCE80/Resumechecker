import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../Hooks/useResume';

const emptyExp = { role: '', company: '', startDate: '', endDate: '', description: '' };
const emptyEdu = { degree: '', institution: '', startDate: '', endDate: '' };
const emptyProject = { title: '', description: '' };

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const { loading, error, generateResume } = useResume();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', location: '', summary: '',
    experience: [emptyExp],
    education: [emptyEdu],
    skills: [''],
    projects: [emptyProject],
    certifications: [''],
    template: 'modern',
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateListItem = (field, index, key, value) => {
    setForm((f) => {
      const list = [...f[field]];
      list[index] = { ...list[index], [key]: value };
      return { ...f, [field]: list };
    });
  };

  const updateSimpleListItem = (field, index, value) => {
    setForm((f) => {
      const list = [...f[field]];
      list[index] = value;
      return { ...f, [field]: list };
    });
  };

  const addItem = (field, emptyValue) => setForm((f) => ({ ...f, [field]: [...f[field], emptyValue] }));
  const removeItem = (field, index) => setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));

  const handleSubmit = async () => {
    if (!form.fullName.trim()) {
      alert('Full name is required');
      return;
    }
    try {
      const payload = {
        ...form,
        skills: form.skills.filter((s) => s.trim()),
        certifications: form.certifications.filter((c) => c.trim()),
      };
      await generateResume(payload);
    } catch (err) {
      console.error('Resume generation failed:', err);
    }
  };

  const steps = [
    { id: 1, label: 'Personal', desc: 'Basic info' },
    { id: 2, label: 'Experience', desc: 'Work history' },
    { id: 3, label: 'Education', desc: 'Academics' },
    { id: 4, label: 'Skills & Projects', desc: 'Expertise' },
    { id: 5, label: 'Template', desc: 'Final look' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800 px-6 lg:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">
            RB
          </div>
          <span className="font-bold text-sm tracking-tight text-white">Resume Generator</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-full transition"
        >
          &larr; Back to Dashboard
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 flex-1 flex flex-col">
        
        {/* Step Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {steps[step - 1].label} Details
            </h1>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
              Step {step} of 5
            </span>
          </div>

          {/* Progress Bar Grid */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s.id === step
                      ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                      : s.id < step
                      ? 'bg-slate-700'
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                />
                <span className={`text-[10px] hidden sm:block truncate ${s.id === step ? 'text-rose-400 font-medium' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Form Container */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6 relative">
          
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Full Name *</label>
                  <input
                    className="w-full rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition"
                    placeholder="e.g. Alex Morgan"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Email Address</label>
                  <input
                    className="w-full rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition"
                    placeholder="e.g. alex@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Phone Number</label>
                  <input
                    className="w-full rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Location</label>
                  <input
                    className="w-full rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition"
                    placeholder="e.g. San Francisco, CA"
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-medium text-slate-400">Professional Summary</label>
                <textarea
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition resize-none"
                  placeholder="A concise summary highlighting your primary career achievements..."
                  rows={4}
                  value={form.summary}
                  onChange={(e) => update('summary', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="space-y-6">
              {form.experience.map((exp, i) => (
                <div key={i} className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 sm:p-5 space-y-3 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-rose-400 font-mono">Experience #{i + 1}</span>
                    {form.experience.length > 1 && (
                      <button
                        onClick={() => removeItem('experience', i)}
                        className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-md transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Role / Title (e.g. Senior Frontend Engineer)"
                      value={exp.role}
                      onChange={(e) => updateListItem('experience', i, 'role', e.target.value)}
                    />
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateListItem('experience', i, 'company', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Start (e.g. Jan 2023)"
                      value={exp.startDate}
                      onChange={(e) => updateListItem('experience', i, 'startDate', e.target.value)}
                    />
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="End (e.g. Present)"
                      value={exp.endDate}
                      onChange={(e) => updateListItem('experience', i, 'endDate', e.target.value)}
                    />
                  </div>
                  <textarea
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 resize-none"
                    placeholder="Key responsibilities and technical accomplishments..."
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateListItem('experience', i, 'description', e.target.value)}
                  />
                </div>
              ))}
              <button
                onClick={() => addItem('experience', emptyExp)}
                className="w-full py-3 border border-dashed border-slate-700 hover:border-rose-500 rounded-xl text-xs font-semibold text-rose-400 bg-slate-950/20 hover:bg-slate-950/60 transition flex items-center justify-center gap-1.5"
              >
                <span>+ Add another experience</span>
              </button>
            </div>
          )}

          {/* Step 3: Education */}
          {step === 3 && (
            <div className="space-y-6">
              {form.education.map((edu, i) => (
                <div key={i} className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 sm:p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-rose-400 font-mono">Education #{i + 1}</span>
                    {form.education.length > 1 && (
                      <button
                        onClick={() => removeItem('education', i)}
                        className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-md transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                    placeholder="Degree / Major (e.g. B.S. in Computer Science)"
                    value={edu.degree}
                    onChange={(e) => updateListItem('education', i, 'degree', e.target.value)}
                  />
                  <input
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => updateListItem('education', i, 'institution', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Start Year"
                      value={edu.startDate}
                      onChange={(e) => updateListItem('education', i, 'startDate', e.target.value)}
                    />
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Graduation Year"
                      value={edu.endDate}
                      onChange={(e) => updateListItem('education', i, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => addItem('education', emptyEdu)}
                className="w-full py-3 border border-dashed border-slate-700 hover:border-rose-500 rounded-xl text-xs font-semibold text-rose-400 bg-slate-950/20 hover:bg-slate-950/60 transition flex items-center justify-center gap-1.5"
              >
                <span>+ Add another education</span>
              </button>
            </div>
          )}

          {/* Step 4: Skills, Projects & Certifications */}
          {step === 4 && (
            <div className="space-y-6">
              
              {/* Skills section */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Core Skills</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {form.skills.map((skill, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                        placeholder="e.g. React, TypeScript, Node.js"
                        value={skill}
                        onChange={(e) => updateSimpleListItem('skills', i, e.target.value)}
                      />
                      {form.skills.length > 1 && (
                        <button onClick={() => removeItem('skills', i)} className="text-xs text-rose-400 px-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-rose-500/10 transition">
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('skills', '')} className="text-xs font-medium text-rose-400 hover:underline pt-1 inline-block">
                  + Add skill
                </button>
              </div>

              <div className="border-t border-slate-800/80 pt-5"></div>

              {/* Projects section */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Notable Projects</label>
                {form.projects.map((proj, i) => (
                  <div key={i} className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-rose-400 font-mono">Project #{i + 1}</span>
                      {form.projects.length > 1 && (
                        <button onClick={() => removeItem('projects', i)} className="text-xs text-rose-400">Remove</button>
                      )}
                    </div>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                      placeholder="Project Title & Link"
                      value={proj.title}
                      onChange={(e) => updateListItem('projects', i, 'title', e.target.value)}
                    />
                    <textarea
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500 resize-none"
                      placeholder="Brief overview of features, scale, and tech stack..."
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateListItem('projects', i, 'description', e.target.value)}
                    />
                  </div>
                ))}
                <button onClick={() => addItem('projects', emptyProject)} className="text-xs font-medium text-rose-400 hover:underline pt-1 inline-block">
                  + Add project
                </button>
              </div>

              <div className="border-t border-slate-800/80 pt-5"></div>

              {/* Certifications */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Certifications</label>
                <div className="space-y-2">
                  {form.certifications.map((cert, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-rose-500"
                        placeholder="e.g. AWS Certified Solutions Architect"
                        value={cert}
                        onChange={(e) => updateSimpleListItem('certifications', i, e.target.value)}
                      />
                      {form.certifications.length > 1 && (
                        <button onClick={() => removeItem('certifications', i)} className="text-xs text-rose-400 px-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-rose-500/10 transition">
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('certifications', '')} className="text-xs font-medium text-rose-400 hover:underline pt-1 inline-block">
                  + Add certification
                </button>
              </div>

            </div>
          )}

          {/* Step 5: Template Selection */}
          {step === 5 && (
            <div className="space-y-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Choose Layout Style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'modern', name: 'Modern Executive', desc: 'Sleek structural design with crisp accents.' },
                  { id: 'minimal', name: 'Minimal Editorial', desc: 'Clean typography-focused minimalist style.' }
                ].map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => update('template', tpl.id)}
                    className={`rounded-2xl border p-5 cursor-pointer transition flex flex-col justify-between ${
                      form.template === tpl.id
                        ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h3 className={`text-sm font-semibold mb-1 ${form.template === tpl.id ? 'text-rose-400' : 'text-white'}`}>
                        {tpl.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{tpl.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-slate-500">Selected Layout</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${form.template === tpl.id ? 'border-rose-500 bg-rose-500' : 'border-slate-700'}`}>
                        {form.template === tpl.id && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            {error}
          </div>
        )}

        {/* Bottom Navigation & Controls */}
        <div className="flex justify-between items-center pt-2">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-slate-800 hover:bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Back
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-rose-600 hover:bg-rose-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 transition cursor-pointer"
            >
              Continue to {steps[step].label} &rarr;
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-95 px-7 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Synthesizing Resume PDF...
                </>
              ) : (
                "Generate Resume PDF"
              )}
            </button>
          )}
        </div>

      </main>
    </div>
  );
}