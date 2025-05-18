import {
  Component,
  Inject,
  Output,
  EventEmitter,
  Optional,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-door',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.scss'],
})
export class DoorComponent {
  @Output() doorUnlocked: EventEmitter<boolean> = new EventEmitter<boolean>();

  password: string;
  clue: string;
  inputPassword: string = '';
  output: string = 'Door locked. Enter the password:';
  showHint: boolean = false;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { password: string; clue?: string }
  ) {
    this.password = data?.password || 'default';
    this.clue = data?.clue || '';
  }

  verifyPassword(): void {
    if (this.inputPassword === this.password) {
      this.output = 'Access granted!';
      this.doorUnlocked.emit(true);
    } else {
      this.output = 'Access denied!';
    }
    this.inputPassword = '';
  }

  toggleHint(): void {
    this.showHint = !this.showHint;
  }
}
