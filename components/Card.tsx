import clsx from "clsx";
import { ReactElement } from "react";

interface Props{
    className?: string,
    children?: ReactElement
}

const Card = ({ className="", children }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;