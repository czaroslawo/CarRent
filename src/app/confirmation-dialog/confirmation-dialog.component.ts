import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogClose} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogClose
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {


}
