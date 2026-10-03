import { useState } from "react";
import { Link } from "react-router-dom";

const roles = [
  { title: "Students", to: "/student" },
  { title: "Teachers", to: "/teacher" },
  { title: "Administration", to: "/admin" },
];

const weeklyScores = [12, 14, 13, 15, 16, 18];

const styles = `
  @keyframes lf-rise {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes lf-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }
  @keyframes lf-float-alt {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
  @keyframes lf-bar {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes lf-orb {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.15); }
  }
  .lf-rise { animation: lf-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .lf-float { animation: lf-float 7s ease-in-out infinite; }
  .lf-float-slow { animation: lf-float-alt 9s ease-in-out infinite; }
  .lf-float-late { animation: lf-float 8s ease-in-out 1.5s infinite; }
  .lf-bar { transform-origin: left; animation: lf-bar 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both; }
  .lf-orb { animation: lf-orb 6s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .lf-rise, .lf-float, .lf-float-slow, .lf-float-late, .lf-bar, .lf-orb {
      animation: none !important;
    }
  }
`;

function Logo({ small = false }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center bg-indigo-700 font-bold text-white shadow-sm ${
          small ? "h-7 w-7 rounded-lg text-xs" : "h-8 w-8 rounded-lg text-sm"
        }`}
      >
        
      </div>
      <span className="font-bold tracking-tight">
        Track<span className="text-indigo-700">Ed</span>
      </span>
    </Link>
  );
}

function HeroVisual() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: -py * 8, y: px * 10 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="lf-rise relative mx-auto w-full max-w-md py-10 sm:max-w-lg sm:py-12"
      style={{ perspective: "1200px", animationDelay: "0.2s" }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Orbs */}
      <span className="lf-orb absolute left-4 top-6 h-14 w-14 rounded-full bg-indigo-300/40 blur-xl" />
      <span
        className="lf-orb absolute bottom-8 right-6 h-20 w-20 rounded-full bg-indigo-200/60 blur-xl"
        style={{ animationDelay: "2s" }}
      />
      <span
        className="lf-orb absolute right-1/3 top-2 h-3 w-3 rounded-full bg-indigo-400/60"
        style={{ animationDelay: "1s" }}
      />
      <span
        className="lf-orb absolute bottom-4 left-1/4 h-2 w-2 rounded-full bg-indigo-500/50"
        style={{ animationDelay: "3s" }}
      />

      {/* 3D stage */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${6 + tilt.x}deg) rotateY(${-12 + tilt.y}deg)`,
        }}
      >
        {/* Main dashboard */}
        <div className="lf-float" style={{ transformStyle: "preserve-3d" }}>
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl shadow-indigo-900/10 sm:p-6">
            <div className="flex items-center gap-1.5 border-b border-stone-100 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
              <div className="ml-3 h-5 flex-1 rounded-md bg-stone-100" />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Student overview
                </p>
                <h2 className="mt-1 truncate text-xl font-bold">
                  Ahmed Mansouri
                </h2>
                <p className="text-sm text-stone-500">L2 Computer Science</p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700">
                AM
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">Programming</span>
                <span className="font-bold text-indigo-700">75%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="lf-bar h-full rounded-full bg-indigo-600"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-stone-50 p-4">
              <p className="text-xs text-stone-500">Last 6 quizzes</p>
              <div className="mt-3 flex h-20 items-end gap-2">
                {weeklyScores.map((score, index) => (
                  <div
                    key={index}
                    className={`flex-1 rounded-t-md ${
                      index === weeklyScores.length - 1
                        ? "bg-indigo-600"
                        : "bg-indigo-200"
                    }`}
                    style={{ height: `${(score / 20) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating score card */}
        <div
          className="absolute -top-2 right-0 sm:-right-6"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="lf-float-slow rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-xl shadow-indigo-900/10 backdrop-blur-md">
            <p className="text-xs text-stone-500">Average score</p>
            <p className="text-2xl font-bold">16/20</p>
          </div>
        </div>

        {/* Floating progress card */}
        <div
          className="absolute -left-1 bottom-16 sm:-left-8"
          style={{ transform: "translateZ(70px)" }}
        >
          <div className="lf-float-late flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-xl shadow-indigo-900/10 backdrop-blur-md">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#4338ca 270deg, #e0e7ff 270deg 360deg)",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-indigo-700">
                75%
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Progress</p>
              <p className="text-xs text-stone-500">Programming</p>
            </div>
          </div>
        </div>

        {/* Floating quiz badge */}
        <div
          className="absolute -bottom-3 right-4 sm:right-2"
          style={{ transform: "translateZ(110px)" }}
        >
          <div className="lf-float flex items-center gap-2 rounded-full border border-white/70 bg-white/80 py-2 pl-2 pr-4 shadow-lg shadow-indigo-900/10 backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-xs font-semibold">Quiz completed · 18/20</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-50 text-stone-900">
      <style>{styles}</style>

    

      <main>
        {/* Hero */}
        <section
          id="features"
          className="relative mx-auto grid max-w-6xl scroll-mt-14 items-center gap-6 px-6 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100vh-3.5rem)] lg:grid-cols-2 lg:gap-10 lg:py-16"
        >
          <div>
            <div
              className="lf-rise mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              TrackEd
            </div>

            <h1
              className="lf-rise max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0.12s" }}
            >
              Know where every student{" "}
              <span className="text-indigo-700">stands.</span>
            </h1>

            <p
              className="lf-rise mt-5 max-w-md text-lg leading-7 text-stone-600"
              style={{ animationDelay: "0.2s" }}
            >
              Progress, quiz results and performance, clear for students,
              teachers and administration.
            </p>

            <div
              className="lf-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.28s" }}
            >
              <Link
                to="/register"
                className="rounded-xl bg-indigo-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-700/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-800"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-semibold text-stone-700 transition duration-200 hover:border-stone-400 hover:bg-stone-100"
              >
                Sign in
              </Link>
            </div>
          </div>

          <HeroVisual />
        </section>

        {/* Roles */}
        <section id="roles" className="scroll-mt-14 border-t border-stone-200">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="text-center text-sm font-medium text-stone-500">
              Built for students, teachers and administration.
            </p>

            <div className="mt-6 grid divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {roles.map((role) => (
                <Link
                  key={role.title}
                  to={role.to}
                  className="group flex items-center justify-between px-6 py-5 font-semibold transition hover:bg-indigo-50"
                >
                  {role.title}
                  <span className="text-indigo-700 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-stone-500 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo small />
            <span className="hidden sm:inline">Student progress, made clear.</span>
          </div>
          <p className="sm:hidden">Student progress, made clear.</p>
          <p>© {new Date().getFullYear()} TrackEd</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;