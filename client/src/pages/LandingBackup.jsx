import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingBackup = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const chartTimer = setTimeout(() => {
      setChartVisible(true);
    }, 300);

    const aiTimer = setTimeout(() => {
      setAiVisible(true);
    }, 1000);

    return () => {
      clearTimeout(chartTimer);
      clearTimeout(aiTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl lg:block"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
        }}
      />

      {/* Navbar */}
      <nav className="relative z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
          >
            AI Finance Manager
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              How it works
            </a>

            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                How it works
              </a>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-slate-700"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          {/* Hero Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI-powered financial intelligence
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:mt-6 lg:text-6xl lg:leading-[1.05]">
              Understand your money.
              <span className="block text-emerald-600">
                Make smarter decisions.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-500 sm:mt-6 sm:text-lg sm:leading-8">
              Track your spending, plan your budget, and turn your financial
              data into clear, actionable insights with AI.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/register"
                className="rounded-lg bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg sm:text-base"
              >
                Get started
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100 sm:text-base"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 sm:text-sm">
              <span>Track spending</span>
              <span>•</span>
              <span>Plan budgets</span>
              <span>•</span>
              <span>Get AI insights</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
            {/* Glow behind dashboard */}
            <div className="absolute inset-8 rounded-full bg-emerald-300/20 blur-3xl" />

            {/* Dashboard */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 transition duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-6">
              {/* Dashboard Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 sm:text-sm">
                    Total balance
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    ₹42,580
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Updated just now
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 sm:px-3 sm:py-2 sm:text-sm">
                  +8.4%
                </div>
              </div>

              {/* Chart */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-600 sm:text-sm">
                    Spending overview
                  </p>

                  <p className="text-xs text-slate-400">This month</p>
                </div>

                <div className="flex h-32 items-end gap-2 sm:h-40 sm:gap-3">
                  {[35, 48, 42, 62, 52, 70, 64, 84, 73, 94].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 items-end rounded-t-md bg-emerald-50"
                        style={{
                          height: "100%",
                        }}
                      >
                        <div
                          className={`w-full rounded-t-md bg-emerald-500 transition-all duration-700 ${
                            chartVisible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                          }`}
                          style={{
                            height: `${height}%`,
                            transitionDelay: `${index * 70}ms`,
                          }}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Monthly spending
                  </p>

                  <p className="mt-1.5 text-base font-bold text-slate-900 sm:text-lg">
                    ₹18,240
                  </p>

                  <p className="mt-1 text-[10px] text-emerald-600 sm:text-xs">
                    12% less than last month
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[10px] text-slate-400 sm:text-xs">
                    Budget remaining
                  </p>

                  <p className="mt-1.5 text-base font-bold text-slate-900 sm:text-lg">
                    ₹11,760
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                    39% of monthly budget
                  </p>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div
              className={`relative mx-auto mt-4 w-full max-w-xs transition-all duration-700 lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0 ${
                aiVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-lg shadow-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-600">
                    AI
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                      Smart insight
                    </p>

                    <p className="text-[10px] text-violet-500 sm:text-xs">
                      Financial pattern detected
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Your food spending increased this month. Consider setting a
                  weekly limit to stay within your budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingBackup;
