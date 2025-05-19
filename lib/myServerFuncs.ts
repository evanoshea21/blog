"use server";

export async function handleCreateFormSubmit(formData: FormData) {
  var formObject = {
    slug: formData.get("slug"),
  };
  console.log("submitted form:", formObject);
}
