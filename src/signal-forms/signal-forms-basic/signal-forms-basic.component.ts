import { JsonPipe } from "@angular/common";
import { Component, signal, computed } from "@angular/core";
import { form, Field, submit, schema } from "@angular/forms/signals";
import { feedbackFormSchema } from "./signal-forms-basic.schema";
import { FeedbackForm } from "./signal-forms-basic.model";
import { MoodSelector } from "../custom/mood-selector.component";
import { FieldError } from "../custom/field-error.component";

@Component({
  selector: "app-signal-forms-basic",
  imports: [Field, JsonPipe, MoodSelector, FieldError],
  templateUrl: "./signal-forms-basic.component.html",
  styleUrl: "./signal-forms-basic.component.css",
})
export class SignalFormsBasicComponent {
  initialFeedbackFormValue: FeedbackForm = {
    email: "",
    bucket: [""],
    message: "",
    mood: "",
    country: "CH",
    zipCode: "",
  };

  feedbackFormModel = signal<FeedbackForm>(this.initialFeedbackFormValue);
  feedbackForm = form(this.feedbackFormModel, feedbackFormSchema);

  reset() {
    // Reset only resets touched and dirty states
    this.feedbackForm().reset();
    // So it's necessary to reset the model as well to clear values
    this.feedbackFormModel.set(this.initialFeedbackFormValue);
  }

  updateMessage(mood: string = ""): void {
    if (mood) {
      this.feedbackFormModel.set({
        ...this.feedbackFormModel(),
        message: `I am feeling ${mood} today!`,
      });
    }
  }

  removeBucket(index: number): void {
    {
      const currentBuckets = this.feedbackFormModel().bucket;
      const updatedBuckets = currentBuckets.filter((_, i) => i !== index);
      this.feedbackFormModel.set({
        ...this.feedbackFormModel(),
        bucket: updatedBuckets,
      });
    }
  }

  protected addBucket(): void {
    this.feedbackForm.bucket;
    this.feedbackForm
      .bucket()
      .value.update((items: string[]) => [...items, ""]);
  }

  // Submit handler using the submit function
  async onSubmit(e: Event): Promise<void> {
    e.preventDefault();

    await submit(this.feedbackForm, async (form) => {
      console.log("Form submitted with values:", form().value());

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submission completed!");
      alert(
        "Form submitted successfully!\n" +
          JSON.stringify(form().value(), null, 2),
      );
    });
  }
}
