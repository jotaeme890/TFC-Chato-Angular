import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  /**
   * Constructs a component constructor function.
   *
   * @param dialogRef MatDialogRef<ConfirmDialogComponent> - a reference to the dialog component.
   * @param message string - the message to be displayed in the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public message: string
  ) {}

  ngOnInit() {}

  /**
   * Closes the dialog.
   */
  cancel() {
    this.dialogRef.close();
  }
}
