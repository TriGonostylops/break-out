import { Component, Inject, Input, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [MatDialogModule, NgIf],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() message?: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string },
    @Optional() public dialogRef?: MatDialogRef<NoteComponent>
  ) {
    // Prefer @Input, fallback to dialog data
    if (!this.message && data?.message) {
      this.message = data.message;
    }
  }

  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
