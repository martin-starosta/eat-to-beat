import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe, MealPlan } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const plans = await prisma.mealPlan.findMany({
    select: {
      name: true,
    },
  });

  return res.json(plans);
}
