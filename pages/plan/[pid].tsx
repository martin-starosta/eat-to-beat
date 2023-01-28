import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/react";

type MealPlan = {
  name: string;
  days: Day[];
};

type Day = {
  meals: Meal[];
};

type Meal = {
  id: number;
  name: string;
  url: string;
  mealType: string;
};

const PlanPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [plan, setPlan] = useState<MealPlan | null>(null);

  useEffect(() => {
    // Fetch the plan data from an API or from a local data source
    async function fetchData() {
      const response = await fetch(`/api/plans/${pid}`);
      const data = await response.json();
      setPlan(data);
    }

    if (!pid) return;
    fetchData();
  }, [pid]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-main-layout gap-2">
      <div>
        <Heading as="h1" size="2xl">
          {plan.name}
        </Heading>
        {plan?.days?.map((day: Day, index: number) => {
          return (
            <div key={"day_" + index} className="pt-3 pb-2">
              <Heading as="h2" size="xl">
                {`Day ${index + 1}`}
              </Heading>
              {day.meals.map((meal: Meal) => {
                return (
                  <div key={`meal_${meal.id}`} className="mb-4">
                    <Heading as="h3" size="lg">
                      {meal.mealType}
                    </Heading>
                    <ul className="list-disc ml-3">
                      <li>
                        1 serving{" "}
                        <a
                          className="font-arvo font-bold underline decoration-4"
                          href={meal.url}
                        >
                          {meal.name}
                        </a>
                      </li>
                    </ul>
                  </div>
                );
              })}
              <p>
                <em>
                  <strong>Daily Totals:</strong>&nbsp;1,495 calories, 83g
                  protein, 72g fat, 12g saturated fat, 137g carbohydrate, 34g
                  fiber, 925mg sodium
                </em>
              </p>
            </div>
          );
        })}
      </div>
      <div>Shopping list</div>
    </div>
  );
};

export default PlanPage;
