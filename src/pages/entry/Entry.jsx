import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import karmaLogo from "../../assets/karma-logo.png";

const Entry = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <section className="relative min-h-screen">

        {/* =====================================================
            BACKGROUND ATMOSPHERE
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Purple glow */}
          <div className="absolute left-[58%] top-[-15%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple-700/[0.07] blur-[160px]" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/[0.08] blur-[170px]" />

          {/* Soft center light */}
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px]" />

          {/* Very subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]" />
        </div>

        {/* =====================================================
            PAGE
        ====================================================== */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 py-7 sm:px-8 sm:py-9 lg:px-12">

          {/* =================================================
              HEADER / LOGO
          ================================================== */}
          <motion.header
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Link
              to="/"
              className="group relative flex flex-col items-center"
            >
              {/* Logo glow */}
              <div className="absolute top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-purple-500/[0.08] blur-3xl transition-all duration-700 group-hover:bg-purple-500/[0.16]" />

              <img
                src={karmaLogo}
                alt="KARMA"
                className="relative h-24 w-24 object-contain invert transition-transform duration-700 group-hover:scale-[1.04] sm:h-28 sm:w-28"
              />
            </Link>
          </motion.header>

          {/* =================================================
              INTRO
          ================================================== */}
          <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.38em" }}
              transition={{ duration: 1, delay: 0.15 }}
              className="text-[9px] font-medium uppercase text-white/35 sm:text-[10px]"
            >
              The Karma Collection
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-5 text-[42px] font-light leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl"
            >
              Same Soul.
              <span className="mt-1 block font-serif italic font-normal text-purple-300">
                New Energy.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-lg text-[13px] leading-6 text-white/40 sm:text-sm"
            >
              Premium streetwear for those who move differently.
              <span className="hidden sm:inline"> </span>
              Choose how you want to enter KARMA.
            </motion.p>
          </div>

          {/* =================================================
              ENTRY CARDS
          ================================================== */}
          <div className="mx-auto mt-10 grid w-full max-w-5xl gap-4 sm:mt-12 md:grid-cols-2 md:gap-5">

            {/* =================================================
                GUEST
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.65 }}
              className="group"
            >
              <Link
                to="/shop"
                className="relative flex min-h-[350px] overflow-hidden rounded-[2px] border border-white/10 bg-[#f1f0ed] p-7 text-[#080808] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:min-h-[380px] sm:p-9"
              >

                {/* Giant decorative number */}
                <span className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[180px] font-semibold leading-none tracking-[-0.1em] text-black/[0.035]">
                  01
                </span>

                {/* Decorative rings */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-black/[0.06] transition-transform duration-1000 group-hover:scale-110" />

                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-black/[0.045]" />

                {/* Content */}
                <div className="relative z-10 flex w-full flex-col justify-between">

                  {/* Top */}
                  <div className="flex items-start justify-between">

                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                        01 / Instant Access
                      </span>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center border border-black/10 bg-black/[0.02] transition-all duration-500 group-hover:bg-black group-hover:text-white">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.4}
                        className="transition-transform duration-500 group-hover:rotate-45"
                      />
                    </div>

                  </div>

                  {/* Bottom */}
                  <div>

                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-px w-5 bg-black/30" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/45">
                        No account required
                      </span>
                    </div>

                    <h2 className="m-0 text-4xl font-light leading-[0.95] tracking-[-0.055em] text-[#080808] sm:text-5xl">
                      Continue as
                      <span className="mt-1 block font-serif italic font-normal">
                        Guest.
                      </span>
                    </h2>

                    <p className="mt-6 max-w-sm text-[13px] leading-6 text-black/50">
                      Explore the collection and shop instantly.
                      No registration. No waiting.
                    </p>

                    <div className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-black">
                      Enter the shop

                      <span className="h-px w-7 bg-black transition-all duration-500 group-hover:w-14" />

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>

                  </div>
                </div>

              </Link>
            </motion.div>

            {/* =================================================
                JOIN KARMA
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.8 }}
              className="group"
            >
              <Link
                to="/signup"
                className="relative flex min-h-[350px] overflow-hidden rounded-[2px] border border-purple-400/15 bg-[#111015] p-7 text-white transition-all duration-500 hover:-translate-y-1.5 hover:border-purple-400/35 hover:shadow-[0_25px_90px_rgba(112,45,220,0.16)] sm:min-h-[380px] sm:p-9"
              >

                {/* Purple glow */}
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/[0.16] blur-[90px] transition-all duration-1000 group-hover:bg-purple-500/[0.25]" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-purple-800/[0.08] blur-[100px]" />

                {/* Giant number */}
                <span className="pointer-events-none absolute -bottom-8 -right-1 select-none text-[180px] font-semibold leading-none tracking-[-0.1em] text-purple-400/[0.045]">
                  02
                </span>

                {/* Bottom animated line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-700 group-hover:w-full" />

                {/* Content */}
                <div className="relative z-10 flex w-full flex-col justify-between">

                  {/* Top */}
                  <div className="flex items-start justify-between">

                    <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-purple-300/60">
                      <Sparkles
                        size={12}
                        strokeWidth={1.4}
                      />
                      02 / Join KARMA
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:border-purple-400/50 group-hover:bg-purple-500 group-hover:text-white">
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.4}
                        className="transition-transform duration-500 group-hover:rotate-45"
                      />
                    </div>

                  </div>

                  {/* Bottom */}
                  <div>

                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-px w-5 bg-purple-400/50" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-purple-300/55">
                        Become part of the movement
                      </span>
                    </div>

                    <h2 className="m-0 text-4xl font-light leading-[0.95] tracking-[-0.055em] text-white sm:text-5xl">
                      Join
                      <span className="mt-1 block font-serif italic font-normal text-purple-300">
                        KARMA.
                      </span>
                    </h2>

                    <p className="mt-6 max-w-sm text-[13px] leading-6 text-white/40">
                      Get 10% off your first order, early access
                      to new drops and exclusive releases.
                    </p>

                    <div className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                      Create your account

                      <span className="h-px w-7 bg-purple-400 transition-all duration-500 group-hover:w-14" />

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>

                  </div>
                </div>

              </Link>
            </motion.div>
          </div>

          {/* =================================================
              SIGN IN
          ================================================== */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="pb-2 pt-7 text-center sm:pt-9"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
              Already part of KARMA?

              <Link
                to="/login"
                className="ml-2 text-white/65 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </motion.footer>

        </div>
      </section>
    </main>
  );
};

export default Entry;