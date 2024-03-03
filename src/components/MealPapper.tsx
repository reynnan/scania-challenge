import { Meal } from "@/types/Meal";
import Icon from "./Icon";
import cx from "classnames";

export default function MealPapper({
  title,
  ingredients,
  instructions,
  isFavorite,
  onFavoriteClick,
}: { onFavoriteClick: () => void; isFavorite: boolean } & Omit<Meal, "id">) {
  return (
    <div className="bg-base-200 p-4 flex flex-col w-full">
      <div className="flex w-full justify-between prose">
        <h3 className="text-lg font-bold">{title}</h3>
        <button className="btn btn-sm" onClick={onFavoriteClick}>
          <Icon
            icon="heart"
            className={cx("text-white", {
              "fill-red-500": isFavorite,
            })}
          />
        </button>
      </div>
      <div className="w-full prose">
        <h4>Ingredients:</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}> {ingredient}</li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <ul>
          {instructions.map((instruction, index) => (
            <li key={index}> {instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
