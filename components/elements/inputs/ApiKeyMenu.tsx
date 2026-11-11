"use client";

import React, { useEffect, useId, useRef } from "react";

type Props = {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  remember: boolean;
  onRememberChange: (value: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Compact "Add API key" button that opens a small panel with the key input,
 * so the header stays light on phones.
 */
const ApiKeyMenu = ({
  apiKey,
  onApiKeyChange,
  remember,
  onRememberChange,
  open,
  onOpenChange,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();
  const hasKey = apiKey.length > 0;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) onOpenChange(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus:outline-hidden focus-visible:ring-4 focus-visible:ring-brand-200 ${
          hasKey
            ? "border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100"
            : "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${hasKey ? "bg-brand-500" : "bg-amber-500"}`}
        />
        {hasKey ? "API key added" : "Add OpenAI key"}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="OpenAI API key"
          className="absolute right-0 z-20 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <label htmlFor="openai-api-key" className="mb-1.5 block text-sm font-medium text-gray-900">
            {`OpenAI API key`}
          </label>
          <input
            ref={inputRef}
            id="openai-api-key"
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onOpenChange(false);
            }}
            placeholder="sk-…"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-hidden focus:ring-2 focus:ring-brand-200"
          />
          <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => onRememberChange(e.target.checked)}
              className="h-4 w-4 accent-brand-600"
            />
            {`Remember for this tab`}
          </label>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            {`Your key is sent only to OpenAI, directly from your browser. `}
            <a
              href="https://platform.openai.com/settings/organization/limits"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-brand-700 hover:underline"
            >{`Set a spending limit`}</a>
            {` to stay in control of costs.`}
          </p>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-4 w-full rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-brand-200"
          >
            {`Done`}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ApiKeyMenu;
