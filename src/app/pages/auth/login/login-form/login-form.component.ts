import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() formGroupEmit = new EventEmitter();
  @Output() onSubmitted = new EventEmitter();

  @Input() isLoading = new Input();

  public hiddenPassword: boolean = true;

  public isSubmit: boolean = false;

  public formGroup: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor() {
    this.initFormGroup();
  }

  public onSubmit(): void {
    this.isSubmit = true;
    this.onSubmitted.emit(this.isSubmit);
    this.formGroupEmit.emit(this.formGroup.value);
  }

  private initFormGroup(): void {
    this.formGroup = new FormGroup({
      username: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      password: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
    });

    this.formGroupEmit.emit(this.formGroup.value);

    this.onChangesForm();
  }

  private onChangesForm(): void {
    this.formGroup.valueChanges.subscribe((_) => {
      this.formGroupEmit.emit(this.formGroup.value);
    });
  }
}
