import {Component, inject, input, Input} from '@angular/core';
import {RentItemPosterGet} from '../../Models/RentItem';
import {Router} from '@angular/router';


@Component({
  selector: 'app-rent-item',
  imports: [],
  templateUrl: './rent-item.component.html',
  styleUrl: './rent-item.component.css'
})
export class RentItemComponent {
  @Input() car!: RentItemPosterGet;

  router = inject(Router);



  onNavigate() {
    const id = this.car.id
    console.log("id:", id);
    const title = this.car.title
    const item_id = this.car.rent_item_id
    console.log("item_id", item_id)
    console.log('title', title)
    console.log(this.car)
    this.router.navigate([`/rent-item-screen`, item_id])
  }

}
