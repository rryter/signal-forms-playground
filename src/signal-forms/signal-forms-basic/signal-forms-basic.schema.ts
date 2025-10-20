import {
  applyWhen,
  customError,
  disabled,
  email,
  minLength,
  required,
  schema,
  validate,
} from "@angular/forms/signals";
import { FeedbackForm } from "./signal-forms-basic.model";

export const feedbackFormSchema = schema<FeedbackForm>((path) => {
  required(path.email);
  required(path.message);
  required(path.country);
  required(path.zipCode);
  required(path.mood);

  email(path.email);
  minLength(path.message, 10);

  // Disable message when a bad mood is selected
  disabled(path.message, (ctx) =>
    ["🤬", "😐", "😠"].includes(ctx.valueOf(path.mood)),
  );

  applyWhen(
    path,
    (form) => form.value().country === "US",
    (path) => {
      validate(path.zipCode, (zipCodeField) => {
        const error =
          zipCodeField.value().length !== 5
            ? customError({
                kind: "invalidUSZipCode",
                message: "US Zip Code must be 5 digits long",
              })
            : undefined;

        if (error) {
          console.log(path.zipCode);
        }
        return error;
      });
    },
  );
});
