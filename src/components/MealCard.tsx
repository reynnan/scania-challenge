import cx from "classnames";
import Icon from "./Icon";
import { Meal } from "@/types/Meal";
import { useRef } from "react";
import MealPapper from "./MealPapper";

type Props = {
  isFavorite: boolean;
  onFavorite: () => void;
} & Omit<Meal, "id">;

export default function MealCard({
  title,
  ingredients,
  instructions,
  onFavorite,
  isFavorite,
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCardClick = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <div
        className="my-1 w-full lg:my-4 md:px-2 lg:px-4 md:w-1/2 lg:w-1/3 cursor-pointer"
        onClick={() => handleCardClick()}
      >
        <article className="overflow-hidden rounded-lg shadow-lg relative bg-base-300">
          <div className="absolute top-0 right-1">
            <button
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Icon
                icon="heart"
                className={cx("text-white", {
                  "fill-red-500": isFavorite,
                })}
              />
            </button>
          </div>
          <div className="leading-tight p-2 md:p-4">
            <h3 className="text-lg m-0 truncate">{title}</h3>
            <p className="truncate">{ingredients.join(" ")}</p>
          </div>
        </article>
      </div>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box m-0 p-0">
          <MealPapper
            title={title}
            ingredients={ingredients}
            instructions={instructions}
            isFavorite={isFavorite}
            onFavoriteClick={onFavorite}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
