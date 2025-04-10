import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TimeFormatPipe } from '../../pipes/time-format.pipe'; 

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [TimeFormatPipe],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  elapsedTime = 0; // in seconds
  private subscription!: Subscription;

  ngOnInit(): void {
    // Create an interval that emits a value every 1000ms (1 second)
    this.subscription = interval(1000).subscribe(() => {
      this.elapsedTime++;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
