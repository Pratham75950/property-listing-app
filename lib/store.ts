import { create } from 'zustand';
import { Booking } from '../types';

type BookingState = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  addBooking: (booking) =>
  set((state) => ({ bookings: [...state.bookings, booking] })),
  removeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== id),
    })),
}));