import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export const toastError = (error: string) => {
  toast.error(error, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};
