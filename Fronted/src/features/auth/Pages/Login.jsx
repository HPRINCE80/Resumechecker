import { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', form);
    window.location.href = '/upload';
};
    return (

        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,_#07111f_0%,_#101b2d_35%,_#0d1f41_100%)] p-6 font-[Inter,Arial,sans-serif] text-slate-100">
            <div className="absolute -left-20 -top-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(109,164,255,0.38),_transparent_60%)] blur-[8px]" />
            <div className="absolute -bottom-36 -right-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.25),_transparent_60%)] blur-[8px]" />

            <div className="relative z-10 grid w-full max-w-[1100px] min-h-[680px] overflow-hidden rounded-[28px] border border-slate-400/20 bg-slate-900/80 shadow-[0_30px_80px_rgba(15,23,42,0.7)] backdrop-blur-[16px] md:grid-cols-[1.05fr_0.95fr]">
                <div className="flex flex-col justify-center rounded-l-[28px] bg-[linear-gradient(160deg,_rgba(79,70,229,0.26),_rgba(14,165,233,0.12),_rgba(15,23,42,0.75))] px-14 py-14">
                    <div className="mb-7 flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#60a5fa,_#a78bfa)] font-extrabold text-white shadow-[0_10px_25px_rgba(96,165,250,0.4)]">AI</div>
                    <h1 className="m-0 text-5xl font-bold leading-[1.1] text-slate-50">Welcome back</h1>
                    <p className="mt-5 max-w-[480px] text-lg leading-7 text-slate-300">
                        Your next career move starts here. Sign in to manage your profile,
                        applications, and opportunities.
                    </p>

                    <div className="mt-7 flex flex-col gap-3.5">
                        {['Smart job matching', 'Personal dashboard', 'Real-time updates'].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-base text-slate-200">
                                <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-300">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center rounded-r-[28px] bg-slate-900/90 px-14 py-14">
                    <div className="mb-7">
                        <p className="mb-2.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-sky-300">Access your account</p>
                        <h2 className="m-0 text-4xl font-bold text-slate-50">Login</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-200">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="rounded-xl border border-slate-400/25 bg-slate-900/75 px-4 py-[15px] text-base text-slate-50 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                            />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-200">Password</label>
                                <a href="#" className="font-semibold text-sky-300 no-underline">Forgot?</a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="rounded-xl border border-slate-400/25 bg-slate-900/75 px-4 py-[15px] text-base text-slate-50 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                            />
                        </div>

                        <button type="submit" href="/Asign" className="mt-2 rounded-xl border-0 bg-[linear-gradient(135deg,_#60a5fa,_#8b5cf6,_#22c55e)] px-4 py-4 text-base font-bold text-white shadow-[0_18px_30px_rgba(96,165,250,0.35)] transition-transform duration-200 hover:scale-[1.01]">
                            Sign In
                        </button>
                    </form>

                    <div className="my-6 flex items-center text-center text-[0.78rem] uppercase tracking-[0.08em] text-slate-400">
                        <span className="flex-1 border-t border-slate-500/30" />
                        <span className="px-3">or continue with</span>
                        <span className="flex-1 border-t border-slate-500/30" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="rounded-xl border border-slate-400/20 bg-slate-900/70 px-3.5 py-3 font-semibold text-slate-200 transition-colors duration-200 hover:bg-slate-800">Google</button>
                        <button type="button" className="rounded-xl border border-slate-400/20 bg-slate-900/70 px-3.5 py-3 font-semibold text-slate-200 transition-colors duration-200 hover:bg-slate-800">GitHub</button>
                    </div>

                    <p className="mt-5 text-center text-[0.96rem] text-slate-300">
                        Don’t have an account? <a href="/Register" className="font-semibold text-sky-300 no-underline">Create one</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
