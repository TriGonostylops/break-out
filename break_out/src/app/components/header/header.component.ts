import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title!: string;

  isLoggedIn: boolean = false;

  
  ngOnInit(): void {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user; 
    });
  }
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
