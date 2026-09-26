import api from "../api";
import React, { useEffect, useRef, useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal";

const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const hasActiveFilters =
    category !== "all" || dateRange !== "all" || sortBy !== "newest";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }

      if (!event.target.closest("[data-transaction-menu]")) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const [expenseResponse, incomeResponse] = await Promise.all([
        api.get("/expenses", { withCredentials: true }),
        api.get("/incomes", { withCredentials: true }),
      ]);

      const expenses = expenseResponse.data.expenses || [];
      const incomes = incomeResponse.data.incomes || [];

      const normalizedTransactions = [
        ...expenses.map((expense) => ({
          id: expense._id,
          type: "expense",
          amount: expense.amount,
          description: expense.description || "",
          category: expense.category,
          date: expense.expenseDate,
          paymentMethod: expense.paymentMethod,
          notes: expense.notes || "",
          createdAt: expense.createdAt,
        })),

        ...incomes.map((income) => ({
          id: income._id,
          type: "income",
          amount: income.amount,
          description: income.description || "",
          category: income.source,
          date: income.incomeDate,
          receivedFrom: income.receivedFrom,
          notes: income.notes || "",
          createdAt: income.createdAt,
        })),
      ];

      setTransactions(normalizedTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getDateRangeStart = () => {
    const today = new Date();

    if (dateRange === "all") return null;

    if (dateRange === "thisMonth") {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }

    if (dateRange === "lastMonth") {
      return new Date(today.getFullYear(), today.getMonth() - 1, 1);
    }

    if (dateRange === "last3Months") {
      return new Date(today.getFullYear(), today.getMonth() - 2, 1);
    }

    return null;
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filter === "all" || transaction.type === filter;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      transaction.description.toLowerCase().includes(searchText) ||
      transaction.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "all" || transaction.category === category;

    const transactionDate = new Date(transaction.date);
    const rangeStart = getDateRangeStart();

    const matchesDate = !rangeStart || transactionDate >= rangeStart;

    return matchesType && matchesSearch && matchesCategory && matchesDate;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortBy === "amountHigh") {
      return b.amount - a.amount;
    }

    if (sortBy === "amountLow") {
      return a.amount - b.amount;
    }

    return 0;
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const formatTransactionDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const summaryCards = [
    {
      title: "Total Income",
      value: formatAmount(totalIncome),
      icon: "↗",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Expenses",
      value: formatAmount(totalExpenses),
      icon: "↘",
      iconStyle: "bg-rose-50 text-rose-600",
    },
    {
      title: "Net Balance",
      value: formatAmount(netBalance),
      icon: "₹",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Transactions",
      value: transactions.length,
      icon: "≡",
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-700 sm:text-3xl">
              Transactions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track and manage all your income and expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddTransaction(true)}
            className="hidden w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 sm:w-auto sm:block"
          >
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

              <h2 className="mt-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Transactions Card */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          {/* Card Header */}
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  All Transactions
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  View and manage your recent financial activity.
                </p>
              </div>

              {/* Filters */}
              <div className="flex w-full overflow-x-auto rounded-lg border border-slate-200 p-1 lg:w-auto">
                {[
                  { label: "All", value: "all" },
                  { label: "Income", value: "income" },
                  { label: "Expenses", value: "expense" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilter(item.value)}
                    className={`shrink-0 rounded-md px-4 py-1.5 text-xs font-medium transition ${
                      filter === item.value
                        ? "bg-slate-100 text-slate-700"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search + Filters */}
            <div className="mt-5 flex items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100 sm:max-w-md"
              />

              <div ref={filterRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Filters
                  {hasActiveFilters && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[10px] font-semibold text-white">
                      {
                        [
                          category !== "all",
                          dateRange !== "all",
                          sortBy !== "newest",
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                  <span className="text-xs">⌄</span>
                </button>

                {showFilters && (
                  <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        Filters
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setCategory("all");
                          setDateRange("all");
                          setSortBy("newest");
                          setShowFilters(false);
                        }}
                        className="text-xs font-medium text-slate-400 hover:text-slate-700"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 outline-none focus:border-slate-300"
                      >
                        <option value="all">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Salary">Salary</option>
                        <option value="Freelance">Freelance</option>
                      </select>

                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 outline-none focus:border-slate-300"
                      >
                        <option value="all">All Time</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="last3Months">Last 3 Months</option>
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 outline-none focus:border-slate-300"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="amountHigh">Amount: High to Low</option>
                        <option value="amountLow">Amount: Low to High</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-400">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedTransactions.map((transaction) => {
                  const isIncome = transaction.type === "income";

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ${
                              isIncome
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {isIncome ? "↗" : "↘"}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {transaction.description}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {isIncome ? "Income" : "Expense"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {transaction.category}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatTransactionDate(transaction.date)}
                      </td>

                      <td
                        className={`px-6 py-4 text-right text-sm font-semibold ${
                          isIncome ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatAmount(transaction.amount)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div
                          data-transaction-menu
                          className="relative inline-block"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === transaction.id
                                  ? null
                                  : transaction.id,
                              )
                            }
                            className="text-lg font-semibold text-slate-400 transition hover:text-slate-700"
                          >
                            ⋮
                          </button>

                          {activeMenuId === transaction.id && (
                            <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-lg">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setActiveMenuId(null);
                                }}
                                className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                              >
                                View details
                              </button>

                              <button className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">
                                Edit
                              </button>

                              <button className="w-full rounded-lg px-3 py-2 text-left text-xs text-rose-500 hover:bg-rose-50">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="divide-y divide-slate-100 md:hidden">
            {sortedTransactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <div key={transaction.id} className="relative p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                          isIncome
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {isIncome ? "↗" : "↘"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {transaction.description}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {transaction.category} ·{" "}
                          {formatTransactionDate(transaction.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <p
                        className={`text-sm font-semibold ${
                          isIncome ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatAmount(transaction.amount)}
                      </p>

                      <div data-transaction-menu className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === transaction.id
                                ? null
                                : transaction.id,
                            )
                          }
                          className="px-1 text-lg font-semibold text-slate-400 transition hover:text-slate-700"
                        >
                          ⋮
                        </button>

                        {activeMenuId === transaction.id && (
                          <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setActiveMenuId(null);
                              }}
                              className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                            >
                              View details
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">
                              Edit
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-xs text-rose-500 hover:bg-rose-50">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {sortedTransactions.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-slate-600">
                No transactions found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your filters or add a new transaction.
              </p>
            </div>
          )}
        </div>

        {/* View Details Modal */}
        {selectedTransaction && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedTransaction(null);
              }
            }}
          >
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Transaction Details
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    View transaction information
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTransaction(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4 p-5 sm:p-6">
                <div>
                  <p className="text-xs text-slate-400">Description</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedTransaction.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Type</p>
                    <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                      {selectedTransaction.type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Category</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedTransaction.category}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Amount</p>
                  <p
                    className={`mt-1 text-lg font-semibold ${
                      selectedTransaction.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {selectedTransaction.type === "income" ? "+" : "-"}
                    {formatAmount(selectedTransaction.amount)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {formatTransactionDate(selectedTransaction.date)}
                    </p>
                  </div>

                  {selectedTransaction.type === "expense" ? (
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Payment Method
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {selectedTransaction.paymentMethod || "Not specified"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Received From
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {selectedTransaction.receivedFrom || "Not specified"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs text-slate-400">Notes</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {selectedTransaction.notes || "No notes added"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Created At</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {formatTransactionDate(selectedTransaction.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add transaction modal */}
        <AddTransactionModal
          isOpen={showAddTransaction}
          onClose={() => setShowAddTransaction(false)}
          onTransactionAdded={() => {
            fetchTransactions();
          }}
        />
      </main>

      {/* Mobile Add Button */}
      <button
        type="button"
        onClick={() => setShowAddTransaction(true)}
        className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-medium text-white shadow-lg transition hover:bg-emerald-600 sm:hidden"
      >
        +
      </button>
    </div>
  );
};

export default Transactions;
