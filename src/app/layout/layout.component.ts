import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopBarComponent} from '../top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    TopBarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
