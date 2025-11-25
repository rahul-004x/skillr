import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPersonalUrl(username: string) {
  // const domain = "http://localhost:3000/";
  const domain =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://skillr-six.vercel.app/";
  return `${domain}/${username}`;
}
