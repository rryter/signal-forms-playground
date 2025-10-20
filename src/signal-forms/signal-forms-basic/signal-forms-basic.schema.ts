import {
  applyWhen,
  customError,
  email,
  minLength,
  required,
  schema,
  validate,
} from "@angular/forms/signals";
import { UserForm } from "./signal-forms-basic.model";

export const userFormSchema = schema<UserForm>((path) => {
  // Define validation rules
  required(path.name);
  minLength(path.name, 3);

  required(path.email);
  email(path.email);

  required(path.message);
  minLength(path.message, 10);

  required(path.country);
  required(path.zipCode);

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
    }
  );
});
