import {
  Component,
  effect,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent implements OnInit, OnChanges {
  imagePreviews: string[] = [];
  selectedImage: string | null = null;


  @Input() images: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && this.images && this.images.length > 0) {
      this.selectedImage = this.images[0];
      this.imagePreviews = [...this.images];
    }
    console.log(this.selectedImage);
  }




  @Output() imageExport = new EventEmitter<File[]>();
  selectImage(image: string) {
    this.selectedImage = image;
  }

  ngOnInit(): void {
    console.log(this.images)
    this.selectedImage = this.images[0]
    this.images.forEach(image => {
      this.imagePreviews.push(image);
    })

  }
}
