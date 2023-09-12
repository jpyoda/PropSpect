"use client";

import React, { useContext, useEffect, useState } from "react";
import HeroSection from "../modules/containers/HeroSection";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { APIChain } from "langchain/chains";
import { basicApiDocs } from "@/utils/promptSettings/apiDocs";
import { z } from "zod";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import zodToJsonSchema from "zod-to-json-schema";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import CardsSection from "../modules/containers/CardsSection";
import LoadItems from "../elements/skeletons/LoadItems";
import ApiKeyContext from "../layouts/ApiKeyContext";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [apikeyAlert, showApikeyAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState<any>({ inmuebles: [] });
  const apiKey = useContext(ApiKeyContext);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  async function handleSearch(e: any) {
    e.preventDefault();
    setLoading(true);
    if (apiKey) {
      const llm = new ChatOpenAI({
        openAIApiKey: apiKey,
        streaming: false,
      });
      const apiDocs = basicApiDocs;
      const chain = APIChain.fromLLMAndAPIDocs(llm, apiDocs);
      const response = await chain.run(`
        Responde exclusivamente en español. No realices ninguna traducción. Si se mencionan números de estrato, estos deben escribirse en letras (por ejemplo, "seis" en lugar de "6"). Todos los valores en los filtros deben estar en mayúsculas.
  
        ${searchTerm}
        
        Tu respuesta esté en español y en formato de JSON en el siguiente formato:
        '''
        {
          inmuebles: [
            {
              codigo: ""
              ciudad: ""
              departamento: ""
              barrio: ""
              direccion: ""
              area_terreno: ""
              area_construida: ""
              detalle_disponibilidad: ""
              estrato: ""
              precio: ""
              tipo_de_inmueble: ""
            }
          ]
        }
        '''
      `);

      const zodSchema = z.object({
        inmuebles: z
          .array(
            z.object({
              codigo: z.number().describe("The id of the inmueble item"),
              ciudad: z.string().describe("The city of the inmueble item"),
              departamento: z.string(),
              barrio: z.string(),
              direccion: z
                .string()
                .describe("The address of the inmueble item"),
              area_terreno: z.string(),
              area_construida: z.string(),
              detalle_disponibilidad: z.string(),
              estrato: z.string(),
              precio: z.string().describe("The price of the item"),
              tipo_de_inmueble: z.string().describe("The type of the item"),
            })
          )
          .describe("An array of inmueble items mentioned in the text"),
      });

      const prompt = new ChatPromptTemplate({
        promptMessages: [
          SystemMessagePromptTemplate.fromTemplate(
            "List all inmueble items mentioned in the following text."
          ),
          HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables: ["inputText"],
      });

      const functionCallingModel = llm.bind({
        functions: [
          {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: zodToJsonSchema(zodSchema),
          },
        ],
        function_call: { name: "output_formatter" },
      });

      const outputParser = new JsonOutputFunctionsParser();
      const jsonChain = prompt.pipe(functionCallingModel).pipe(outputParser);
      const jsonResponse = await jsonChain.invoke({
        inputText: response,
      });

      setResponse(jsonResponse);
    }
    setLoading(false);
  }

  useEffect(() => {
    showApikeyAlert(!apiKey);
  }, [apiKey]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 px-0 md:px-24 bg-slate-50">
      <HeroSection
        searchTerm={searchTerm}
        apikeyAlert={apikeyAlert}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      {loading ? (
        <LoadItems />
      ) : (
        <CardsSection inmuebles={response?.inmuebles} />
      )}
    </main>
  );
};

export default HomePage;
