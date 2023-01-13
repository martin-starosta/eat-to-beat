import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe, MealType } from "@prisma/client";
import z from "zod";

const recipeSchema = z.object({
  name: z.string(),
  url: z.string().url(),
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

  const { name, url } = req.body;
  const recipe = await prisma.recipe.create({
    data: {
      name,
      url,
      mealType: MealType.BREAKFAST,
    },
  });

  res.json({
    data: recipe,
    message: "Recipe created successfully",
  });
}
