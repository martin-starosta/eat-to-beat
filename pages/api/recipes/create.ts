import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe, MealType } from "@prisma/client";
import z from "zod";

const recipeSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  ingredients: z.string().optional(),
  mealType: z.enum([MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER]),
});

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const result = recipeSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({ message: result.error });
    return;
  }

  const { name, url, ingredients, mealType } = req.body;
  const recipe = await prisma.recipe.create({
    data: {
      name,
      url,
      mealType,
      ingredients,
    },
  });

  res.json({
    data: recipe,
    message: "Recipe created successfully",
  });
}
