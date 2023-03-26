import type { ButtonProps } from "../types/props";
import { cva } from "class-variance-authority";
import { cn } from "../utils/misc";

const buttonVariants = cva(
  "rounded-md active:scale-95 text-lg transition-colors delay-100 ease-in",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary-400 text-white shadow-md",
        outline:
          "hover:bg-primary background-transparent border border-primary text-primary hover:text-white",
      },
      size: {
        xl: "py-4 px-8",
        lg: "py-3 px-7",
        md: "text-md py-2 px-5",
        sm: "text-md py-2 px-3",
        xs: "text-sm py-2 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// FIXME: There's a bug where I'm unable to use className as a prop with the component. It causes the styling to go away.

const Button = (props: ButtonProps) => {
  const { size, variant, className } = props;
  console.log(className);

  return (
    <>
      <button
        className={cn(buttonVariants({ size, variant, className }))}
        {...props}
      />
    </>
  );
};

export default Button;
