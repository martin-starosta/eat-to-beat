import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);
  try {
    const plan = await prisma.mealPlan.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const daysWithRecipes = plan.days.map(async (day: any) => {
      const recipes = await prisma.recipe.findMany({
        where: {
          id: {
            in: day.meals,
          },
        },
      });
      return { meals: recipes };
    });

    Promise.all(daysWithRecipes).then((days) => {
      res.json({
        ...plan,
        ...{ days },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/*
const days = [
      {
        meals: [
          {
            id: 1,
            name: "Breakfast",
            recipe: { name: "Oat", url: "https://www.google.com" },
          },
          {
            id: 2,
            name: "Lunch",
            recipe: { name: "Salad", url: "https://www.google.com" },
          },
          {
            id: 3,
            name: "Dinner",
            recipe: { name: "Steak", url: "https://www.google.com" },
          },
        ],
      },
      {
        meals: [
          {
            id: 1,
            name: "Breakfast",
            recipe: { name: "Oat", url: "https://www.google.com" },
          },
          {
            id: 2,
            name: "Lunch",
            recipe: { name: "Salad", url: "https://www.google.com" },
          },
          {
            id: 3,
            name: "Dinner",
            recipe: { name: "Steak", url: "https://www.google.com" },
          },
        ],
      },
    ];
    const plan = {
      name: "Plan 1",
      days: days,
    };
    */
