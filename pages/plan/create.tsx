import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MealPlanForm = () => {
  const [planRecipes, setPlanRecipes] = useState([
    {
      day: 1,
      meals: [
        { mealType: "breakfast", recipes: [] },
        { mealType: "lunch", recipes: [] },
        { mealType: "dinner", recipes: [] },
      ],
    },
  ]);

  return (
    <Formik
      initialValues={{
        planName: "",
        planDays: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="planName"
            type="text"
            placeholder="Meal Plan Name"
            as="input"
          />
          <ErrorMessage name="planName" component="div" />
          <Field
            name="planDays"
            type="number"
            placeholder="Number of Days"
            as="input"
          />
          <ErrorMessage name="planDays" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MealPlanForm;
