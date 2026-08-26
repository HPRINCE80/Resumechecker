import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../Hooks/useResume';

const emptyExp = { role: '', company: '', startDate: '', endDate: '', description: '' };
const emptyEdu = { degree: '', institution: '', startDate: '', endDate: '' };
const emptyProject = { title: '', description: '' };

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const { loading, generateResume } = useResume();
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
    try {
      const payload = {
        ...form,
        skills: form.skills.filter((s) => s.trim()),
        certifications: form.certifications.filter((c) => c.trim()),
      };
      await generateResume(payload);
    } catch {
      // error already handled in hook's `error` state
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create Your Resume</h1>
          <button onClick={() => navigate('/')} className="text-xs text-[#7d8590] hover:text-[#e6edf3]">
            ← Back to Home
          </button>
        </div>

        <div className="flex gap-2 text-xs text-[#7d8590]">
          {['Personal', 'Experience', 'Education', 'Skills', 'Template'].map((label, i) => (
            <span key={label} className={i + 1 === step ? 'text-[#ff2d78] font-semibold' : ''}>
              {label}{i < 4 ? ' → ' : ''}
            </span>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <input className="w-full rounded-lg bg-[#1e2535] border border-[#2a3348] p-2.5 text-sm" placeholder="Full Name"
              value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
            <input className="w-full rounded-lg bg-[#1e2535] border border-[#2a3348] p-2.5 text-sm" placeholder="Email"
              value={form.email} onChange={(e) => update('email', e.target.value)} />
            <input className="w-full rounded-lg bg-[#1e2535] border border-[#2a3348] p-2.5 text-sm" placeholder="Phone"
              value={form.phone} onChange={(e) => update('phone', e.target.value)} />
            <input className="w-full rounded-lg bg-[#1e2535] border border-[#2a3348] p-2.5 text-sm" placeholder="Location"
              value={form.location} onChange={(e) => update('location', e.target.value)} />
            <textarea className="w-full rounded-lg bg-[#1e2535] border border-[#2a3348] p-2.5 text-sm" placeholder="Short summary about yourself"
              rows={3} value={form.summary} onChange={(e) => update('summary', e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {form.experience.map((exp, i) => (
              <div key={i} className="rounded-lg border border-[#2a3348] p-3 space-y-2">
                <input className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Role"
                  value={exp.role} onChange={(e) => updateListItem('experience', i, 'role', e.target.value)} />
                <input className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Company"
                  value={exp.company} onChange={(e) => updateListItem('experience', i, 'company', e.target.value)} />
                <div className="flex gap-2">
                  <input className="w-1/2 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Start (e.g. Jan 2023)"
                    value={exp.startDate} onChange={(e) => updateListItem('experience', i, 'startDate', e.target.value)} />
                  <input className="w-1/2 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="End (or Present)"
                    value={exp.endDate} onChange={(e) => updateListItem('experience', i, 'endDate', e.target.value)} />
                </div>
                <textarea className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Description"
                  rows={2} value={exp.description} onChange={(e) => updateListItem('experience', i, 'description', e.target.value)} />
                {form.experience.length > 1 && (
                  <button onClick={() => removeItem('experience', i)} className="text-xs text-red-400">Remove</button>
                )}
              </div>
            ))}
            <button onClick={() => addItem('experience', emptyExp)} className="text-sm text-[#ff6b9d]">+ Add experience</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {form.education.map((edu, i) => (
              <div key={i} className="rounded-lg border border-[#2a3348] p-3 space-y-2">
                <input className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Degree"
                  value={edu.degree} onChange={(e) => updateListItem('education', i, 'degree', e.target.value)} />
                <input className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Institution"
                  value={edu.institution} onChange={(e) => updateListItem('education', i, 'institution', e.target.value)} />
                <div className="flex gap-2">
                  <input className="w-1/2 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Start"
                    value={edu.startDate} onChange={(e) => updateListItem('education', i, 'startDate', e.target.value)} />
                  <input className="w-1/2 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="End"
                    value={edu.endDate} onChange={(e) => updateListItem('education', i, 'endDate', e.target.value)} />
                </div>
                {form.education.length > 1 && (
                  <button onClick={() => removeItem('education', i)} className="text-xs text-red-400">Remove</button>
                )}
              </div>
            ))}
            <button onClick={() => addItem('education', emptyEdu)} className="text-sm text-[#ff6b9d]">+ Add education</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Skills</p>
              {form.skills.map((skill, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="e.g. React"
                    value={skill} onChange={(e) => updateSimpleListItem('skills', i, e.target.value)} />
                  {form.skills.length > 1 && (
                    <button onClick={() => removeItem('skills', i)} className="text-xs text-red-400">✕</button>
                  )}
                </div>
              ))}
              <button onClick={() => addItem('skills', '')} className="text-sm text-[#ff6b9d]">+ Add skill</button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Projects</p>
              {form.projects.map((proj, i) => (
                <div key={i} className="rounded-lg border border-[#2a3348] p-3 space-y-2">
                  <input className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Project title"
                    value={proj.title} onChange={(e) => updateListItem('projects', i, 'title', e.target.value)} />
                  <textarea className="w-full rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="Description"
                    rows={2} value={proj.description} onChange={(e) => updateListItem('projects', i, 'description', e.target.value)} />
                  {form.projects.length > 1 && (
                    <button onClick={() => removeItem('projects', i)} className="text-xs text-red-400">Remove</button>
                  )}
                </div>
              ))}
              <button onClick={() => addItem('projects', emptyProject)} className="text-sm text-[#ff6b9d]">+ Add project</button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Certifications</p>
              {form.certifications.map((cert, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 rounded bg-[#1e2535] border border-[#2a3348] p-2 text-sm" placeholder="e.g. AWS Certified"
                    value={cert} onChange={(e) => updateSimpleListItem('certifications', i, e.target.value)} />
                  {form.certifications.length > 1 && (
                    <button onClick={() => removeItem('certifications', i)} className="text-xs text-red-400">✕</button>
                  )}
                </div>
              ))}
              <button onClick={() => addItem('certifications', '')} className="text-sm text-[#ff6b9d]">+ Add certification</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex gap-4">
            {['modern', 'minimal'].map((tpl) => (
              <button
                key={tpl}
                onClick={() => update('template', tpl)}
                className={`flex-1 rounded-lg border p-4 text-sm capitalize ${
                  form.template === tpl ? 'border-[#ff2d78] bg-[#ff2d78]/10 text-[#ff6b9d]' : 'border-[#2a3348] text-[#7d8590]'
                }`}
              >
                {tpl}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-[#2a3348] px-4 py-2 text-sm disabled:opacity-30"
          >
            Back
          </button>

          {step < 5 ? (
            <button onClick={() => setStep((s) => s + 1)} className="rounded-full bg-[#ff2d78] px-5 py-2 text-sm font-semibold text-white">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="rounded-full bg-[#ff2d78] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {loading ? 'Generating...' : 'Generate Resume PDF'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}