import React, { useState } from "react";
import api from "../api";

const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    type: "expense",
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
    receivedFrom: "",
    notes: "",
  });
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const incomeCategories = [
    "Salary",
    "Freelancing",
    "Business",
    "Investment",
    "Rental",
    "Gift",
    "Others",
  ];

  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Health",
    "Education",
    "Entertainment",
    "Investment",
    "Others",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTransaction.amount || Number(newTransaction.amount) <= 0) {
      setFormError("Please enter a valid amount.");
      return;
    }

    if (!newTransaction.category) {
      setFormError(
        newTransaction.type === "income"
          ? "Please select a source."
          : "Please select a category.",
      );
      return;
    }

    if (!newTransaction.date) {
      setFormError("Please select a date.");
      return;
    }

    if (newTransaction.type === "expense" && !newTransaction.paymentMethod) {
      setFormError("Please select a payment method.");
      return;
    }

    if (
      newTransaction.type === "income" &&
      !newTransaction.receivedFrom.trim()
    ) {
      setFormError("Please enter who the income was received from.");
      return;
    }

    try {
      setFormError("");

      let response;

      if (newTransaction.type === "expense") {
        response = await api.post(
          "/expenses",
          {
            amount: Number(newTransaction.amount),
            category: newTransaction.category,
            paymentMethod: newTransaction.paymentMethod,
            expenseDate: newTransaction.date,
            description: newTransaction.description.trim() || undefined,
            notes: newTransaction.notes.trim() || undefined,
          },
          {
            withCredentials: true,
          },
        );
      } else {
        response = await api.post(
          "/incomes",
          {
            amount: Number(newTransaction.amount),
            source: newTransaction.category,
            receivedFrom: newTransaction.receivedFrom.trim(),
            incomeDate: newTransaction.date,
            description: newTransaction.description.trim() || undefined,
            notes: newTransaction.notes.trim() || undefined,
          },
          {
            withCredentials: true,
          },
        );
      }

      onTransactionAdded?.(response.data);

      setNewTransaction({
        description: "",
        type: "expense",
        category: "",
        amount: "",
        date: "",
        paymentMethod: "",
        receivedFrom: "",
        notes: "",
      });

      onClose();
    } catch (error) {
      setFormError(
        error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Failed to add transaction. Please try again.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/30 p-4 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-auto w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Add Transaction
            </h3>

            <p className="mt-0.5 text-xs text-slate-400">
              Record a new income or expense
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {formError && (
          <div className="mx-5 mt-4 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-600 sm:mx-6">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
          {/* Type */}
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">Type</p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Income", value: "income" },
                { label: "Expense", value: "expense" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      type: item.value,
                      category: "",
                      paymentMethod: "",
                      receivedFrom: "",
                    }))
                  }
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    newTransaction.type === item.value
                      ? item.value === "income"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              {newTransaction.type === "income"
                ? "Income Description"
                : "Expense Description"}
            </label>

            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={
                newTransaction.type === "income"
                  ? "e.g. Monthly salary"
                  : "e.g. Grocery shopping"
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">
                Amount
              </label>

              <input
                type="number"
                min="0"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="₹0"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500">
                {newTransaction.type === "income" ? "Source" : "Category"}
              </label>

              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
              >
                <option value="">
                  {newTransaction.type === "income"
                    ? "Select source"
                    : "Select category"}
                </option>

                {(newTransaction.type === "income"
                  ? incomeCategories
                  : expenseCategories
                ).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date + Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Date</label>

              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            {newTransaction.type === "income" && (
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Received From
                </label>

                <input
                  type="text"
                  value={newTransaction.receivedFrom}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      receivedFrom: e.target.value,
                    }))
                  }
                  placeholder="e.g. Company"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            )}

            {newTransaction.type === "expense" && (
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Payment Method
                </label>

                <select
                  value={newTransaction.paymentMethod}
                  onChange={(e) =>
                    setNewTransaction((prev) => ({
                      ...prev,
                      paymentMethod: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                >
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Wallet">Wallet</option>
                </select>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-slate-500">Notes</label>

            <textarea
              value={newTransaction.notes}
              onChange={(e) =>
                setNewTransaction((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              rows="3"
              placeholder="Optional notes..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
