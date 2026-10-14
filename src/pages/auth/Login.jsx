import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Authentication will be connected here later.
    console.log("Login:", form);
  };

  return (
    <AuthShell
      mode="login"
      eyebrow="Welcome back"
      title="Return to"
      accent="KARMA."
      description="Your collection, your wishlist, your orders. Everything waiting exactly where you left it."
    >
      <div className="border border-white/[0.08] bg-[#0d0d10]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">

        {/* =================================================
            HEADER
        ================================================== */}
        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-purple-300/60">
            Member access
          </p>

          <h2 className="mt-3 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl">
            Welcome
            <span className="ml-2 font-serif italic text-purple-300">
              back.
            </span>
          </h2>

          <p className="mt-3 text-xs leading-5 text-white/30">
            Sign in to continue your KARMA experience.
          </p>

        </div>

        {/* =================================================
            MEMBER STATUS
        ================================================== */}
        <div className="mt-7 flex items-center gap-4 border-y border-white/[0.06] py-5">

          <div className="flex h-9 w-9 items-center justify-center border border-purple-400/20 bg-purple-500/[0.07]">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
          </div>

          <div>
            <p className="text-[10px] font-medium text-white/60">
              KARMA MEMBER
            </p>

            <p className="mt-0.5 text-[8px] uppercase tracking-[0.16em] text-white/20">
              Your access awaits
            </p>
          </div>

        </div>

        {/* =================================================
            FORM
        ================================================== */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >

          {/* Email */}
          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="h-12 w-full border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-purple-400/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-purple-400/10"
            />

          </div>

          {/* Password */}
          <div>

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-[9px] text-white/25 transition-colors hover:text-purple-300"
              >
                Forgot password?
              </Link>

            </div>

            <div className="relative">

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="h-12 w-full border border-white/[0.08] bg-white/[0.025] px-4 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-purple-400/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-purple-400/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-white/25 transition-colors hover:text-white/70"
              >
                {showPassword ? (
                  <EyeOff size={16} strokeWidth={1.5} />
                ) : (
                  <Eye size={16} strokeWidth={1.5} />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}
          <label className="flex cursor-pointer items-center gap-3 pt-1">

            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-3.5 w-3.5 accent-purple-500"
            />

            <span className="text-[10px] text-white/25">
              Keep me signed in
            </span>

          </label>

          {/* Submit */}
          <button
            type="submit"
            className="group flex h-13 w-full items-center justify-center gap-3 bg-white text-[10px] font-semibold uppercase tracking-[0.24em] text-black transition-all duration-300 hover:bg-purple-400"
          >
            Sign in

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </form>

        {/* =================================================
            SIGNUP
        ================================================== */}
        <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">

          <p className="text-[10px] text-white/25">
            New to KARMA?

            <Link
              to="/signup"
              className="ml-2 font-medium text-purple-300 transition-colors hover:text-purple-200"
            >
              Create an account
            </Link>
          </p>

        </div>

      </div>

      {/* Guest option */}
      <div className="mt-5 text-center">

        <Link
          to="/shop"
          className="text-[9px] uppercase tracking-[0.22em] text-white/20 transition-colors hover:text-white/50"
        >
          Continue shopping as guest
        </Link>

      </div>
    </AuthShell>
  );
};

export default Login;