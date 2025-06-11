export interface RentItemPost {
  id?: number,
  userId: number | null,
  imageUrl: File[],
  coverImageUrl: File[],
  title: string,
  location: string,
  address: string,
  transmission: string,
  seats: number | null,
  power: number | null,
  year: number | null,
  price: number | null,
  rating: number,
  description: string,
}

export interface RentItemPosterGet {
  id?: number,
  rent_item_id: number | null,
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


export interface RentItemGet {
  id?: number,
  userId: number | null,
  imageUrl: string[],
  title: string,
  address: string,
  transmission: string,
  seats: number,
  power: number,
  year: number,
  price: number,
  description: string
}
