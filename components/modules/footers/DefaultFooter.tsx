import Link from "next/link";
import React from "react";

const DefaultFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear}{" "}
          <Link href="/" className="font-medium text-gray-700 hover:underline">{`PropSpect`}</Link>
          {`. Data from `}
          <a
            href="https://www.datos.gov.co/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >{`Datos Abiertos Colombia`}</a>
          {`.`}
        </p>
        <ul className="flex gap-4">
          <li>
            <Link
              href="https://github.com/jpyoda/propspect/blob/main/LICENSE"
              target="_blank"
              className="hover:underline"
            >{`Licensing`}</Link>
          </li>
          <li>
            <Link
              href="https://www.juanpgonzalez.com/"
              target="_blank"
              className="hover:underline"
            >{`Contact`}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default DefaultFooter;
