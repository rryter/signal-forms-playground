import {
  applyWhen,
  customError,
  disabled,
  email,
  hidden,
  minLength,
  required,
  schema,
  validate,
} from "@angular/forms/signals";
import { FeedbackForm } from "./signal-forms-basic.model";

export const feedbackFormSchema = schema<FeedbackForm>((fieldPath) => {
  required(fieldPath.email);
  required(fieldPath.message);
  required(fieldPath.country);
  required(fieldPath.zipCode);
  required(fieldPath.mood);

  email(fieldPath.email);
  minLength(fieldPath.message, 10);

  // Disable message when a bad mood is selected
  disabled(fieldPath.message, (ctx) =>
    ["🤬", "😐", "😠"].includes(ctx.valueOf(fieldPath.mood)),
  );

  applyWhen(
    fieldPath,
    (form) => form.value().country === "US",
    (fieldPath) => {
      validate(fieldPath.zipCode, (zipCodeField) => {
        const error =
          zipCodeField.value().length !== 5
            ? customError({
                kind: "invalidUSZipCode",
                message: "must be 5 digits long",
              })
            : undefined;

        if (error) {
          console.log(fieldPath.zipCode);
        }
        return error;
      });
    },
  );
});
