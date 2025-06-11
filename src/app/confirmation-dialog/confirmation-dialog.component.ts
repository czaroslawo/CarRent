import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment/environment';
import {RentItemPost} from '../../Models/RentItem';

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
    const data = this.data.RentItemPosterPost;
    console.log(this.data);
    formData.append('userId', data.userId)
    formData.append('title', data.title);
    formData.append('address', data.address);
    formData.append('location', data.location);
    formData.append('transmission', data.transmission);
    formData.append('seats', String(data.seats));
    formData.append('power', String(data.power));
    formData.append('year', String(data.year));
    formData.append('price', String(data.price));
    formData.append('rating', String(data.rating));
    formData.append('description', data.description);

    (this.data.images as File[]).forEach((file, index) => {
      formData.append(`imageUrl[${index}]`, file);
    });
    (this.data.images as File[]).forEach((file, index) => {
      if(index < 1){
        formData.append(`coverImageUrl[${index}]`, file);
      }
    });


    this.http.post<RentItemPost>(`${environment.apiUrl}/api/add-item-with-poster`, formData).subscribe({
      next: () => {this.router.navigate(['/home']); console.log('addItem')},
      error: err => {console.log(err), console.log("formData", formData)}
    })

    console.log("formData", formData);


    this.dialogRef.close(true);
  }

}
