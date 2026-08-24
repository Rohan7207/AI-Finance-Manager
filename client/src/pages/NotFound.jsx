import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-slate-900">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
