import {Component, inject, Input, input, InputSignal, OnInit, signal} from '@angular/core';
import {MapboxComponent} from '../mapbox/mapbox.component';
import {HttpClient} from '@angular/common/http';
import {RentItemGet, RentItemPosterGet} from '../../Models/RentItem';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {ActivatedRoute} from '@angular/router';
import {PhotoGalleryComponent} from '../photo-gallery/photo-gallery.component';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../auth.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-rent-item-screen',
  imports: [
    MapboxComponent,
    PhotoGalleryComponent,
    NgIf,
    NgOptimizedImage
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
  imageUrlSignal = signal<string[]>([]);





  id!: number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));


    this.getItem().subscribe({
      next: (data: RentItemGet) => {
        this.item = data
        this.imageUrlSignal.set(data.imageUrl);
        console.log(this.item);
      },
      error: (error) => {
        console.log('Błąd pobierania danych:', error);
      }
    })
    this.getUser().subscribe({
      next: (data: any) => {
        this.user = data
        console.log(this.user)

      }
    })
    console.log(this.item);

  }

  getItem(): Observable<RentItemGet> {
    console.log(this.id)
    return this.http.get<RentItemGet>(`${environment.apiUrl}/api/get-item/${this.id}`)
  }

  getUser(): Observable<User>{
    console.log(this.item.userId)
    return this.http.get<User>(`${environment.apiUrl}/api/get-user/${this.item.userId}`)
  }


}
