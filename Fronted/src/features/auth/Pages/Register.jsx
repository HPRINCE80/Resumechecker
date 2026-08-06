import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    console.log("Register form submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Registration successful!");
    }, 800);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white p-6 font-sans flex items-center justify-center">
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,_#07111f_0%,_#101b2d_35%,_#0d1f41_100%)] p-6 font-[Inter,Arial,sans-serif] text-slate-100">
      <div className="w-full max-w-lg rounded-2xl bg-blue p-8 shadow-xl ring-1 ring-slate-100">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-500 text-3xl font-extrabold text-white">
            AR
          </div>
          <h1 className="m-0 text-3xl text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Join us and start building your professional profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full box-border rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-400 shadow-sm ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {errors.fullName && <span className="mt-0.5 text-xs text-red-500">{errors.fullName}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
                className={`w-full box-border rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-400 shadow-sm ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                }`}
            />
            {errors.email && <span className="mt-0.5 text-xs text-red-500">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full box-border rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-400 shadow-sm ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {errors.password && <span className="mt-0.5 text-xs text-red-500">{errors.password}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full box-border rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-400 shadow-sm ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
            {errors.confirmPassword && (
              <span className="mt-0.5 text-xs text-red-500">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl border-0 bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-3 text-base font-semibold text-white transition transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80 shadow-md"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            <div className="flex items-center gap-3">
              <hr className="flex-1 border-slate-200" />
              <span className="text-sm text-slate-400">or continue with</span>
              <hr className="flex-1 border-slate-200" />
            </div>

            <div className="flex gap-3">
              <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm bg-blue-400 hover:shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 11.36 21.94 10.66 21.84 9.98H12v3.78h5.45c-0.24 1.3-1 2.4-2.13 3.14v2.6h3.44C20.54 19.07 22 15.9 22 12.07z" fill="#4285F4"/><path d="M12 23c2.7 0 4.96-0.9 6.62-2.44l-3.44-2.6c-0.95 0.64-2.17 1.02-3.18 1.02-2.45 0-4.53-1.65-5.27-3.87H3.14v2.43C4.8 20.9 8.13 23 12 23z" fill="#34A853"/><path d="M6.73 14.14C6.5 13.46 6.36 12.74 6.36 12s0.14-1.46 0.37-2.14V7.43H3.14C2.42 8.89 2 10.38 2 12c0 1.62 0.42 3.11 1.14 4.57l3.59-2.43z" fill="#FBBC05"/><path d="M12 5.5c1.47 0 2.78 0.5 3.82 1.48l2.86-2.86C16.96 2.54 14.7 1.5 12 1.5 8.13 1.5 4.8 3.6 3.14 6.57l3.59 2.43C7.47 7.15 9.55 5.5 12 5.5z" fill="#EA4335"/></svg>
                <span>Google</span>
              </button>
              <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm bg-black hover:shadow-sm">
                <span className="sr-only">Continue with GitHub</span>
                GitHub
              </button>
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <a href="/login" className="font-semibold text-indigo-600 no-underline hover:text-indigo-700">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
