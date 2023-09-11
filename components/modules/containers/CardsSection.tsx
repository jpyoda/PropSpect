import React from "react";

type Props = {
  inmuebles?: any;
};
const CardsSection = ({ inmuebles }: Props) => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {inmuebles?.map((v: any, i: number) => (
            <div
              key={i}
              className="items-center bg-gray-50 rounded-lg shadow-lg sm:flex"
            >
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 c-capitalize">
                  {v?.tipo_de_inmueble}
                </h3>
                <p className="text-gray-500 p-0 c-capitalize">{`${v?.ciudad}`}</p>
                <p className="mt-3 mb-4 font-light text-gray-500 c-capitalize">
                  {v?.direccion}
                </p>
                <p className="text-sm text-gray-500 c-capitalize mr-2">{`Estrato: ${v?.estrato}`}</p>
                <p className="text-sm text-gray-500 c-capitalize mr-2">{`Detalle: ${v?.detalle_disponibilidad}`}</p>
                <p className="text-sm font-bold text-green-600 c-capitalize mr-2">{`Precio: ${v?.precio}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
