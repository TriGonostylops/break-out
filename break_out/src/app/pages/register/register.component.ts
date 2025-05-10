import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
      if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.registerForm.value.email, this.registerForm.value.password);
        console.log('User registered:', userCredential.user);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  }
}
