// api
import { fetchBreeds } from "../api/fetchBreeds";

// openai
import { OpenAI } from "openai";

// react-query
import { useQuery } from "react-query";

// react
import { useEffect, useState } from "react";

// model
import { Breed } from "../components/CatCards";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAPIKEY,
  dangerouslyAllowBrowser: true,
});

const useCatPrompt = () => {
  const { data: breed, status } = useQuery("breeds", fetchBreeds);

  const [selectedBreed, setSelectedBreed] = useState("");
  const [choices, setChoices] = useState<any>([]);
  const [userInput, setUserInput] = useState("");

  const messages = [] as any;

  async function send_to_llm(content: string) {
    messages.push({
      role: "user",
      content,
    });

    const response: any = await client.chat.completions.create({
      messages,
      model: "gpt-4o",
      max_tokens: 100,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    messages.push(response.choices[0].message);

    setChoices([...choices, response.choices[0].message.content]);
  }

  async function process_llm_response(response: any) {
    const parsedJson = JSON.parse(response);

    if (parsedJson.to == "user") {
      console.log(parsedJson.message);
    } else if (parsedJson.to == "system") {
      await process_llm_response(await send_to_llm(parsedJson.messages));
    }
  }

  async function executeAI() {
    while (true) {
      const response = await send_to_llm(userInput);
      await process_llm_response(response);
    }
  }

  useEffect(() => {
    const mapBreed =
      breed
        ?.map((breed: Breed) => breed.name + " " + breed.description)
        .join(", ") || "";
    const SYSTEM_PROMPT = ` 
    You are a cat specialist AI agent. You are helping a user who is looking for information on cat breeds. 
    The user asks you to provide information on the following cat breeds: ${mapBreed}. 
  `;

    messages.push({
      role: "system",
      content: SYSTEM_PROMPT,
    });
  }, [breed, messages]);

  const onSubmit = async () => {
    setUserInput("");
    // executeAI();
  };

  return {
    breed,
    messages,
    selectedBreed,
    choices,
    userInput,
    status,
    setSelectedBreed,
    setUserInput,
    onSubmit,
  };
};

export default useCatPrompt;
