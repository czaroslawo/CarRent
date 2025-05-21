import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }
}
