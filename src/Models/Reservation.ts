export interface BookedDatesResponse {
  rent_item_id: number;
  booked_dates: Reservation[];
}

export interface Reservation {
  rent_item_id: number,
  user_id: number,
  start_date: string  | Date | null,
  end_date: string | Date | null,
  address: string,
}
