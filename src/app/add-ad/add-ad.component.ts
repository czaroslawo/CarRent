import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MapboxComponent} from '../mapbox/mapbox.component';
import {FormsModule, NgForm} from '@angular/forms';
import {RentItemPosterPost} from '../../Models/RentItem';
import imageCompression from 'browser-image-compression';
import {NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-add-ad',
  imports: [
    ImageUploadComponent,
    MapboxComponent,
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './add-ad.component.html',
  styleUrl: './add-ad.component.css'
})
export class AddAdComponent {
  dialog = inject(MatDialog);

  form: RentItemPosterPost = {
    imageUrl: [],
    title: '',
    location: '',
    transmission: '',
    seats: null,
    year: null,
    power: null,
    rating: 0,
    price: null,
  }

  addAdForm: any

  descript: string = ""
  submitted = false;
  images: File[] = [];
  transmission: string = '';

  @ViewChild('inputLocation') inputLocation!: ElementRef;

  openDialog(form: NgForm) {

    this.submitted = true;

    const data = this.form

    if(form.invalid || this.images.length === 0 || !this.descript.trim()){
      return
    }
      this.dialog.open(ConfirmationDialogComponent,
        {data:{ RentItemPosterPost: data }
    });


  }

  onAddressRecived(address: string){
    this.form.location = address;
  }

  async onImageRecived(images: File[]){
    const compressedImages: File[] = []

    for(const image of images){
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try{
        const compressedFile = await imageCompression(image, options);
        compressedImages.push(compressedFile);
      }catch(e){
        console.log("compression error:", e);
      }
    }
    this.images = compressedImages;
    console.log('Compressed images:', this.images);
  }

  onCityRecived(city: string){

  }
}
