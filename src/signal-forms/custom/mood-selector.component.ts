import { JsonPipe } from "@angular/common";
import { Component, input, model, signal } from "@angular/core";
import { form, Field, submit, FormValueControl } from "@angular/forms/signals";

@Component({
  selector: "app-mood-selector",
  host: {
    "class.disabled-state": "disabled()",
  },
  templateUrl: "./mood-selector.component.html",
  styleUrl: "./mood-selector.component.css",
})
export class MoodSelector implements FormValueControl<string | null> {
  moods = ["😊", "😢", "🎉", "😌", "😰", "😠", "😴", "⚡"];

  readonly value = model<string | null>(null);
  disabled = input(false);
}
