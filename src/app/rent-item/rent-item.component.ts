import {Component, Input} from '@angular/core';
import {RentItemPosterGet} from '../../Models/RentItem';


@Component({
  selector: 'app-rent-item',
  imports: [],
  templateUrl: './rent-item.component.html',
  styleUrl: './rent-item.component.css'
})
export class RentItemComponent {
  @Input() car!: RentItemPosterGet;
}
