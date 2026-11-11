import React from "react";

/** House with a magnifier: the PropSpect mark. */
const Logo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect width="32" height="32" rx="8" className="fill-brand-600" />
    <path
      d="M8 15.5 15 9.5l7 6V23a1 1 0 0 1-1 1h-3.5v-4.5h-5V24H9a1 1 0 0 1-1-1z"
      className="fill-white"
    />
    <circle cx="21.5" cy="20.5" r="3.6" className="fill-brand-600 stroke-white" strokeWidth="1.8" />
    <path d="m24.2 23.2 2.6 2.6" className="stroke-white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default Logo;
