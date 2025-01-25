// react-query
import { useQuery } from "react-query";

// api
import { fetchBreeds } from "./api/fetchNews";

// styles
import "./App.css";

// hook
import useCatPrompt from "./hooks/useCatPrompt";

// markdown
import ReactMarkdown from "react-markdown";

interface Breed {
  id: string;
  name: string;
  description: string;
}

function App() {
  const { data, status } = useQuery("breeds", fetchBreeds);
  const { selectedBreed, choices, setSelectedBreed, setUserInput, onSubmit } =
    useCatPrompt();

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      <div className="flex flex-row">
        <div className="basis-1/2 flex-wrap h-screen overflow-y-auto">
          <h2 className="text-xl pl-4 pt-4 font-bold">Select a Cat Breed</h2>
          {data?.map((breed: Breed) => (
            <div
              key={breed.id}
              className="cursor-pointer border p-4 m-4 rounded-xl flex-1 min-w-full sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.33%-1rem)] lg:min-w-[calc(25%-1rem)] xl:min-w-[calc(20%-1rem)] bg-[#fcfcfc] p-4 rounded-lg shadow pointer hover:bg-gray-100"
              onClick={() => setSelectedBreed(breed.name)}
            >
              <h2 className="text-2xl">{breed.name}</h2>
              <p>{breed.description}</p>
            </div>
          ))}
        </div>
        <div className="basis-1/2 p-4">
          <h2 className="text-xl pb-4 font-bold justify-between">
            AI Agent Cat Specialist for{" "}
            <span className="text-green-500">{selectedBreed}</span>
          </h2>
          <textarea
            className="w-full h-38 p-4 border rounded-xl"
            placeholder="Ask AI about"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer "
            onClick={() => onSubmit()}
          >
            Submit
          </button>
          {choices &&
            choices.length > 0 &&
            choices.map((choice: string, index: number) => (
              <div
                key={index}
                className="p-2 mt-2 border border-[#ccc] bg-[#fcfcfc] rounded-lg"
              >
                <ReactMarkdown>{choice}</ReactMarkdown>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
