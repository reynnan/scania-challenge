import { Meal } from "@/types/Meal";

export function formatResponse(response: string): Meal {
  // Remove backticks and "json" string
  const responseFormatted = response.replace(/```|json/g, "");
  return JSON.parse(responseFormatted).recipe;
}
