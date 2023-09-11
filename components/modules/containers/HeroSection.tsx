import PropertySearch from "@/components/elements/inputs/PropertySearch";
import React from "react";

type Props = {
  searchTerm: string;
  handleInputChange: any;
  handleSearch: any;
};
const HeroSection = ({
  searchTerm,
  handleInputChange,
  handleSearch,
}: Props) => {
  return (
    <section>
      <div className="py-4 px-4 mx-auto max-w-screen-md text-center">
        <div className="mb-4">
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5">
            {`The AI Revolution for Brokers`}
          </span>
        </div>
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          {`Discover Properties in Seconds`}
        </h1>
        <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl px-12">
          {`Ditch the Filters. Delve Directly into Prime Properties. Experience instant, AI-powered property discovery without the hassle.`}
        </p>
        <PropertySearch
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
        <div
          className="w-full p-4 mb-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 text-left"
          role="alert"
        >
          <span className="font-medium mb-2">{`📌 Sample Queries:`}</span>
          <p>{`¿Dame apartamentos en Bogota estrato seis?`}</p>
          <p>{`¿Dame casas en Bogota estrato 5?`}</p>
          <p>{`¿Lotes comercial en el barrio Tintala?`}</p>
          <p>{`¿Barrio La Calera estrato rural?`}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
