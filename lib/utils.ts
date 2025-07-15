import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPersonalUrl(username: string) {
  const domain = "http://localhost:3000/";
  // process.env.NODE_ENV == "development"
  //   ? "http://localhost:3000"
  //   : "https://skillr/";
  return `${domain}/${username}`;
}
