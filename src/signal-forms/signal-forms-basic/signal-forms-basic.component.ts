import { JsonPipe } from "@angular/common";
import { Component, signal, computed } from "@angular/core";
import { form, Field, submit, schema } from "@angular/forms/signals";
import { userFormSchema } from "./signal-forms-basic.schema";
import { UserForm } from "./signal-forms-basic.model";
import { MoodSelector } from "../custom/mood-selector.component";

@Component({
  selector: "app-signal-forms-basic",
  standalone: true,
  imports: [Field, JsonPipe, MoodSelector],
  templateUrl: "./signal-forms-basic.component.html",
  styleUrl: "./signal-forms-basic.component.css",
})
export class SignalFormsBasicComponent {
  initialUserFormValue: UserForm = {
    name: "",
    email: "",
    message: "",
    mood: "",
    country: "CH",
    zipCode: "",
  };

  userFormModel = signal<UserForm>(this.initialUserFormValue);
  userForm = form(this.userFormModel, userFormSchema);

  reset() {
    // Reset only resets touched and dirty states
    this.userForm().reset();
    // So it's necessary to reset the model as well to clear values
    this.userFormModel.set(this.initialUserFormValue);
  }

  // Submit handler using the submit function
  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await submit(this.userForm, async (value) => {
      console.log("Form submitted with values:", value);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submission completed!");
      alert("Form submitted successfully!\n" + JSON.stringify(value, null, 2));
    });
  }
}
