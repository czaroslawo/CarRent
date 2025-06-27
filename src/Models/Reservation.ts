export interface BookedDatesResponse {
  rent_item_id: number;
  booked_dates: Reservation[];
}

export interface Reservation {
  startDate: string,
  endDate: string
}
