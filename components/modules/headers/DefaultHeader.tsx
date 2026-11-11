import Link from "next/link";
import React from "react";

type Props = {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  remember: boolean;
  onRememberChange: (value: boolean) => void;
};

const DefaultHeader = ({ apiKey, onApiKeyChange, remember, onRememberChange }: Props) => {
  return (
    <nav className="bg-white border-gray-200 drop-shadow-sm">
      <div className="max-w-(--breakpoint-xl) flex flex-wrap gap-4 items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold text-gray-900">
            {`PropSpect`}
          </span>
        </Link>
        <div className="w-full sm:w-80">
          <label htmlFor="openai-api-key" className="sr-only">
            {`OpenAI API key`}
          </label>
          <input
            id="openai-api-key"
            type="password"
            autoComplete="off"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="OpenAI API key"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <div className="mt-1 flex items-center justify-between gap-2 text-xs text-gray-500">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => onRememberChange(e.target.checked)}
              />
              {`Remember for this tab`}
            </label>
            <a
              href="https://platform.openai.com/settings/organization/limits"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >{`Set a spending limit`}</a>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {`Your key is sent only to OpenAI, directly from your browser.`}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default DefaultHeader;
