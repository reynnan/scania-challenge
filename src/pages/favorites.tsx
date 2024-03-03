import FavoriteMealList from "@/components/FavoriteMealList";
import { useFavoriteMealsContext } from "@/providers/FavoriteMealsProvider";
import Head from "next/head";
import Link from "next/link";

export default function Grocery() {
  const { favoriteMeals } = useFavoriteMealsContext();

  return (
    <section className={`flex flex-col w-full`}>
      <Head>
        <title> Favorite Meals </title>
      </Head>
      <FavoriteMealList />
      {favoriteMeals.length === 0 && (
        <div className="hero bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <p className="py-6">
                Looks like you havent found out a favorite meal yet, what if you{" "}
                <Link className="link link-success" href="/">
                  go home
                </Link>{" "}
                and ask for some news recipe?
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
