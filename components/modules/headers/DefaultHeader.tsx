import React from "react";

type Props = {
  setApiKey?: any;
  apiKey?: any;
};
const DefaultHeader = ({ setApiKey, apiKey }: Props) => {
  return (
    <>
      <nav className="bg-white border-gray-200 drop-shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-2xl font-semibold text-gray-900">
              {`PropSpect`}
            </span>
          </a>
          <div className="block w-auto" id="navbar-default">
            <ul className="font-medium flex rounded-lg bg-gray-50 flex-row space-x-8 bg-white">
              <li>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) =>
                    setApiKey(e.target.value ? e.target.value : "")
                  }
                  placeholder="OpenAI API key"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DefaultHeader;

/*
<a
                  href="#"
                  className="block rounded bg-transparent text-blue-700 py-2 pl-4 pr-4"
                  aria-current="page"
                >
                  Home
                </a>
*/
