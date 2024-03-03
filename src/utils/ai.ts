import { ChatCompletionMessageParam } from "openai/resources/index.mjs";


export function generatePromptHelper(
  recipePrompt: string
): Array<ChatCompletionMessageParam> {
  return [
    {
      role: "system",
      content:
        "You are a food expert and can come easily with recipe ideas, I'll ask you some about recipes ideas and instructions, if I ask something not food related, just answer you don't know about that on a french way",
    },
    {
      role: "assistant",
      content: "All right, Im ready, ask me anything food related!",
    },
    {
      role: "user",
      content: `${recipePrompt}, give this recipe a title add a list of ingredients and instructions`,
    },
    {
      role: "assistant",
      content:
        "No problem! I'll think about something, is there a specific return format you wish?",
    },
    {
      role: "system",
      content: `return it as a json with this structure but with a different recipe: ${BASE_JSON_MEAL_FORMAT} and keep ingredients and instructions short`,
    },
  ];
}

const BASE_JSON_MEAL_FORMAT = `{"recipe":{"title":"Ratatouille Confit Byaldi","ingredients":["2 medium eggplants","2 medium zucchini","2 medium yellow squash","2 medium red bell peppers","1 1/2 cups chopped yellow onions","1 cup chopped red onion","4 garlic cloves, minced","1 tablespoon dried herbes de Provence","2 tablespoons chopped fresh basil","1 teaspoon sugar","2 tablespoons extra-virgin olive oil","1 teaspoon salt, divided","Pinch of black pepper","1/2 cup grated Parmesan cheese","2 tablespoons plain bread crumbs"],"instructions":["Preheat the oven to 375 degrees F (190 degrees C).","Slice the eggplants, zucchini, and yellow squash into 1/4-inch-thick rounds.","Place the sliced vegetables in a colander in the sink and sprinkle with 1/2 teaspoon of the salt. Let stand for 30 minutes to draw out the moisture.","Pat the vegetables dry with paper towels.","Heat 1 tablespoon of the olive oil in a large skillet over medium heat. Add the chopped yellow and red onions and cook until softened, about 5 minutes. Add the garlic, herbes de Provence, and basil and cook for 1 minute more. Remove from heat and stir in the sugar.","Spread the onion mixture evenly over the bottom of a 9x13-inch baking dish. Top with the sliced vegetables, arranging them in a decorative pattern.","Drizzle the remaining 1 tablespoon of olive oil over the vegetables and sprinkle with the remaining 1/2 teaspoon of salt and the black pepper.","Bake in the preheated oven for 45 minutes, or until the vegetables are tender and browned.","Sprinkle the Parmesan cheese and bread crumbs over the vegetables and bake for 15 minutes more, or until the cheese is melted and bubbly.","Let cool slightly before serving."]}}`;
