import { FormEvent, useState } from "react";
import SearchInput from "./SearchInput";
import { useFavoriteMealsContext } from "@/providers/FavoriteMealsProvider";
import MealPapper from "./MealPapper";
import { usePreviousResult } from "@/providers/PreviousResultProvider";
import { Meal } from "@/types/Meal";
import { formatResponse } from "@/utils/formatResponse";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { handleFavoriteToggle } = useFavoriteMealsContext();
  const { addNewResult } = usePreviousResult();

  const reset = () => {
    setIsLoading(true);
    setHasError(false);
    setIsFavorite(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    };
    try {
      const response = await fetch("/api/ratatouille", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const ratatouilleAnswer = await response.text();
      const formattedAnswer = formatResponse(ratatouilleAnswer);
      const mealWithId = {
        // Room for improvement here, this can easily cause some render problems but a cheap solution if I want to only expend a few hours working on it
        id: formattedAnswer.title + prompt,
        ...formattedAnswer,
      };
      setResponse(mealWithId);
      addNewResult(mealWithId);
    } catch (error) {
      setHasError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl md:max-w-lg py-3 duration-1000 ease-in-out fade-in slide-in-from-top-4 space-y-5">
      <form onSubmit={handleSubmit} className="flex w-full">
        <SearchInput
          autoFocus
          disabled={isLoading}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Easy breakfast recipe"
          extraClassName="bg-accent-content text-white"
          isLoading={isLoading}
        />
      </form>
      {hasError && <ErrorMessage onRetry={handleSubmit} />}
      {response && !hasError && !isLoading && (
        <MealPapper
          title={response.title}
          ingredients={response.ingredients}
          instructions={response.instructions}
          isFavorite={isFavorite}
          onFavoriteClick={() => {
            setIsFavorite((prevState) => !prevState);
            handleFavoriteToggle(response);
          }}
        />
      )}
    </div>
  );
}

const ErrorMessage = ({ onRetry }: { onRetry: (e: any) => void }) => (
  <div className="bg-error mt-4 p-4 flex flex-col w-full prose">
    <p className="text-white">
      Looks like something went wrong when cooking your meal <span>😔</span>
    </p>
    <button className="btn btn-sm btn-ghost" onClick={onRetry}>
      Retry
    </button>
  </div>
);
