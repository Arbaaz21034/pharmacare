import type { ButtonProps2 } from "../types/props";
import { cn } from "../utils/misc";

const ButtonAlt = (props: ButtonProps2) => {
  return (
    <>
      <button
        className={cn(
          "rounded-md bg-gray-500 py-3 px-7 text-lg text-white shadow-md transition-colors delay-100 ease-in hover:bg-primary-400 active:scale-95 active:shadow-2xl",
          props.view == props.bid && "bg-primary"
        )}
        {...props}
      />
    </>
  );
};

export default ButtonAlt;
