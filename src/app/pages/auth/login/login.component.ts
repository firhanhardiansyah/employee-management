import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { Component } from '@angular/core';
import { UserInterface } from '@interfaces/user.interface';
import { ModalDialogComponent } from '@blocks/modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly appName = environment.appName;
  public isLoading: boolean = false;

  private user: UserInterface;

  constructor(
    private router: Router,
    private authService: AuthService,
    private matDialog: MatDialog
  ) {}

  public getFormValue(user: UserInterface): void {
    this.user = user;
  }

  public onSubmitted(): void {
    this.isLoading = true;
    this.authenticate();
  }

  private async authenticate(): Promise<void> {
    this.authService.authenticate(this.user).subscribe({
      next: (_) => {
        this.isLoading = false;
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.isLoading = false;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          title: 'Info',
          content: error.message,
          cancelButtonText: 'Ok',
        };

        this.matDialog.open(ModalDialogComponent, dialogConfig);
      },
    });
  }
}
