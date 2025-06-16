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
    // if (changes['images'] && this.images && this.images.length > 0) {
    //   this.selectedImage = this.images[0];
    //   this.imagePreviews = [...this.images];
    // }
    // console.log(this.selectedImage);
  }

  index: number = 0


  @Output() imageExport = new EventEmitter<File[]>();
  selectImage(image: string, i: number) {
    this.selectedImage = image;
    this.index = i;
  }

  ngOnInit(): void {
    console.log(this.images)
    this.selectedImage = this.images[0]
    this.images.forEach(image => {
      this.imagePreviews.push(image);
    })


  }

  onRight() {
    if(this.imagePreviews.length-1 >= this.index+1){
      this.selectedImage = this.imagePreviews[this.index + 1]
      this.index = this.index + 1;
      console.log(this.selectedImage, this.index);
    }else{
      this.selectedImage = this.imagePreviews[0];
      this.index = 0
      console.log(this.selectedImage, this.index);
    }
  }

  onLeft() {
    if(0 <= this.index-1){
      this.selectedImage = this.imagePreviews[this.index - 1]
      this.index = this.index - 1
      console.log(this.selectedImage, this.index);
    }else{
      this.selectedImage = this.imagePreviews[this.imagePreviews.length-1];
      this.index = this.imagePreviews.length-1
      console.log(this.selectedImage, this.index);
    }
  }
}
