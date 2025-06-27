import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgIf, NgStyle} from '@angular/common';
import {MatDatepicker, MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from '@angular/material/datepicker';

import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatIcon,
    NgStyle,
    RouterLink,
    NgIf,

  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {

    router = inject(Router);
    url = ''


    ngOnInit(): void {
       this.url = this.router.url;

       this.router.events.pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
           this.url = event.url;
         })
    }



}
