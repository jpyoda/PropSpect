import React from "react";
import DefaultFooter from "../modules/footers/DefaultFooter";
import DefaultHeader from "../modules/headers/DefaultHeader";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <DefaultHeader />
      {children}
      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
