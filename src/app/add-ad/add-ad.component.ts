import {Component, inject} from '@angular/core';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-add-ad',
  imports: [
    ImageUploadComponent,
    MatButton
  ],
  templateUrl: './add-ad.component.html',
  styleUrl: './add-ad.component.css'
})
export class AddAdComponent {
  dialog = inject(MatDialog);

  openDialog(){
    this.dialog.open(ConfirmationDialogComponent);
  }
}
