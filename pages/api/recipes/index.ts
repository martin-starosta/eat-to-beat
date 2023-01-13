import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipes: Partial<Recipe>[] | null = await prisma.recipe.findMany({
    select: {
      name: true,
      url: true,
      mealType: true,
    },
  });
  res.json({
    recipes,
  });
}
