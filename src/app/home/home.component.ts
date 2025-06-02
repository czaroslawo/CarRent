import {Component, inject, OnInit} from '@angular/core';
import {RentItemComponent} from '../rent-item/rent-item.component';
import {NgForOf} from '@angular/common';
import {RentItemPosterGet, RentItemPosterPost} from '../../Models/RentItem';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RentItemComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  constructor(private router: Router) { }

  cars: RentItemPosterGet[] = [];

  ngOnInit() {
    this.getAll().subscribe({
      next: (data) => {
        console.log('Dane z backendu:', data);
        this.cars = data;
      },
      error: (err) => {
        console.error('Błąd pobierania danych:', err);
      }
    });
  }

  getAll(): Observable<RentItemPosterGet[]> {
    return this.http.get<RentItemPosterGet[]>(`${environment.apiUrl}/api/item-posters`)
  }



  navigateToAdd(){
    this.router.navigate(['/add-ad']).then(r => true);
  }
}
