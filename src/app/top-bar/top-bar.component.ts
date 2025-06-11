import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {MatDatepicker, MatDatepickerToggle, MatDateRangeInput, MatDateRangePicker} from '@angular/material/datepicker';

import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatIcon,
    NgStyle,
    MatDateRangeInput,
    MatDateRangePicker,
    RouterLink,

  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {



}
