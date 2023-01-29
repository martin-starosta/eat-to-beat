import { Formik, Form } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { MealType } from "@prisma/client";

function CreateRecipe() {
  return (
    <Formik
      initialValues={{ name: "", ingredients: "", url: "", mealType: "" }}
      onSubmit={async (values, actions) => {
        try {
          const response = await fetch("/api/recipes/create", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            alert("Recipe created!");
            actions.resetForm();
          } else {
            alert("There was an error creating the recipe.");
          }
        } catch (error) {
          alert("There was an error creating the recipe.");
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Meal name"
                name="name"
                value={values.name}
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
              <FormLabel>URL</FormLabel>
              <Input
                placeholder="Link to recipe"
                name="url"
                value={values.url}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ingredients</FormLabel>
              <Textarea
                placeholder="Insert ingredients from recipe"
                value={values.ingredients}
                onChange={handleChange}
                name="ingredients"
              />
            </FormControl>
            <Button type="submit" disabled={isSubmitting}>
              Create Recipe
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default CreateRecipe;
