import { useState } from "react";
import { Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
    console.log("Signup:", form);
  };

  return (
    <AuthShell
      mode="signup"
      eyebrow="Join the movement"
      title="Become"
      accent="KARMA."
      description="Create your KARMA account and unlock the world behind the collection."
    >
      <div className="border border-white/[0.08] bg-[#0d0d10]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">

        {/* =================================================
            HEADER
        ================================================== */}
        <div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-purple-300/60">
            Create account
          </p>

          <h2 className="mt-3 text-3xl font-light tracking-[-0.045em] text-white sm:text-4xl">
            Enter the
            <span className="ml-2 font-serif italic text-purple-300">
              movement.
            </span>
          </h2>

          <p className="mt-3 text-xs leading-5 text-white/30">
            Join KARMA and receive <span className="text-white/60">10% off</span>{" "}
            your first order.
          </p>

        </div>

        {/* =================================================
            BENEFITS
        ================================================== */}
        <div className="mt-7 grid grid-cols-3 border-y border-white/[0.06] py-5">

          <div className="pr-3">
            <p className="text-[11px] font-medium text-white/70">
              10% OFF
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25">
              First order
            </p>
          </div>

          <div className="border-l border-white/[0.06] px-3">
            <p className="text-[11px] font-medium text-white/70">
              Early access
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25">
              New drops
            </p>
          </div>

          <div className="border-l border-white/[0.06] pl-3">
            <p className="text-[11px] font-medium text-white/70">
              Wishlist
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25">
              Save pieces
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

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
              >
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                className="h-12 w-full border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-purple-400/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-purple-400/10"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
              >
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="h-12 w-full border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-purple-400/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-purple-400/10"
              />
            </div>

          </div>

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
            <label
              htmlFor="password"
              className="mb-2 block text-[9px] font-medium uppercase tracking-[0.2em] text-white/35"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength={8}
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

            <p className="mt-2 text-[9px] text-white/20">
              Minimum 8 characters
            </p>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-3 pt-1">

            <button
              type="button"
              onClick={() => setAgreed((current) => !current)}
              aria-label="Accept terms"
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-all ${
                agreed
                  ? "border-purple-400 bg-purple-500 text-white"
                  : "border-white/15 bg-white/[0.02]"
              }`}
            >
              {agreed && (
                <Check size={10} strokeWidth={2.5} />
              )}
            </button>

            <span className="text-[10px] leading-5 text-white/25">
              I agree to KARMA's{" "}
              <Link
                to="/terms"
                className="text-white/55 underline underline-offset-2 hover:text-white"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-white/55 underline underline-offset-2 hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </span>

          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!agreed}
            className="group flex h-13 w-full items-center justify-center gap-3 bg-white text-[10px] font-semibold uppercase tracking-[0.24em] text-black transition-all duration-300 hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Create my account

            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </form>

        {/* =================================================
            LOGIN
        ================================================== */}
        <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">

          <p className="text-[10px] text-white/25">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-medium text-purple-300 transition-colors hover:text-purple-200"
            >
              Sign in
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

export default Signup;