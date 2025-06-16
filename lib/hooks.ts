import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Booking } from '../types';
import { getBookings, getProfile, getProperties, postBooking } from './api';

export const usePropertiesQuery = () => useQuery({ queryKey: ['properties'], queryFn: getProperties });

export const useBookingsQuery = () => useQuery({ queryKey: ['bookings'], queryFn: getBookings });

export const useBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (booking: Booking) => postBooking(booking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });
};

export const useProfileQuery = () =>
  useQuery({ queryKey: ['profile'], queryFn: getProfile });