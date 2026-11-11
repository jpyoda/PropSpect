"use client";

import React from "react";

export type ApiKeyContextValue = {
  apiKey: string;
  /** Opens the API key panel in the header and focuses the input. */
  requestApiKey: () => void;
};

const ApiKeyContext = React.createContext<ApiKeyContextValue>({
  apiKey: "",
  requestApiKey: () => {},
});

export default ApiKeyContext;
