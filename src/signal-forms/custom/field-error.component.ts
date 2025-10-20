import { Component, input } from "@angular/core";
import { JsonPipe } from "@angular/common";
import { FieldState } from "@angular/forms/signals";

@Component({
  selector: "app-field-error",
  standalone: true,
  imports: [JsonPipe],
  template: `
    @if (field().touched() && field().errors().length > 0) {
      <div class="error">
        <span>{{ field().errors() | json }}</span>
      </div>
    }
  `,
})
export class FieldError {
  field = input.required<FieldState<any>>();
}
