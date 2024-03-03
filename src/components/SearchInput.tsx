import cx from "classnames";
import { ChangeEventHandler, HTMLProps } from "react";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  autoFocus?: boolean;
  extraClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function SearchInput({
  onChange,
  value,
  placeholder,
  extraClassName,
  disabled,
  isLoading,
  autoFocus,
}: Props) {
  return (
    <label
      className={cx(
        `input input-bordered w-full flex items-center`,
        extraClassName
      )}
    >
      <input
        autoFocus={autoFocus}
        disabled={disabled}
        type="text"
        className={cx("grow", {
          "cursor-not-allowed": disabled,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="btn btn-xs btn-ghost">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <SearchIcon isActive={!!value} />
        )}
      </span>
    </label>
  );
}

const SearchIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={cx("w-4 h-4 transition-opacity ease-in duration-200 primary", {
      "opacity-100": isActive,
      "opacity-70": !isActive,
    })}
  >
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd"
    />
  </svg>
);
