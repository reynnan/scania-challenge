import React, { createContext, useContext } from "react";
import { FAVORITE_MEALS_KEY } from "@/contants/localStorage";
import usePersistedState from "@/hooks/usePersistedState";
import { Meal } from "@/types/Meal";

type FavoriteMealsContextType = {
  favoriteMeals: Meal[];
  handleFavoriteToggle: (result: Meal) => void;
};

const FavoriteMealsContext = createContext<
  FavoriteMealsContextType | undefined
>(undefined);

export default function FavoriteMealsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favoriteMeals, setFavoriteMeals] = usePersistedState<Meal[]>(
    [] as Meal[],
    FAVORITE_MEALS_KEY
  );

  const handleFavoriteToggle = (meal: Meal) => {
    const index = favoriteMeals.findIndex((m) => m.id === meal.id);
    if (index !== -1) {
      const updatedFavorites = [...favoriteMeals];
      updatedFavorites.splice(index, 1);
      setFavoriteMeals(updatedFavorites);
    } else {
      setFavoriteMeals([...favoriteMeals, meal]);
    }
  };

  return (
    <FavoriteMealsContext.Provider
      value={{ favoriteMeals, handleFavoriteToggle }}
    >
      {children}
    </FavoriteMealsContext.Provider>
  );
}

export const useFavoriteMealsContext = (): FavoriteMealsContextType => {
  const context = useContext(FavoriteMealsContext);
  if (!context) {
    throw new Error(
      "useFavoriteMealContext must be used within a FavoriteMealsProvider"
    );
  }
  return context;
};
