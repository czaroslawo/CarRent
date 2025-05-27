import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  imagePreviews: string[] = [];
  selectedImage: string | null = null;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imagePreviews.push(result);
        if (!this.selectedImage) {
          this.selectedImage = result;
        }
      };
      reader.readAsDataURL(file);
    }

  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    if (this.selectedImage === this.imagePreviews[index]) {
      this.selectedImage = this.imagePreviews[0] || null;
    }
  }
}
