import {Component, inject, OnInit, signal} from '@angular/core';
import {MatFormField, MatHint, MatInputModule, MatLabel} from '@angular/material/input';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {BookedDatesResponse, Reservation} from '../../Models/Reservation';
import {MapboxComponent} from '../mapbox/mapbox.component';


@Component({
  selector: 'app-reservation-dialog',
  imports: [
    MatFormField,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatHint,
    MatLabel,
    MatInputModule,
    NgIf,
    MapboxComponent,
    NgClass,
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ReservationDialogComponent implements OnInit{


  data = inject(MAT_DIALOG_DATA)
  http = inject(HttpClient)

  bookedDates: Array<Reservation> = []
  loaded: boolean = false;
  submitted: boolean = false;

  errorMessage = signal('');

  minDate: Date = new Date(new Date().setHours(0, 0, 0, 0));


  readonly range = new FormGroup({
    date_start: new FormControl<Date | null>(null, [Validators.required]),
    date_end: new FormControl<Date | null>(null, [Validators.required]),
  });

  reservation: Reservation = {
    rent_item_id: this.data.itemId,
    user_id: this.data.userId,
    start_date: '',
    end_date: '',
    address: '',
  }


  dateFilter = (d: Date | null): boolean =>{
    if (!d) return false;

    const check = new Date(d);
    check.setHours(0, 0, 0, 0);
    return !this.bookedDates.some(reservation => {
      const start = new Date(reservation.start_date + 'T00:00:00')
      const end = new Date(reservation.end_date + 'T00:00:00');
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return start <= check && end >= check;
    });

  }


  public combinedFilter: (d: Date | null) => boolean = (d) => true;

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    this.http.get<BookedDatesResponse>(`${environment.apiUrl}/api/rent_items/${this.data.itemId}/booked-dates`)
      .subscribe({
        next: data => {
          this.bookedDates = data.booked_dates;
          this.loaded = true;
          this.combinedFilter = this.dateFilter
        },

        error: error => {console.log('reservation loading error', error); this.loaded = true;}
      })
  }

  onReservation() {
    this.submitted = true;
    console.log("submitted", this.submitted);
    if (this.range.invalid) {
      this.errorMessage.set('Musisz wybrać okres czasu')
    }else {
      this.reservation.start_date = this.range.controls['date_start'].value!.toISOString().split('T')[0]
      this.reservation.end_date = this.range.controls['date_end'].value!.toISOString().split('T')[0]
      console.log(this.reservation)
      this.http.post<Reservation>(`${environment.apiUrl}/api/reservation`, this.reservation).subscribe({
        next: data => {console.log("reservation success", data)},
        error: error => {console.log('reservation adding error', error);}
      })
  }
  }

  onAddressRecived(address: string){
    this.reservation.address = address;
  }


}
