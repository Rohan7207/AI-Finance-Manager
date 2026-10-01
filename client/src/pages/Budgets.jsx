import React, { useEffect, useState } from "react";
import api from "../api";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [pageLimit, setPageLimit] = useState(12);

  useEffect(() => {
    const updatePageLimit = () => {
      if (window.innerWidth < 640) {
        setPageLimit(6);
      } else if (window.innerWidth < 1024) {
        setPageLimit(9);
      } else {
        setPageLimit(12);
      }
    };

    updatePageLimit();

    window.addEventListener("resize", updatePageLimit);

    return () => {
      window.removeEventListener("resize", updatePageLimit);
    };
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/budgets", {
        params: {
          page,
          limit: pageLimit,
        },
        withCredentials: true,
      });

      const budgetList = response.data.budgets || [];

      setPagination(response.data.pagination || null);

      const budgetsWithAnalytics = await Promise.all(
        budgetList.map(async (budget) => {
          try {
            const analyticsResponse = await api.get(
              `/budgets/${budget._id}/analytics`,
              {
                withCredentials: true,
              },
            );

            return {
              ...budget,
              analytics: analyticsResponse.data.analytics,
            };
          } catch (err) {
            console.error(
              `Failed to load analytics for budget ${budget._id}`,
              err,
            );

            return {
              ...budget,
              analytics: null,
            };
          }
        }),
      );

      setBudgets(budgetsWithAnalytics);
    } catch (err) {
      console.error(err);
      setError("Failed to load budgets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [page, pageLimit]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Budgets
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Plan your spending and keep track of your financial goals.
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:w-auto"
          >
            + Add Budget
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="h-5 w-32 animate-pulse rounded bg-slate-100" />
              <div className="mt-3 h-4 w-64 animate-pulse rounded bg-slate-100" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
              {error}
            </div>
          ) : budgets.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <h2 className="text-base font-semibold text-slate-800">
                Add your first budget
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Set a spending limit and start tracking your progress toward
                your financial goals.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Add Budget
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {budgets.map((budget) => (
                <div
                  key={budget._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h2 className="font-semibold text-slate-900">
                    {budget.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(budget.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    –{" "}
                    {new Date(budget.endDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Spent</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        ₹
                        {(budget.analytics?.spent || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <p className="text-xs text-slate-400">
                      of ₹{budget.amount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{
                        width: `${Math.min(
                          budget.analytics?.percentageUsed || 0,
                          100,
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span
                      className={
                        (budget.analytics?.percentageUsed || 0) >= 100
                          ? "font-medium text-rose-600"
                          : "text-slate-400"
                      }
                    >
                      {Math.min(budget.analytics?.percentageUsed || 0, 100)}%
                      used
                    </span>

                    {(budget.analytics?.remaining || 0) < 0 ? (
                      <span className="font-medium text-rose-600">
                        ₹
                        {Math.abs(budget.analytics.remaining).toLocaleString(
                          "en-IN",
                        )}{" "}
                        over budget
                      </span>
                    ) : (
                      <span className="font-medium text-emerald-600">
                        ₹{budget.analytics?.remaining.toLocaleString("en-IN")}{" "}
                        remaining
                      </span>
                    )}
                  </div>

                  {(budget.analytics?.percentageUsed || 0) >= 100 && (
                    <div className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                      ⚠ Budget exceeded
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Budgets;
