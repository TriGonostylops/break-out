import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | null;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser();
    this.emailForm = this.fb.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
    });
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  async onUpdateEmail() {
    if (this.emailForm.valid) {
      try {
        await this.userService.updateUserEmail(this.emailForm.value.email);
        this.snackBar.open('Email updated successfully', 'Close', {
          duration: 3000,
        });
      } catch (error: any) {
        this.snackBar.open(
          'Failed to update email: ' + error.message,
          'Close',
          { duration: 4000 }
        );
      }
    }
  }

  async onUpdatePassword() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.password !==
        this.passwordForm.value.confirmPassword
      ) {
        this.snackBar.open('Passwords do not match', 'Close', {
          duration: 3000,
        });
        return;
      }
      try {
        await this.userService.updateUserPassword(
          this.passwordForm.value.password
        );
        this.snackBar.open('Password updated successfully', 'Close', {
          duration: 3000,
        });
        this.passwordForm.reset();
      } catch (error: any) {
        this.snackBar.open(
          'Failed to update password: ' + error.message,
          'Close',
          { duration: 4000 }
        );
      }
    }
  }

  async onDeleteAccount() {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      try {
        await this.userService.deleteCurrentUser();
        this.snackBar.open('Account deleted successfully', 'Close', {
          duration: 3000,
        });
      } catch (error: any) {
        this.snackBar.open(
          'Failed to delete account: ' + error.message,
          'Close',
          { duration: 4000 }
        );
      }
    }
  }
}
