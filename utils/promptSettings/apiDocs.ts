export const basicApiDocs = `
API documentation:
Endpoint: https://www.datos.gov.co/resource/72gd-px77.json
GET

This API is for retrieving available properties for sale.

Query parameters table:
codigo | text | Filters the property by its Codigo. | optional
ciudad | text | Filters the properties located in a specific city. | optional
departamento | text | Filters the properties located in a specific department. | optional
barrio | text | Filters the properties in a specific neighborhood. | optional
estrato | text | Filters the properties by their socioeconomic level. | optional
precio | number | Filters the properties by a specific price. | optional
tipo_de_inmueble | text | Filters the properties by their type (e.g., Apartment, House). | optional

Multiple parameters can be combined for a more refined search. For example:
https://www.datos.gov.co/resource/72gd-px77.json?ciudad=Bogota&barrio=Santa Fe

Response schema (JSON object):
codigo | text | Codigo of the property.
ciudad | text | City where the property is located.
departamento | text | Department where the property is located.
barrio | text | Neighborhood of the property.
direccion | text | Address of the property.
area_terreno | number | Land area of the property.
area_construida | number | Built area of the property.
detalle_disponibilidad | text | Details on availability of the property.
estrato | text | Socioeconomic level of the property area.
precio | number | Price of the property.
tipo_de_inmueble | text | Type of the property (e.g., Apartment, House).
datos_adicionales | text | Additional data on the property.
`;
