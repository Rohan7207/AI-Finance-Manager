import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState(null);

  const [chartPeriod, setChartPeriod] = useState("week");
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile", {
          withCredentials: true,
        });

        setProfile(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await api.get("/dashboard", {
          withCredentials: true,
        });

        setDashboardData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchFinancialTrend = async () => {
      try {
        setChartLoading(true);
        setChartError("");

        const response = await api.get("/dashboard/financial-trend", {
          params: {
            period: chartPeriod,
          },
          withCredentials: true,
        });

        setChartData(response.data.financialTrend || []);
      } catch (err) {
        console.error(err);
        setChartError("Failed to load financial trend.");
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    };

    fetchFinancialTrend();
  }, [chartPeriod]);

  const summaryCards = [
    {
      title: "Total Balance",
      value: dashboardData
        ? `₹${dashboardData.balance.toLocaleString("en-IN")}`
        : "-",
      change: dashboardData
        ? `${dashboardData.changes.balanceChange > 0 ? "+" : ""}${dashboardData.changes.balanceChange}%`
        : "-",
      subtitle: "vs last month",
      icon: "₹",
      iconStyle: "bg-emerald-50 text-emerald-600",
      changeStyle: "text-emerald-600",
    },
    {
      title: "Total Income",
      value: dashboardData
        ? `₹${dashboardData.totalIncome.toLocaleString("en-IN")}`
        : "-",
      change: dashboardData
        ? `${dashboardData.changes.incomeChange > 0 ? "+" : ""}${dashboardData.changes.incomeChange}%`
        : "-",
      subtitle: "vs last month",
      icon: "↗",
      iconStyle: "bg-blue-50 text-blue-600",
      changeStyle: "text-blue-600",
    },
    {
      title: "Total Expenses",
      value: dashboardData
        ? `₹${dashboardData.totalExpense.toLocaleString("en-IN")}`
        : "-",
      change: dashboardData
        ? `${dashboardData.changes.expenseChange > 0 ? "+" : ""}${dashboardData.changes.expenseChange}%`
        : "-",
      subtitle: "vs last month",
      icon: "↘",
      iconStyle: "bg-rose-50 text-rose-600",
      changeStyle: "text-rose-600",
    },
    {
      title: "Savings",
      value: dashboardData
        ? `₹${dashboardData.monthly.savings.toLocaleString("en-IN")}`
        : "-",
      change: dashboardData
        ? `${dashboardData.changes.savingsChange > 0 ? "+" : ""}${dashboardData.changes.savingsChange}%`
        : "-",
      subtitle: "this month",
      icon: "◈",
      iconStyle: "bg-violet-50 text-violet-600",
      changeStyle: "text-violet-600",
    },
  ];

  const transactions = dashboardData?.recentTransactions || [];
  const budgets = dashboardData?.budgetOverview || [];

  const chartPoints = chartData.map((item) => ({
    date: item.date,
    income: item.income,
    expense: item.expense,
  }));

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
        ? "Good afternoon"
        : "Good evening";

  const chartPeriodLabel = {
    week: "last 7 days",
    month: "last 30 days",
    year: "last 12 months",
  };

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
              {profile?.username?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mt-1 text-sm text-slate-500">
              Your income and expenses over the {chartPeriodLabel[chartPeriod]}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {greeting}, {profile?.username || "there"} 👋
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
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  {card.title}
                </p>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${card.iconStyle}`}
                >
                  {card.icon}
                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                  {card.value}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Income & Expenses</h2>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  {chartPeriod === "week"
                    ? "Your income and expenses over the last 7 days"
                    : chartPeriod === "month"
                      ? "Your income and expenses over the last 30 days"
                      : "Your income and expenses over the last 12 months"}
                </p>
              </div>

              <div className="flex shrink-0 rounded-lg border border-slate-200 p-1">
                {["week", "month", "year"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                      chartPeriod === period
                        ? "bg-slate-100 text-slate-700"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="mt-8">
              <div className="h-44 sm:h-56">
                {chartLoading ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    Loading chart...
                  </div>
                ) : chartError ? (
                  <div className="flex h-full items-center justify-center text-sm text-rose-500">
                    {chartError}
                  </div>
                ) : chartPoints.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    No financial data available.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartPoints}
                      margin={{ top: 10, right: 10, left: 5, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f1f5f9"
                      />

                      <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        tickFormatter={(date) => {
                          const formattedDate = new Date(date);

                          if (chartPeriod === "week") {
                            return formattedDate.toLocaleDateString("en-IN", {
                              weekday: "short",
                            });
                          }

                          if (chartPeriod === "month") {
                            return formattedDate.toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                            });
                          }

                          return formattedDate.toLocaleDateString("en-IN", {
                            month: "short",
                          });
                        }}
                        tick={{
                          fontSize: 10,
                          fill: "#94a3b8",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        tick={{
                          fontSize: 10,
                          fill: "#94a3b8",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) =>
                          value >= 1000 ? `₹${value / 1000}k` : `₹${value}`
                        }
                      />

                      <Tooltip
                        cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }}
                        formatter={(value, name) => [
                          `₹${Number(value).toLocaleString("en-IN")}`,
                          name === "income" ? "Income" : "Expenses",
                        ]}
                        labelFormatter={(date) =>
                          new Date(date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })
                        }
                      />

                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                          fill: "#ffffff",
                          stroke: "#10b981",
                          strokeWidth: 2,
                        }}
                        activeDot={{
                          r: 6,
                          strokeWidth: 2,
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{
                          r: 4,
                          fill: "#ffffff",
                          stroke: "#8b5cf6",
                          strokeWidth: 2,
                        }}
                        activeDot={{
                          r: 6,
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
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
              {transactions.map((transaction, index) => {
                const isIncome = transaction.type === "income";

                return (
                  <div
                    key={`${transaction.date}-${index}`}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 capitalize items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isIncome ? "bg-emerald-50" : "bg-rose-50"
                        }`}
                      >
                        {isIncome ? "↗" : "↘"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {transaction.description}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {isIncome ? transaction.source : transaction.category}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`shrink-0 text-sm font-semibold ${
                        isIncome ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {isIncome ? "+" : "-"}₹
                      {transaction.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
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

            <div className="mt-8 space-y-8">
              {budgets
                .filter((budget) => budget.name !== "Unnamed Budget")
                .slice(0, 3)
                .map((budget) => (
                  <div key={budget.budgetId}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {budget.name}
                      </span>

                      <span className="text-xs text-slate-400">
                        ₹{budget.spent.toLocaleString("en-IN")} / ₹
                        {budget.budget.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.min(budget.percentageUsed, 100)}%`,
                        }}
                      />
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>{budget.percentageUsed}% used</span>
                      <span>
                        ₹{budget.remaining.toLocaleString("en-IN")} remaining
                      </span>
                    </div>
                  </div>
                ))}
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
