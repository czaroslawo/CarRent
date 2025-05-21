import { Component } from '@angular/core';
import {ImageUploadComponent} from '../image-upload/image-upload.component';

@Component({
  selector: 'app-add-ad',
  imports: [
    ImageUploadComponent
  ],
  templateUrl: './add-ad.component.html',
  styleUrl: './add-ad.component.css'
})
export class AddAdComponent {

}
