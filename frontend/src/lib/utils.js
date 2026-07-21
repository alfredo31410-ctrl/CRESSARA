// Une clases condicionales y resuelve conflictos entre utilidades de Tailwind.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
