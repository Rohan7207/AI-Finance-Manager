import React from "react";
import { useOutletContext } from "react-router-dom";

const Account = () => {
  const { profile } = useOutletContext();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account information.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Profile */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
            {profile?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-900">
              {profile?.username || "User"}
            </h2>

            <p className="truncate text-sm text-slate-400">
              {profile?.email || "No email available"}
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div className="pt-6">
          <h3 className="text-sm font-semibold text-slate-900">
            Account Information
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-400">Username</p>
              <p className="mt-1 text-sm text-slate-700">
                {profile?.username || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Email</p>
              <p className="mt-1 text-sm text-slate-700">
                {profile?.email || "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
