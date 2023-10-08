import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  public isLoading: boolean = false;
  public isSubmit: boolean = false;

  constructor(private router: Router) {}

  public getFormValue(event): void {
    console.log('getFormValue => ', event);
  }

  public onSaveForm(valid: boolean): void {
    console.log('isSubmit', valid);
    if (valid) {
      this.isLoading = true;
      return;
    }
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }
}
