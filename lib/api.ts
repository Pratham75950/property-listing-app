import axios from 'axios';
import { API_URL } from '../constants';
import { Booking, Profile, PropertyDetail } from '../types';

export const getProperties = async (): Promise<PropertyDetail[]> => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};

export const postBooking = async (booking: Booking) => {
  const { data } = await axios.post(`${API_URL}/bookings`, booking);
  return data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await axios.get(`${API_URL}/bookings`);
  return data;
};

export const getProfile = async (): Promise<Profile> => {
  const { data } = await axios.get(`${API_URL}/profile`);
  return data;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/bookings/${id}`);
};