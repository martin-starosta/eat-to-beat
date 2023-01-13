import { Formik, Form, Field } from "formik";

function CreateRecipe() {
  return (
    <Formik
      initialValues={{ name: "", ingredients: "", url: "" }}
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
      {({ isSubmitting }) => (
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          <Field name="ingredients" type="text" placeholder="Ingredients" />
          <Field name="url" type="text" placeholder="URL" />
          <button type="submit" disabled={isSubmitting}>
            Create Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateRecipe;
