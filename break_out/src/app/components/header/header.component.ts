import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NgIf } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, MatSidenavModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  isLoggedIn: boolean = false;
  isMobile: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(auth, (user) => {
      this.ngZone.run(() => {
        this.isLoggedIn = !!user;
        this.cdr.detectChanges();
      });
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 768px)'])
      .subscribe((result) => {
        this.ngZone.run(() => {
          this.isMobile = result.matches;
          this.cdr.detectChanges();
          if (!this.isMobile && this.sidenav) {
            this.sidenav.close();
          }
        });
      });
  }

  ngAfterViewInit(): void {
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
