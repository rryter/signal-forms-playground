import { JsonPipe } from "@angular/common";
import { Component, signal, computed } from "@angular/core";
import { form, Field, submit, schema } from "@angular/forms/signals";
import { required, minLength, email } from "@angular/forms/signals";
import { userFormSchema } from "./signal-forms-basic.schema";
import { UserForm } from "./signal-forms-basic.model";

@Component({
  selector: "app-signal-forms-basic",
  standalone: true,
  imports: [Field, JsonPipe],
  templateUrl: "./signal-forms-basic.component.html",
  styleUrl: "./signal-forms-basic.component.css",
})
export class SignalFormsBasicComponent {
  protected readonly userForm = form(
    signal<UserForm>({
      name: "",
      email: "",
      message: "",
      country: "CH",
      zipCode: "",
    }),
    userFormSchema,
  );

  showZipcodeErrors = computed(() => {
    const hasCountry = !!this.userForm.country().value();
    const zipcodeErrors = this.userForm.zipCode().errors().length > 0;
    return hasCountry && zipcodeErrors;
  });

  // Submit handler using the submit function
  async onSubmit() {
    await submit(this.userForm, async (value) => {
      console.log("Form submitted with values:", value);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submission completed!");
      alert("Form submitted successfully!\n" + JSON.stringify(value, null, 2));
    });
  }
}
