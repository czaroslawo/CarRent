import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {RentItemPosterPost} from '../../Models/RentItem';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../enviornments/enviornment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogClose
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  private router = inject(Router);
  private http = inject(HttpClient);


  dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  data = inject(MAT_DIALOG_DATA)

  onPublish(){
    const formData = new FormData();
    const data = this.data.rentItemPoster;
    console.log(this.data);
    formData.append('title', data.title);
    formData.append('location', data.location);
    formData.append('transmission', data.transmission);
    formData.append('seats', data.seats.toString());
    formData.append('power', data.power.toString());
    formData.append('year', data.year.toString());
    formData.append('price', data.price.toString());
    formData.append('rating', data.rating.toString());
    formData.append('imageUrl', data.imageUrl[0]);


    console.log(formData);

    this.http.post<RentItemPosterPost>(`${environment.apiUrl}/api/add-item-poster`, formData).subscribe({
      next: () => {this.router.navigate(['/home']); console.log('addItem')},
      error: err => {console.log(err)}
    })
    this.dialogRef.close(true);
  }

}
