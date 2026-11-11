import React from "react";
import SearchIcon from "@/components/elements/icons/SearchIcon";

type Props = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
};

const PropertySearch = ({ searchTerm, onSearchTermChange, onSearch, disabled }: Props) => {
  return (
    <form onSubmit={onSearch} className="flex flex-col gap-2 sm:flex-row" role="search">
      <label htmlFor="property-search" className="sr-only">{`Describe the property you want`}</label>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
          <SearchIcon className="h-4 w-4" />
        </div>
        <input
          type="text"
          id="property-search"
          className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-hidden focus:ring-4 focus:ring-brand-100"
          placeholder="Apartamentos en Chicó estrato 6"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-brand-200 disabled:cursor-wait disabled:opacity-70"
      >
        <SearchIcon className="h-4 w-4" />
        {`Search`}
      </button>
    </form>
  );
};

export default PropertySearch;
