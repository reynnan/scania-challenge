import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";
import Icon from "./Icon";

export default function Header() {
  const { asPath } = useRouter();

  return (
    <header className="navbar flex-nowrap justify-between mx-auto max-w-3xl bg-base-100 z-20 w-full py-3 duration-1000 ease-in-out fade-in slide-in-from-top-4 px-4 sm:px-6">
      <Link href="/" className="btn btn-ghost text-xl sm:text-lg">
        Ratatouille AI
      </Link>
      <ul className="menu menu-horizontal px-1">
        <li>
          <Link
            href="/favorites"
            className={cx("", {
              active: asPath === "/favorites",
            })}
            role="button"
          >
            Favorite Meals
            <Icon
              icon="heart"
              className={cx({
                "fill-red-500": asPath === "/favorites",
              })}
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}
