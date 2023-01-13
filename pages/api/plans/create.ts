import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Recipe, MealType } from "@prisma/client";
import z from "zod";
import mongoose from "mongoose";

const mealPlanSchema = z.object({
  name: z.string(),
  numDays: z.number(),
  days: z.array(
    z
      .object({
        meals: z.array(
          z.custom((value: unknown) =>
            mongoose.Types.ObjectId.isValid(String(value))
          )
        ),
      })
      .optional()
  ),
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

  const result = mealPlanSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({ message: result.error });
    return;
  }

  const { name, numDays, days } = req.body;

  if (days.length !== numDays) {
    res.status(400).send({
      message: "Number of days does not match number of days in plan",
    });
    return;
  }

  res.json({ data: {}, message: "Plan created successfully" });
}
