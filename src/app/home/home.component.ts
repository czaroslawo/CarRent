import { Component } from '@angular/core';
import {RentItemComponent} from '../rent-item/rent-item.component';
import {NgForOf} from '@angular/common';
import {RentItemPosterGet} from '../../Models/RentItem';
import {Router} from '@angular/router';

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
export class HomeComponent {
  constructor(private router: Router) { }

  cars: RentItemPosterGet[] = [
    {
      title: 'Ford Mustang',
      imageUrl: 'https://images.unsplash.com/photo-1649274749460-5851a718dd2a?...',
      location: 'Ostrów Wielkopolski',
      transmission: 'automatyczna',
      seats: 5,
      power: 300,
      year: 2020,
      price: 60,
      rating: 10
    },
    {
      title: 'BMW M3',
      imageUrl: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Warszawa',
      transmission: 'manualna',
      seats: 4,
      power: 450,
      year: 2024,
      price: 120,
      rating: 9
    }
    ]

  navigateToAdd(){
    this.router.navigate(['/add-ad']).then(r => true);
  }
}
