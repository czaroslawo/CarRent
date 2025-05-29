import {Component, EventEmitter, Output} from '@angular/core';
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
  selectedFiles: File[] = [];

  @Output() imageExport = new EventEmitter<File[]>();

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        this.imagePreviews.push(previewUrl);
        this.selectedFiles.push(file);
        this.imageExport.emit(this.selectedFiles)
        if (!this.selectedImage) {
          this.selectedImage = previewUrl;
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
    this.selectedFiles.splice(index, 1);

    this.imageExport.emit(this.selectedFiles);
    if (this.selectedImage === this.imagePreviews[index]) {
      this.selectedImage = this.imagePreviews[0] || null;
    }
  }
}
