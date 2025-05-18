import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimeFormatPipe],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  elapsedTime = 0; 
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = interval(10).subscribe(() => {
      this.elapsedTime += 0.01;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
