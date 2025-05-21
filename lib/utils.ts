import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keywordsJsonToString(
  jsonKeywords: string[] | undefined
): string | null {
  if (jsonKeywords == undefined) return null;

  console.log("JSON Keywords: ", jsonKeywords);

  let outputStr: string = "";

  for (let keyword of jsonKeywords) {
    outputStr += keyword;
    outputStr += "\n";
  }

  return outputStr;
}
