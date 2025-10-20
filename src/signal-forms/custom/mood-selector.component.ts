import { JsonPipe } from "@angular/common";
import { Component, input, model, output, signal } from "@angular/core";
import { form, Field, submit, FormValueControl } from "@angular/forms/signals";

@Component({
  selector: "app-mood-selector",
  host: {
    "[class.disabled]": "disabled()",
  },
  templateUrl: "./mood-selector.component.html",
  styleUrl: "./mood-selector.component.css",
})
export class MoodSelector implements FormValueControl<string | null> {
  moods = ["😊", "😐", "😠", "🤬"];

  readonly value = model<string | null>(null);
  readonly disabled = input(false);
  readonly touched = model(false);

  moodSelected = output<string>();

  selectMood(mood: string) {
    if (this.disabled()) {
      return;
    }
    this.touched.set(true);
    this.value.set(mood);

    this.moodSelected.emit(mood);
  }
}
