import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Button,
  Select,
  HStack,
  Box,
} from "@chakra-ui/react";
import { MealType } from "@prisma/client";

const MealPlanForm = () => {
  const [planRecipes, setPlanRecipes] = useState([
    {
      day: 1,
      meals: [
        { mealType: "breakfast", recipes: [] },
        { mealType: "lunch", recipes: [] },
        { mealType: "dinner", recipes: [] },
      ],
      days: [{ day: 1, meals: [] }],
    },
  ]);
  const [plan, setPlan] = useState<{
    planName: string;
    planDays: number;
    days: { day: number; meals: { mealType: string; recipes: string[] }[] }[];
  }>({
    planName: "",
    planDays: 0,
    days: [],
  });

  function addRecipe(day: number, mealType: string, recipe: string) {
    const updatedDays = [...plan.days];
    let dayIndex = updatedDays.findIndex((d) => d.day === day);
    if (dayIndex === -1) {
      updatedDays.push({
        day: day,
        meals: [{ mealType: mealType, recipes: [recipe] }],
      });
      setPlan({ ...plan, days: updatedDays });
      return;
    }
    const mealIndex = updatedDays[dayIndex].meals.findIndex(
      (m) => m.mealType === mealType
    );
    if (mealIndex === -1) {
      updatedDays[dayIndex].meals.push({
        mealType: mealType,
        recipes: [recipe],
      });
      setPlan({ ...plan, days: updatedDays });
      return;
    }
    updatedDays[dayIndex].meals[mealIndex].recipes.push(recipe);
    setPlan({ ...plan, days: updatedDays });
  }

  return (
    <Box>
      <Heading as="h1" marginBottom="24px">
        Create a Meal Plan
      </Heading>
      <Formik
        initialValues={{
          planName: "",
          day: 0,
          mealType: "",
          recipe: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <HStack justify="start" align="start" spacing="24px">
              <VStack spacing={4} align="start" width="250px">
                <FormControl isRequired>
                  <FormLabel>Meal Plan Name</FormLabel>
                  <Input
                    placeholder="Meal Plan Name"
                    name="planName"
                    value={values.planName}
                  />
                </FormControl>

                <Heading as="h3" size="md">
                  Add meal to the day
                </Heading>

                <FormControl>
                  <FormLabel>Day</FormLabel>
                  <Input
                    placeholder="What day?"
                    name="day"
                    value={values.day}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Meal Type</FormLabel>
                  <Select
                    placeholder="Meal type"
                    name="mealType"
                    value={values.mealType}
                    onChange={handleChange}
                  >
                    {Object.values(MealType).map((mealType) => (
                      <option key={mealType} value={mealType}>
                        {mealType}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Recipe</FormLabel>
                  <Select
                    placeholder="Select recipe"
                    name="recipe"
                    value={values.recipe}
                    onChange={handleChange}
                  >
                    <option value="Chicken">Chicken</option>
                    <option value="Salad">Salad</option>
                    <option value="Oats">Oats</option>
                    <option value="Juice">Juice</option>
                  </Select>
                </FormControl>
                <Button
                  type="button"
                  onClick={() =>
                    addRecipe(values.day, values.mealType, values.recipe)
                  }
                >
                  Add meal to the day
                </Button>

                <Button disabled={isSubmitting} type="submit">
                  Create meal plan
                </Button>
              </VStack>
              <Box>
                <Heading as="h3" size="md">
                  Meal Plan
                </Heading>

                <VStack spacing={4} align="start">
                  {plan?.days?.map((day) => {
                    return (
                      <Box key={"day_"}>
                        <Heading as="h4" size="sm">
                          Day {day.day}
                        </Heading>
                        {day?.meals?.map((meal) => {
                          return (
                            <HStack
                              key={meal.mealType}
                              spacing={4}
                              align="start"
                            >
                              <Box>{meal.mealType}</Box>
                              <Box>
                                {meal.recipes.map((recipe) => {
                                  return <Box key={recipe}>{recipe}</Box>;
                                })}
                              </Box>
                            </HStack>
                          );
                        })}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MealPlanForm;
