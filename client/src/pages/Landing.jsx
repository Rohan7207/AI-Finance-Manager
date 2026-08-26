import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FinanceLogo from "../components/FinanceLogo";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const [budgetVisible, setBudgetVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(0);

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
    const timer = setTimeout(() => {
      setActivePanel((current) => (current + 1) % 3);
    }, 3500);

    return () => clearTimeout(timer);
  }, [activePanel]);

  useEffect(() => {
    setChartVisible(false);
    setBudgetVisible(false);

    if (activePanel === 0) {
      const timer = setTimeout(() => {
        setChartVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    }

    if (activePanel === 1) {
      const timer = setTimeout(() => {
        setBudgetVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [activePanel]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      {/* Financial Radar Cursor */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-0 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        {/* Outer ring */}
        <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full border border-emerald-400/20" />

        {/* Inner ring */}
        <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-violet-400/30" />

        {/* Center point */}
        <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />

        {/* Signal points */}
        <span className="absolute -left-7 -top-7 h-1 w-1 rounded-full bg-emerald-400/60" />
        <span className="absolute left-6 -top-5 h-1 w-1 rounded-full bg-violet-400/60" />
        <span className="absolute -left-6 top-0 h-1 w-1 rounded-full bg-emerald-400/50" />
        <span className="absolute left-7 top-5 h-1 w-1 rounded-full bg-violet-400/50" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" aria-label="AI Finance Manager home">
            <FinanceLogo />
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
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <main className="relative z-10">
        {/* ================= DESKTOP HERO ================= */}
        <section className="hidden min-h-[calc(100vh-4rem)] items-center md:flex">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-16 px-8">
            {/* Desktop Content */}
            <div className="max-w-xl">
              {/* AI Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                AI-powered financial intelligence
              </div>

              {/* Main Heading */}
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl">
                Understand your money.
                <span className="block text-emerald-600">
                  Make smarter decisions.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
                Your personal AI companion for smarter spending, better budgets,
                and clearer financial decisions.
              </p>

              {/* Live AI Status */}
              <div className="mt-7 max-w-md rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                {/* Status Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                      <span className="text-sm font-bold text-violet-600">
                        AI
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        AI analyzing your finances
                      </p>

                      <p className="text-xs text-slate-400">
                        Finding patterns and opportunities
                      </p>
                    </div>
                  </div>

                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                </div>

                {/* AI Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-400">Spending</p>

                    <p className="mt-1 text-sm font-bold text-slate-900">72%</p>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[72%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-400">Budget</p>

                    <p className="mt-1 text-sm font-bold text-slate-900">61%</p>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[61%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-400">Goals</p>

                    <p className="mt-1 text-sm font-bold text-slate-900">84%</p>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[84%] rounded-full bg-violet-500" />
                    </div>
                  </div>
                </div>

                {/* AI Pattern */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                  3 financial patterns detected
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex gap-3">
                <Link
                  to="/register"
                  className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                >
                  Get started
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Sign in
                </Link>
              </div>
            </div>

            {/* Desktop Visual */}
            <div className="relative mx-auto w-full max-w-xl">
              {/* Background Glow */}
              <div className="absolute inset-8 rounded-full bg-emerald-300/20 blur-3xl" />

              {/* Showcase Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                {/* Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                    <span className="text-xs font-semibold text-slate-500">
                      Financial overview
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">Live</span>
                </div>

                {/* Panels */}
                <div className="relative min-h-[390px]">
                  {/* ================= EXPENSE PANEL ================= */}
                  {activePanel === 0 && (
                    <div className="animate-[fadeIn_500ms_ease-out] p-7">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-400">
                            Monthly spending
                          </p>

                          <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                            ₹18,240
                          </p>

                          <p className="mt-2 text-xs font-medium text-emerald-600">
                            ↓ 12% less than last month
                          </p>
                        </div>

                        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">
                          Expenses
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="mt-10">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-600">
                            Spending overview
                          </p>

                          <p className="text-xs text-slate-400">This month</p>
                        </div>

                        <div className="flex h-44 items-end gap-3">
                          {[35, 48, 42, 62, 52, 70, 64, 84, 73, 94].map(
                            (height, index) => (
                              <div
                                key={index}
                                className="flex h-full flex-1 items-end rounded-t-md bg-emerald-50"
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

                      {/* Categories */}
                      <div className="mt-7 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-[10px] text-slate-400">Food</p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ₹5,240
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-[10px] text-slate-400">Travel</p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ₹3,180
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-[10px] text-slate-400">Shopping</p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ₹2,760
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= BUDGET PANEL ================= */}
                  {activePanel === 1 && (
                    <div className="animate-[fadeIn_500ms_ease-out] p-7">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-400">
                            Budget remaining
                          </p>

                          <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                            ₹11,760
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            39% of monthly budget remaining
                          </p>
                        </div>

                        <div className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-600">
                          Budget
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-12">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-600">
                            Monthly budget
                          </p>

                          <p className="text-sm font-bold text-slate-900">
                            61%
                          </p>
                        </div>

                        {/* First */}
                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[61%] rounded-full bg-violet-500" />
                        </div>
                      </div>

                      {/* Budget Categories */}
                      <div className="mt-10 space-y-4">
                        <div>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-medium text-slate-600">
                              Food
                            </span>

                            <span className="text-slate-400">
                              ₹5,240 / ₹8,000
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                                budgetVisible ? "w-[65%]" : "w-0"
                              }`}
                              style={{
                                transitionDelay: "0ms",
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-medium text-slate-600">
                              Travel
                            </span>

                            <span className="text-slate-400">
                              ₹3,180 / ₹5,000
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                                budgetVisible ? "w-[64%]" : "w-0"
                              }`}
                              style={{
                                transitionDelay: "150ms",
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-medium text-slate-600">
                              Shopping
                            </span>

                            <span className="text-slate-400">
                              ₹2,760 / ₹4,000
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                                budgetVisible ? "w-[69%]" : "w-0"
                              }`}
                              style={{
                                transitionDelay: "300ms",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= AI PANEL ================= */}
                  {activePanel === 2 && (
                    <div className="flex min-h-[390px] flex-col justify-center p-8">
                      <div className="mx-auto w-full max-w-md rounded-2xl border border-violet-100 bg-violet-50/40 p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-600">
                            AI
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Smart insight
                            </p>

                            <p className="text-xs text-violet-500">
                              Pattern detected
                            </p>
                          </div>
                        </div>

                        <p className="mt-6 text-xl font-semibold leading-8 text-slate-900">
                          Your food spending increased this month.
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                          You're spending more on food than usual. Setting a
                          weekly limit could help you stay within your budget.
                        </p>

                        <div className="mt-6 flex items-center gap-2 rounded-xl bg-white p-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-sm text-emerald-600">
                            ↗
                          </span>

                          <span className="text-xs font-medium text-slate-600">
                            Potential monthly saving: ₹1,200
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 border-t border-slate-100 px-6 py-4">
                  {[0, 1, 2].map((panel) => (
                    <button
                      key={panel}
                      type="button"
                      onClick={() => setActivePanel(panel)}
                      aria-label={`Show ${
                        panel === 0
                          ? "expenses"
                          : panel === 1
                            ? "budget"
                            : "AI insight"
                      }`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activePanel === panel
                          ? "w-6 bg-slate-900"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MOBILE HERO ================= */}
        <section className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden px-5 py-5 md:hidden">
          {/* Heading */}
          <div className="shrink-0 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
              Understand your money.
              <span className="block text-emerald-600">
                Make smarter decisions.
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-5 text-slate-500">
              Your personal AI companion for smarter spending and better
              budgets.
            </p>
          </div>

          {/* Financial Showcase */}
          <div className="relative mx-auto mt-5 min-h-0 w-full max-w-sm flex-1">
            {/* Glow */}
            <div className="absolute inset-6 rounded-full bg-emerald-300/20 blur-3xl" />

            {/* Card */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

                  <span className="text-[11px] font-semibold text-slate-500">
                    Financial overview
                  </span>
                </div>

                <span className="text-[10px] text-slate-400">Live</span>
              </div>

              {/* Panel Area */}
              <div className="min-h-0 flex-1 overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${activePanel * 100}%)`,
                  }}
                >
                  {/* ================= EXPENSES ================= */}
                  <div className="h-full w-full shrink-0 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-slate-400">
                          Monthly spending
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                          ₹18,240
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-emerald-600">
                          ↓ 12% less than last month
                        </p>
                      </div>

                      <div className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                        Expenses
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-slate-600">
                          Spending overview
                        </p>

                        <p className="text-[9px] text-slate-400">This month</p>
                      </div>

                      <div className="flex h-28 items-end gap-1.5">
                        {[35, 48, 42, 62, 52, 70, 64, 84, 73, 94].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex h-full flex-1 items-end rounded-t-sm bg-emerald-50"
                            >
                              <div
                                className={`w-full rounded-t-sm bg-emerald-500 transition-all duration-700 ${
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

                    {/* Expense Summary */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-slate-50 p-2.5">
                        <p className="text-[9px] text-slate-400">Food</p>

                        <p className="mt-1 text-xs font-bold text-slate-900">
                          ₹5,240
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-2.5">
                        <p className="text-[9px] text-slate-400">Travel</p>

                        <p className="mt-1 text-xs font-bold text-slate-900">
                          ₹3,180
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-2.5">
                        <p className="text-[9px] text-slate-400">Shopping</p>

                        <p className="mt-1 text-xs font-bold text-slate-900">
                          ₹2,760
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ================= BUDGET ================= */}
                  <div className="h-full w-full shrink-0 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-slate-400">
                          Budget remaining
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                          ₹11,760
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          39% of monthly budget remaining
                        </p>
                      </div>

                      <div className="rounded-lg bg-violet-50 px-2 py-1 text-[10px] font-semibold text-violet-600">
                        Budget
                      </div>
                    </div>

                    {/* Overall Budget */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-slate-600">
                          Monthly budget
                        </p>

                        <p className="text-xs font-bold text-slate-900">61%</p>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[61%] rounded-full bg-violet-500" />
                      </div>
                    </div>

                    {/* Budget Categories */}
                    <div className="mt-6 space-y-4">
                      {/* Food */}
                      <div>
                        <div className="mb-1.5 flex justify-between text-[10px]">
                          <span className="font-medium text-slate-600">
                            Food
                          </span>

                          <span className="text-slate-400">
                            ₹5,240 / ₹8,000
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                              budgetVisible ? "w-[65%]" : "w-0"
                            }`}
                            style={{
                              transitionDelay: "0ms",
                            }}
                          />
                        </div>
                      </div>

                      {/* Travel */}
                      <div>
                        <div className="mb-1.5 flex justify-between text-[10px]">
                          <span className="font-medium text-slate-600">
                            Travel
                          </span>

                          <span className="text-slate-400">
                            ₹3,180 / ₹5,000
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                              budgetVisible ? "w-[64%]" : "w-0"
                            }`}
                            style={{
                              transitionDelay: "150ms",
                            }}
                          />
                        </div>
                      </div>

                      {/* Shopping */}
                      <div>
                        <div className="mb-1.5 flex justify-between text-[10px]">
                          <span className="font-medium text-slate-600">
                            Shopping
                          </span>

                          <span className="text-slate-400">
                            ₹2,760 / ₹4,000
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full bg-emerald-500 transition-all duration-700 ${
                              budgetVisible ? "w-[69%]" : "w-0"
                            }`}
                            style={{
                              transitionDelay: "300ms",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================= AI INSIGHT ================= */}
                  <div className="flex h-full w-full shrink-0 items-center p-5">
                    <div className="w-full rounded-2xl border border-violet-100 bg-violet-50/40 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-bold text-violet-600">
                          AI
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-900">
                            Smart insight
                          </p>

                          <p className="text-[10px] text-violet-500">
                            Pattern detected
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-base font-semibold leading-6 text-slate-900">
                        Your food spending increased this month.
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        You're spending more on food than usual. Setting a
                        weekly limit could help you stay within your budget.
                      </p>

                      <div className="mt-5 flex items-center gap-2 rounded-xl bg-white p-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                          ↗
                        </span>

                        <span className="text-[10px] font-medium text-slate-600">
                          Potential monthly saving: ₹1,200
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex shrink-0 items-center justify-center gap-2 border-t border-slate-100 px-4 py-3">
                {[0, 1, 2].map((panel) => (
                  <button
                    key={panel}
                    type="button"
                    onClick={() => setActivePanel(panel)}
                    aria-label={`Show ${
                      panel === 0
                        ? "expenses"
                        : panel === 1
                          ? "budget"
                          : "AI insight"
                    }`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activePanel === panel
                        ? "w-5 bg-slate-900"
                        : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Get Started */}
          <div className="mt-4 shrink-0">
            <Link
              to="/register"
              className="block w-full rounded-xl bg-emerald-600 py-3.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
