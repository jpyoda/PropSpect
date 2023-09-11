import Link from "next/link";
import React from "react";

const DefaultFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-slate-50 p-4">
      <footer className="bg-white rounded-lg shadow">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {currentYear}{" "}
            <Link href="/" className="hover:underline">{`PropSpect.`}</Link>{" "}
            {`All Rights Reserved.`}
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li>
              <Link
                href="https://github.com/jpyoda/propspect/blob/main/LICENSE"
                target="_blank"
                className="hover:underline mx-2"
              >{`Licensing`}</Link>
            </li>
            <li>
              <Link
                href="https://www.juanpgonzalez.com/"
                target="_blank"
                className="hover:underline mx-2"
              >{`Contact`}</Link>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default DefaultFooter;
