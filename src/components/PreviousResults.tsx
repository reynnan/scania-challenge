import React from "react";
import SearchInput from "./SearchInput";
import MealCard from "./MealCard";
import { useFavoriteMealsContext } from "@/providers/FavoriteMealsProvider";
import NoSsr from "./NoSsr";
import cx from "classnames";
import { usePreviousResult } from "@/providers/PreviousResultProvider";

// No SSR Previous Search use storage for show previous searched and check if it has been favorited
export default function PreviousResultsNoSsr() {
  return (
    <NoSsr>
      <PreviousResults />
    </NoSsr>
  );
}

function PreviousResults() {
  const [searchText, setSearchText] = React.useState("");
  const { favoriteMeals, handleFavoriteToggle } = useFavoriteMealsContext();
  const { previousResults } = usePreviousResult();
  const isEmpty = previousResults.length === 0;
  const filteredMeals = previousResults.filter((meal) =>
    meal.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="flex flex-col prose items-center flex-nowrap justify-between mx-auto max-w-3xl bg-base-100 z-20 w-full py-3 duration-1000 ease-in-out fade-in slide-in-from-top-4 px-4 sm:px-6 space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <h2 className="m-0">Previous results</h2>
        <SearchInput
          disabled={isEmpty}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={isEmpty ? "There is nothing to be searched" : ""}
          extraClassName={cx("neutral-content max-w-xs", {
            "bg-base-200": isEmpty,
          })}
        />
      </div>
      <div className="flex flex-wrap lg:-mx-4 w-full">
        {isEmpty && (
          <div className="hero bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <p className="py-6">
                  Here you will found all the previous search you have done, in
                  case you want to take a second look on a recipe. 😋
                </p>
              </div>
            </div>
          </div>
        )}
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.title}
            instructions={meal.instructions}
            ingredients={meal.ingredients}
            isFavorite={favoriteMeals.some((m) => m.id === meal.id)}
            onFavorite={() => handleFavoriteToggle(meal)}
          />
        ))}
      </div>
    </section>
  );
}
