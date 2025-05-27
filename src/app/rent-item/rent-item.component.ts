import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-rent-item',
  imports: [],
  templateUrl: './rent-item.component.html',
  styleUrl: './rent-item.component.css'
})
export class RentItemComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() location: string = '';
  @Input() transmission: string = '';
  @Input() seats: number = 0;
  @Input() power: number = 0;
  @Input() year: number = 0;
  @Input() price: number = 0;
  @Input() rating: number = 0;
}
