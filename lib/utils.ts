import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const injectScriptToTemplate = (textData: string) => {
  const data = textData;
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");
  const script = doc.createElement("script");
  script.src = "https://cdn.tailwindcss.com";
  doc.head.appendChild(script);
  const updatedData = new XMLSerializer().serializeToString(doc);
  return updatedData;
};
