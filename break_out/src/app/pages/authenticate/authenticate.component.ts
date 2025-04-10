import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    NgIf  
  ],
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {
  showLogin: boolean = true;

  toggleView(): void {
    this.showLogin = !this.showLogin;
  }
}
