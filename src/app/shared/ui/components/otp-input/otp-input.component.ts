import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-input.component.html',
})
export class OtpInputComponent {
  @Input() length = 6;
  @Output() completed = new EventEmitter<string>();

  readonly form: FormGroup;

  readonly ids = computed(() =>
    Array.from({ length: this.length }, (_, i) => `code-${i + 1}`)
  );

  constructor(private fb: FormBuilder) {
    const group: Record<string, FormControl<string>> = {};
    for (let i = 0; i < this.length; i++) {
      group[this.key(i)] = this.fb.nonNullable.control('', [
        Validators.pattern(/^\d$/),
      ]);
    }
    this.form = this.fb.group(group);
  }

  /* ---------- helpers ---------- */

  key(i: number) {
    return `d${i}`;
  }

  private focus(i: number) {
    const el = document.getElementById(`code-${i + 1}`) as HTMLInputElement;
    el?.focus();
    el?.select();
  }

  private emitIfComplete() {
    const code = this.code;
    if (code.length === this.length && /^\d+$/.test(code)) {
      this.completed.emit(code);
    }
  }

  get code(): string {
    return Array.from(
      { length: this.length },
      (_, i) => this.form.get(this.key(i))?.value ?? ''
    ).join('');
  }

  /* ---------- events ---------- */

  handleInput(i: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const digit = (input.value.match(/\d/g) ?? []).pop() ?? '';

    this.form.get(this.key(i))?.setValue(digit, { emitEvent: false });
    input.value = digit;

    if (digit && i < this.length - 1) {
      this.focus(i + 1);
    }

    this.emitIfComplete();
  }

  handleKeyDown(i: number, event: KeyboardEvent) {
    const value = this.form.get(this.key(i))?.value;

    if (event.key === 'Backspace' && !value && i > 0) {
      this.focus(i - 1);
    }

    if (event.key === 'ArrowLeft' && i > 0) {
      event.preventDefault();
      this.focus(i - 1);
    }

    if (event.key === 'ArrowRight' && i < this.length - 1) {
      event.preventDefault();
      this.focus(i + 1);
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasted = event.clipboardData?.getData('text') ?? '';
    const digits = pasted.replace(/\D/g, '').slice(0, this.length);

    digits.split('').forEach((d, i) => {
      this.form.get(this.key(i))?.setValue(d, { emitEvent: false });
    });

    this.focus(Math.min(digits.length, this.length - 1));
    this.emitIfComplete();
  }
}
