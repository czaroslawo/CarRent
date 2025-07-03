import {Component, inject, Input, input, InputSignal, OnInit, signal} from '@angular/core';
import {MapboxComponent} from '../mapbox/mapbox.component';
import {HttpClient} from '@angular/common/http';
import {RentItemGet, RentItemPosterGet} from '../../Models/RentItem';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {ActivatedRoute} from '@angular/router';
import {PhotoGalleryComponent} from '../photo-gallery/photo-gallery.component';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {User} from '../../Models/User';
import {MatDialog} from '@angular/material/dialog';
import {ReservationDialogComponent} from '../reservation-dialog/reservation-dialog.component';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-rent-item-screen',
  imports: [
    MapboxComponent,
    PhotoGalleryComponent,
    NgIf,
  ],
  templateUrl: './rent-item-screen.component.html',
  styleUrl: './rent-item-screen.component.css'
})
export class RentItemScreenComponent implements OnInit {

  item: RentItemGet = {
    imageUrl: [],
    userId: null,
    title: '',
    address: '',
    transmission: '',
    seats: 0,
    power: 0,
    year: 0,
    price: 0,
    description: ''
  }

  user: {
    id: number | null,
    phone_number: number | null,
    name: string | null,
  } = {
    id: null,
    phone_number: null,
    name: null
  }

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  auth = inject(AuthService)

  imageUrlSignal = signal<string[]>([]);

  loggedUserId: number | null = null;
  itemId!: number;

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.loggedUserId = this.auth.getUserId()

    this.getItem().subscribe({
      next: (data: RentItemGet) => {
        this.item = data
        this.imageUrlSignal.set(data.imageUrl);
        console.log(this.item);
        console.log(this.item.userId);
        this.getUser().subscribe({
          next: (res: any) => {
            this.user = res
            console.log(this.user)

          }
        })
      },
      error: (error) => {
        console.log('Błąd pobierania danych:', error);
      }
    })

    console.log(this.item);

  }

  onReservation(){
    console.log("rezerwacja")
    if(this.loggedUserId != null){
      console.log("user id", this.loggedUserId)
      this.dialog.open(ReservationDialogComponent, {
        data: {
          itemId: this.itemId,
          userId: this.user.id,
        }
      })
    }
  }

  getItem(): Observable<RentItemGet> {
    console.log(this.itemId)
    return this.http.get<RentItemGet>(`${environment.apiUrl}/api/get-item/${this.itemId}`)
  }

  getUser(): Observable<User>{
    console.log(this.item.userId)
    return this.http.get<User>(`${environment.apiUrl}/api/get-user/${this.item.userId}`)
  }


  protected readonly name = name;
}
