import { Component, input, computed } from "@angular/core";
import { JsonPipe } from "@angular/common";
import { FieldState } from "@angular/forms/signals";

@Component({
  selector: "app-field-error",
  standalone: true,
  imports: [JsonPipe],
  template: `
    @if (fieldState().touched() && fieldState().errors().length > 0) {
      <div class="error">
        <span>{{ fieldState().errors() | json }}</span>
      </div>
    }
  `,
})
export class FieldError {
  fieldState = input.required<FieldState<string, any>>();
}
