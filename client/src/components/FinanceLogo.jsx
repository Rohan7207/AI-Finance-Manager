import React from "react";

const FinanceLogo = ({ showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Abstract A + Growth Logo */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-lg">
        <svg
          viewBox="0 0 40 40"
          className="h-7 w-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main A shape */}
          <path
            d="M8 29L16.8 9H21.5L30 29"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* A crossbar */}
          <path
            d="M12.5 22H25.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Growth line integrated into A */}
          <path
            d="M20 25L24 21L27 23L32 16"
            stroke="#34D399"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI point */}
          <circle cx="32" cy="16" r="1.8" fill="#A78BFA" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Nivora
        </span>
      )}
    </div>
  );
};

export default FinanceLogo;
