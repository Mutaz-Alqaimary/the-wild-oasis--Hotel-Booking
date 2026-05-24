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

export interface BookingData {
  cabinId: string | number;
  cabinPrice: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
}

export interface NewBooking {
  guestId: string | number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: string;
  cabinId: string | number;
  cabinPrice: number;
  startDate: Date | string;
  endDate: Date | string;
  numNights: number;
}