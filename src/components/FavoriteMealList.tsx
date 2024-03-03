import React from "react";
import SearchInput from "./SearchInput";
import MealCard from "./MealCard";
import { useFavoriteMealsContext } from "@/providers/FavoriteMealsProvider";
import NoSsr from "./NoSsr";

// Because it uses the local storage we don't want this code to execute on SSR
export default function FavoriteMealListNoSsr() {
  return (
    <NoSsr>
      <FavoriteMealList />
    </NoSsr>
  );
}

function FavoriteMealList() {
  const [searchText, setSearchText] = React.useState("");
  const { favoriteMeals, handleFavoriteToggle } = useFavoriteMealsContext();

  const filteredFavoriteMeals = favoriteMeals.filter((meal) =>
    meal.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="flex flex-col prose items-center flex-nowrap justify-between mx-auto max-w-3xl bg-base-100 z-20 w-full py-3 duration-1000 ease-in-out fade-in slide-in-from-top-4 px-4 sm:px-6 space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for your favorite meals here"
          extraClassName="neutral-content max-w-full"
        />
      </div>
      <div className="flex flex-wrap lg:-mx-4 w-full">
        {filteredFavoriteMeals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.title}
            ingredients={meal.ingredients}
            instructions={meal.instructions}
            isFavorite={favoriteMeals.some((m) => m.id === meal.id)}
            onFavorite={() => handleFavoriteToggle(meal)}
          />
        ))}
      </div>
    </section>
  );
}
