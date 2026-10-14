
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import karmaLogo from "../../assets/karma-logo.png";

const AuthShell = ({
  children,
  mode = "login",
  eyebrow,
  title,
  accent,
  description,
}) => {
  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <div className="relative min-h-screen">

        {/* =========================================================
            ATMOSPHERE
        ========================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-[-20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/[0.07] blur-[160px]" />

          <div
            className={`absolute ${
              isSignup
                ? "bottom-[-15%] right-[-10%]"
                : "bottom-[-20%] left-[-10%"
            } h-[600px] w-[600px] rounded-full bg-purple-700/[0.06] blur-[160px]`}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0,transparent_52%)]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* =========================================================
            TOP NAV
        ========================================================== */}

        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12"
        >

          {/* Back */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="text-white/30 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-white"
            />

            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/30 transition-colors group-hover:text-white/70">
              Back
            </span>
          </Link>


          {/* =====================================================
              PREMIUM KARMA LOGO
          ====================================================== */}

          <Link
            to="/"
            className="absolute left-1/2 top-3 -translate-x-1/2"
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
            >

              {/* =================================================
                  OUTER AMBIENT GLOW
              ================================================== */}

              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.16, 0.28, 0.16],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-[-18px] rounded-full bg-purple-500/20 blur-2xl"
              />


              {/* =================================================
                  ROTATING AMBIENT RING
              ================================================== */}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[-7px] rounded-full border border-purple-400/20"
              >

                {/* Small light on the ring */}

                <span className="absolute left-1/2 top-[-2px] h-1 w-1 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.9)]" />

              </motion.div>


              {/* =================================================
                  SECOND SOFT RING
              ================================================== */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.25, 0.45, 0.25],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-[-2px] rounded-full border border-purple-300/10"
              />


              {/* =================================================
                  PURPLE LOGO BACKGROUND
              ================================================== */}

              <div className="absolute inset-0 rounded-full bg-purple-600/[0.18] ring-1 ring-purple-400/20 backdrop-blur-sm" />


              {/* =================================================
                  INNER PURPLE LIGHT
              ================================================== */}

              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-2 rounded-full bg-purple-500/[0.10] shadow-[0_0_45px_rgba(168,85,247,0.35)]"
              />


              {/* =================================================
                  LOGO
              ================================================== */}

              <motion.img
                src={karmaLogo}
                alt="KARMA"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 h-[78%] w-[78%] object-contain invert mix-blend-screen drop-shadow-[0_0_12px_rgba(216,180,254,0.25)]"
              />

            </motion.div>

          </Link>


          {/* Right indicator */}

          <div className="flex items-center gap-2">

            <span className="hidden text-[8px] uppercase tracking-[0.25em] text-white/20 sm:block">
              KARMA
            </span>

            <motion.span
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            />

          </div>

        </motion.header>


        {/* =========================================================
            MAIN
        ========================================================== */}

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">

          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,0.75fr)] lg:gap-20 xl:gap-28">


            {/* =====================================================
                LEFT BRAND PANEL
            ====================================================== */}

            <motion.section
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="hidden lg:block"
            >

              <div className="max-w-xl">

                {/* Eyebrow */}

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-purple-400/60" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-purple-300/60">
                    {eyebrow}
                  </span>

                </div>


                {/* Heading */}

                <h1 className="mt-8 text-6xl font-light leading-[0.95] tracking-[-0.055em] text-white xl:text-7xl">

                  {title}

                  <span className="block font-serif italic text-purple-300">
                    {accent}
                  </span>

                </h1>


                {/* Description */}

                <p className="mt-7 max-w-md text-sm leading-7 text-white/35">
                  {description}
                </p>


                {/* Philosophy */}

                <div className="mt-14 border-l border-purple-400/20 pl-5">

                  <div className="flex items-center gap-2">

                    <Sparkles
                      size={13}
                      strokeWidth={1.4}
                      className="text-purple-300/60"
                    />

                    <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/30">
                      The KARMA philosophy
                    </span>

                  </div>

                  <p className="mt-3 max-w-sm text-xs leading-6 text-white/25">
                    What you wear carries energy.
                    Move with intention. Wear what feels like you.
                  </p>

                </div>


                {/* Decorative number */}

                <div className="mt-16 flex items-end gap-5">

                  <span className="text-[72px] font-light leading-none tracking-[-0.08em] text-white/[0.035]">
                    {isSignup ? "02" : "01"}
                  </span>

                  <div className="mb-2">

                    <div className="h-px w-16 bg-white/10" />

                    <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/15">
                      {isSignup ? "Create access" : "Member access"}
                    </p>

                  </div>

                </div>

              </div>

            </motion.section>


            {/* =====================================================
                MOBILE INTRO
            ====================================================== */}

            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:hidden"
            >

              <div className="text-center">

                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-purple-300/60">
                  {eyebrow}
                </p>

                <h1 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">

                  {title}

                  <span className="ml-2 font-serif italic text-purple-300">
                    {accent}
                  </span>

                </h1>

                <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-white/30">
                  {description}
                </p>

              </div>

            </motion.section>


            {/* =====================================================
                FORM AREA
            ====================================================== */}

            <motion.section
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="w-full"
            >

              <div className="mx-auto w-full max-w-[520px]">

                {/* Top indicator */}

                <div className="mb-4 flex items-center justify-between">

                  <span className="text-[8px] uppercase tracking-[0.28em] text-white/20">
                    {isSignup ? "New member" : "Member login"}
                  </span>

                  <div className="flex items-center gap-2">

                    <span className="h-px w-6 bg-white/10" />

                    <span className="text-[8px] text-white/15">
                      KARMA
                    </span>

                  </div>

                </div>


                {/* Actual form */}

                {children}


                {/* Security / trust */}

                <div className="mt-5 flex items-center justify-center gap-3">

                  <span className="h-px w-8 bg-white/[0.06]" />

                  <span className="text-[7px] uppercase tracking-[0.25em] text-white/15">
                    Secure KARMA access
                  </span>

                  <span className="h-px w-8 bg-white/[0.06]" />

                </div>

              </div>

            </motion.section>

          </div>

        </div>


        {/* =========================================================
            FOOTER
        ========================================================== */}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 px-5 pb-6 text-center sm:px-8"
        >

          <div className="mx-auto flex max-w-[1500px] items-center justify-between border-t border-white/[0.05] pt-5">

            <p className="text-[7px] uppercase tracking-[0.22em] text-white/15">
              KARMA © {new Date().getFullYear()}
            </p>

            <p className="hidden text-[7px] uppercase tracking-[0.22em] text-white/15 sm:block">
              Same soul. New energy.
            </p>

            <p className="text-[7px] uppercase tracking-[0.22em] text-white/15">
              Private access
            </p>

          </div>

        </motion.footer>

      </div>
    </main>
  );
};

export default AuthShell; 
