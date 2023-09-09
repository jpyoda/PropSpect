import Image from "next/image";
import React from "react";

const DefaultHeader = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-2xl font-semibold text-gray-900">
              {`PropSpect`}
            </span>
          </a>
          <div className="block w-auto" id="navbar-default">
            <ul className="font-medium flex rounded-lg bg-gray-50 flex-row space-x-8 bg-white">
              <li>
                <a
                  href="#"
                  className="block rounded bg-transparent text-blue-700 py-2 pl-4 pr-4"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 rounded hover:bg-transparent border-0 hover:text-blue-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DefaultHeader;
