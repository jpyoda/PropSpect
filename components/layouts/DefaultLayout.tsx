"use client";

import React, { useEffect, useState } from "react";
import DefaultFooter from "../modules/footers/DefaultFooter";
import DefaultHeader from "../modules/headers/DefaultHeader";
import ApiKeyContext from "./ApiKeyContext";

const STORAGE_KEY = "propspect.openaiApiKey";

function readStoredKey(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function writeStoredKey(value: string | null) {
  try {
    if (value) window.sessionStorage.setItem(STORAGE_KEY, value);
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode, blocked): the key just isn't remembered.
  }
}

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);

  // Restore a key remembered for this tab. Reading sessionStorage must wait
  // until after hydration, so this runs once on mount.
  useEffect(() => {
    const stored = readStoredKey();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
      setApiKey(stored);
      setRemember(true);
    }
  }, []);

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    if (remember) writeStoredKey(value);
  };

  const handleRememberChange = (value: boolean) => {
    setRemember(value);
    writeStoredKey(value ? apiKey : null);
  };

  return (
    <>
      <DefaultHeader
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        remember={remember}
        onRememberChange={handleRememberChange}
      />
      <ApiKeyContext.Provider value={apiKey}>{children}</ApiKeyContext.Provider>
      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
