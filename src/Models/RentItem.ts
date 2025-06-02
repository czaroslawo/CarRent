export interface RentItemPosterPost {
  id?: number,
  imageUrl: File[],
  title: string,
  location: string,
  transmission: string,
  seats: number | null,
  power: number | null,
  year: number | null,
  price: number | null,
  rating: number,
}

export interface RentItemPosterGet {
  id?: number,
  imageUrl: string,
  title: string,
  location: string,
  transmission: string,
  seats: number,
  power: number,
  year: number,
  price: number,
  rating: number,
}

