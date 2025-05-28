import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MapboxComponent} from '../mapbox/mapbox.component';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-ad',
  imports: [
    ImageUploadComponent,
    MapboxComponent,
    FormsModule
  ],
  templateUrl: './add-ad.component.html',
  styleUrl: './add-ad.component.css'
})
export class AddAdComponent {
  dialog = inject(MatDialog);

  @ViewChild('inputTitle') inputTitle!: ElementRef;
  @ViewChild('inputLocation') inputLocation!: ElementRef;
  @ViewChild('inputSeats') inputSeats!: ElementRef;
  @ViewChild('inputPower') inputPower!: ElementRef;
  @ViewChild('inputYear') inputYear!: ElementRef;
  @ViewChild('inputPrice') inputPrice!: ElementRef;
  @ViewChild('inputDescription') inputDescription!: ElementRef;

  @ViewChild('errorTitle') errorTitle!: ElementRef;
  @ViewChild('errorLocation') errorLocation!: ElementRef;
  @ViewChild('errorSeats') errorSeats!: ElementRef;
  @ViewChild('errorPower') errorPower!: ElementRef;
  @ViewChild('errorYear') errorYear!: ElementRef;
  @ViewChild('errorPrice') errorPrice!: ElementRef;
  @ViewChild('errorDescription') errorDescription!: ElementRef;
  @ViewChild('errorImage') errorImage!: ElementRef;

  @ViewChild('transmissionBorder') transmissionBorder!: ElementRef;


  images: string[] = [];
  transmission: string = '';

  showError(input: ElementRef, error: ElementRef) {
    input.nativeElement.classList.remove('border-gray-300');
    input.nativeElement.classList.add('border-red-500');
    error.nativeElement.classList.remove('hidden');
  }

  clearErrors() {
    this.transmissionBorder.nativeElement.classList.remove('border-red-500');
    this.transmissionBorder.nativeElement.classList.add('border-gray-300');
    this.errorImage.nativeElement.classList.add('hidden');
    const fields = [
      {input: this.inputTitle, error: this.errorTitle},
      {input: this.inputLocation, error: this.errorLocation},
      {input: this.inputSeats, error: this.errorSeats},
      {input: this.inputPower, error: this.errorPower},
      {input: this.inputYear, error: this.errorYear},
      {input: this.inputPrice, error: this.errorPrice},
      {input: this.inputDescription, error: this.errorDescription},
    ];
    fields.forEach(field => {
      field.input.nativeElement.classList.remove('border-red-500');
      field.input.nativeElement.classList.add('border-gray-300');
      field.error.nativeElement.classList.add('hidden');
    });
  }


  openDialog(){
    const title = this.inputTitle.nativeElement.value.trim();
    const location = this.inputLocation.nativeElement.value.trim();
    const seats = this.inputSeats.nativeElement.value.trim();
    const power = this.inputPower.nativeElement.value.trim();
    const year = this.inputYear.nativeElement.value.trim();
    const price = this.inputPrice.nativeElement.value.trim();
    const transmission = this.transmission;
    const description = this.inputDescription.nativeElement.value;
    const transmissionBorder = this.transmissionBorder.nativeElement.classList;
    const images = this.images;

    this.clearErrors()

    let isValid = true

    if (!title) {
      isValid = false;
      this.showError(this.inputTitle, this.errorTitle);
    }
    if (!location) {
      isValid = false;
      this.showError(this.inputLocation, this.errorLocation);
    }
    if (!seats) {
      isValid = false;
      this.showError(this.inputSeats, this.errorSeats);
    }
    if (!power) {
      isValid = false;
      this.showError(this.inputPower, this.errorPower);
    }
    if (!year) {
      isValid = false;
      this.showError(this.inputYear, this.errorYear);
    }

    if (!price) {
      isValid = false;
      this.showError(this.inputPrice, this.errorPrice);
    }
    if (!transmission) {
      isValid = false;
      transmissionBorder.remove('border-gray-300');
      transmissionBorder.add('border-red-500');

    }
    if (!description) {
      isValid = false;
      this.showError(this.inputDescription, this.errorDescription);
    }
    if(images.length === 0){
      isValid = false;
      this.errorImage.nativeElement.classList.remove('hidden');
    }

    if(isValid){
      this.dialog.open(ConfirmationDialogComponent);
    }

  }

  onAddressRecived(address: string){
    this.inputLocation.nativeElement.value = address;
  }

  onImageRecived(images: string[]){
    this.images = images;
  }

  onCityRecived(city: string){

  }
}
