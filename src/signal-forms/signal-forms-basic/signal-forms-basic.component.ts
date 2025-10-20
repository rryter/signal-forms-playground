import { JsonPipe } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { form, Field, submit } from '@angular/forms/signals';
import { required, minLength, email } from '@angular/forms/signals';

@Component({
  selector: 'app-signal-forms-basic',
  standalone: true,
  imports: [Field, JsonPipe],
  templateUrl: './signal-forms-basic.component.html',
  styleUrl: './signal-forms-basic.component.css'
})
export class SignalFormsBasicComponent {
  // Initialize form with signal
  protected readonly userForm = form(
    signal({
      name: '',
      email: '',
      message: ''
    }),
    (path) => {
      // Define validation rules
      required(path.name);
      minLength(path.name, 3);

      required(path.email);
      email(path.email);

      required(path.message);
      minLength(path.message, 10);
    }
  );

  // Computed signals for name field errors
  protected readonly nameErrors = computed(() => {
    const field = this.userForm.name();
    const errors = field.errors();
    return {
      required: errors.some(e => e.kind === 'required'),
      minLength: errors.some(e => e.kind === 'minLength'),
      hasErrors: errors.length > 0,
      touched: field.touched()
    };
  });

  // Computed signals for email field errors
  protected readonly emailErrors = computed(() => {
    const field = this.userForm.email();
    const errors = field.errors();
    return {
      required: errors.some(e => e.kind === 'required'),
      email: errors.some(e => e.kind === 'email'),
      hasErrors: errors.length > 0,
      touched: field.touched()
    };
  });

  // Computed signals for message field errors
  protected readonly messageErrors = computed(() => {
    const field = this.userForm.message();
    const errors = field.errors();
    return {
      required: errors.some(e => e.kind === 'required'),
      minLength: errors.some(e => e.kind === 'minLength'),
      hasErrors: errors.length > 0,
      touched: field.touched()
    };
  });

  // Submit handler using the submit function
  onSubmit() { 
    submit(this.userForm, async (value) => {
    console.log('Form submitted with values:', value);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submission completed!');
    alert('Form submitted successfully!\n' + JSON.stringify(value, null, 2));
  });
  }

}
