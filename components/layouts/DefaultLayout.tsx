"use client";

import React, { useState } from "react";
import DefaultFooter from "../modules/footers/DefaultFooter";
import DefaultHeader from "../modules/headers/DefaultHeader";
import ApiKeyContext from "./ApiKeyContext";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <>
      <DefaultHeader apiKey={apiKey} setApiKey={setApiKey} />
      <ApiKeyContext.Provider value={apiKey}>{children}</ApiKeyContext.Provider>
      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
