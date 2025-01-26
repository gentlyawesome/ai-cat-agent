// styles
import "./App.css";

// hook
import useCatPrompt from "./hooks/useCatPrompt";

// components
import CatCards, { Breed } from "./components/CatCards";
import AgentForm from "./components/AgentForm";
import AgentResponse from "./components/AgentResponse";

function App() {
  const {
    userInput,
    selectedBreed,
    choices,
    breed,
    setSelectedBreed,
    setUserInput,
    onSubmit,
  } = useCatPrompt();

  return (
    <>
      {status === "loading" && (
        <div className="flex text-green-500 font-bold pl-4">Loading...</div>
      )}
      {status === "error" && (
        <div className="flex text-red-500 font-bold pl-4">
          Sorry, something went wrong
        </div>
      )}
      <div className="flex flex-row">
        <div className="basis-1/2 flex-wrap h-screen overflow-y-auto">
          <h2 className="text-xl pl-4 pt-4 font-bold">Select a Cat Breed</h2>
          {breed?.map((breed: Breed) => (
            <CatCards
              key={breed.id}
              breed={breed}
              setSelectedBreed={setSelectedBreed}
            />
          ))}
        </div>
        <div className="basis-1/2 p-4">
          <AgentForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={onSubmit}
            selectedBreed={selectedBreed}
          />
          <AgentResponse choices={choices} />
        </div>
      </div>
    </>
  );
}

export default App;
