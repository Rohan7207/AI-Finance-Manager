import React from "react";

const Dashboard = () => {
  const summaryCards = [
    {
      title: "Total Balance",
      value: "₹84,250",
      change: "+8.2%",
      subtitle: "vs last month",
      icon: "₹",
      iconStyle: "bg-emerald-50 text-emerald-600",
      changeStyle: "text-emerald-600",
    },
    {
      title: "Total Income",
      value: "₹68,500",
      change: "+12.5%",
      subtitle: "vs last month",
      icon: "↗",
      iconStyle: "bg-blue-50 text-blue-600",
      changeStyle: "text-blue-600",
    },
    {
      title: "Total Expenses",
      value: "₹32,750",
      change: "-4.8%",
      subtitle: "vs last month",
      icon: "↘",
      iconStyle: "bg-rose-50 text-rose-600",
      changeStyle: "text-rose-600",
    },
    {
      title: "Savings",
      value: "₹35,750",
      change: "+16.4%",
      subtitle: "this month",
      icon: "◈",
      iconStyle: "bg-violet-50 text-violet-600",
      changeStyle: "text-violet-600",
    },
  ];

  const transactions = [
    {
      name: "Swiggy",
      category: "Food",
      date: "Today, 7:42 PM",
      amount: "-₹420",
      icon: "🍔",
      iconStyle: "bg-orange-50",
    },
    {
      name: "Uber",
      category: "Travel",
      date: "Today, 5:18 PM",
      amount: "-₹280",
      icon: "🚕",
      iconStyle: "bg-slate-100",
    },
    {
      name: "Amazon",
      category: "Shopping",
      date: "Yesterday",
      amount: "-₹1,299",
      icon: "🛍️",
      iconStyle: "bg-yellow-50",
    },
    {
      name: "Salary",
      category: "Income",
      date: "Sep 1, 2026",
      amount: "+₹45,000",
      icon: "💰",
      iconStyle: "bg-emerald-50",
    },
  ];

  const budgets = [
    {
      name: "Food",
      spent: "₹6,250",
      limit: "₹10,000",
      percentage: 63,
      bar: "bg-orange-400",
    },
    {
      name: "Travel",
      spent: "₹4,100",
      limit: "₹8,000",
      percentage: 51,
      bar: "bg-blue-500",
    },
    {
      name: "Shopping",
      spent: "₹7,200",
      limit: "₹10,000",
      percentage: 72,
      bar: "bg-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white">
              N
            </div>

            <div>
              <p className="text-base font-bold tracking-tight">Nivora</p>
              <p className="hidden text-[10px] text-slate-400 sm:block">
                AI Finance Manager
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">
            <a href="#" className="text-sm font-medium text-emerald-600">
              Dashboard
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Transactions
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Budgets
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Insights
            </a>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <button className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 sm:block">
              + Add Transaction
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              R
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              Wednesday, September 2
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Good evening, Rohan 👋
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here's an overview of your finances.
            </p>
          </div>

          <button className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:w-auto">
            + Add Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${card.iconStyle}`}
                >
                  {card.icon}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  {card.value}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className={`font-semibold ${card.changeStyle}`}>
                    {card.change}
                  </span>

                  <span className="text-slate-400">{card.subtitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + AI Insight */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Income & Expenses */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Income & Expenses</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your income and expenses over the last 7 days
                </p>
              </div>

              <button className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
                This Week
              </button>
            </div>

            {/* Chart */}
            <div className="mt-8">
              <div className="relative h-52 sm:h-56">
                {/* Horizontal Grid */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <div key={line} className="border-t border-slate-100" />
                  ))}
                </div>

                {/* Y Axis */}
                <div className="absolute -left-1 top-0 flex h-full -translate-x-full flex-col justify-between pr-3 text-[10px] text-slate-400">
                  <span>₹60k</span>
                  <span>₹45k</span>
                  <span>₹30k</span>
                  <span>₹15k</span>
                  <span>₹0</span>
                </div>

                <svg
                  viewBox="0 0 700 220"
                  className="relative h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  {/* Income Area */}
                  <path
                    d="
                      M 0 75
                      C 70 85, 100 50, 170 65
                      S 250 90, 320 55
                      S 410 40, 470 65
                      S 550 45, 610 35
                      S 670 30, 700 20
                      L 700 220
                      L 0 220
                      Z
                    "
                    className="fill-emerald-50"
                  />

                  {/* Income */}
                  <path
                    d="
                      M 0 75
                      C 70 85, 100 50, 170 65
                      S 250 90, 320 55
                      S 410 40, 470 65
                      S 550 45, 610 35
                      S 670 30, 700 20
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="text-emerald-500"
                  />

                  {/* Income Points */}
                  {[
                    [0, 75],
                    [115, 58],
                    [220, 78],
                    [320, 55],
                    [470, 65],
                    [610, 35],
                    [700, 20],
                  ].map(([x, y], index) => (
                    <circle
                      key={`income-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      className="fill-white stroke-emerald-500"
                      strokeWidth="3"
                    />
                  ))}

                  {/* Expenses */}
                  <path
                    d="
                      M 0 150
                      C 70 140, 100 130, 170 145
                      S 250 155, 320 125
                      S 410 115, 470 130
                      S 550 140, 610 110
                      S 670 105, 700 90
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="text-violet-500"
                  />

                  {/* Expenses Points */}
                  {[
                    [0, 150],
                    [115, 135],
                    [220, 150],
                    [320, 125],
                    [470, 130],
                    [610, 110],
                    [700, 90],
                  ].map(([x, y], index) => (
                    <circle
                      key={`expense-${index}`}
                      cx={x}
                      cy={y}
                      r="5"
                      className="fill-white stroke-violet-500"
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>

              {/* Days */}
              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              {/* Legend */}
              <div className="mt-5 flex items-center gap-5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>Income</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  <span>Expenses</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                ✦
              </div>

              <div>
                <p className="text-sm font-semibold text-violet-700">
                  AI Financial Insight
                </p>

                <p className="text-xs text-violet-500">Powered by Nivora AI</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">
                Your spending looks healthy
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                You're currently spending less than your average weekly budget.
                Keep this pace to stay on track this month.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-violet-100 bg-white/70 p-4">
              <p className="text-xs font-medium text-violet-500">
                AI Recommendation
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                You could save approximately ₹4,200 this month by reducing food
                and shopping expenses.
              </p>
            </div>

            <button className="mt-6 text-sm font-medium text-violet-600 transition hover:text-violet-700">
              View detailed insights →
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Transactions</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest financial activity
                </p>
              </div>

              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                View all
              </button>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <div
                  key={transaction.name}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${transaction.iconStyle}`}
                    >
                      {transaction.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {transaction.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {transaction.category} · {transaction.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`shrink-0 text-sm font-semibold ${
                      transaction.amount.startsWith("+")
                        ? "text-emerald-600"
                        : "text-slate-900"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Budget Overview</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monthly spending limits
                </p>
              </div>

              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                Manage
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {budgets.map((budget) => (
                <div key={budget.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {budget.name}
                    </span>

                    <span className="text-xs text-slate-400">
                      {budget.spent} / {budget.limit}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${budget.bar}`}
                      style={{
                        width: `${budget.percentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-1 text-right text-xs text-slate-400">
                    {budget.percentage}% used
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                Monthly budget
              </p>

              <p className="mt-1 text-xl font-bold">
                ₹28,450
                <span className="ml-1 text-xs font-normal text-slate-400">
                  remaining
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Add Transaction */}
        <button className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-medium text-white shadow-lg transition hover:bg-emerald-600 sm:hidden">
          +
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
