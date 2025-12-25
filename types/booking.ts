export interface Cabin {
  name: string;
  image: string;
}

export interface Booking {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: string;
  cabinId: string;
  cabins: Cabin; 
}
