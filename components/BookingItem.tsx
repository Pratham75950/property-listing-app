import React from 'react';
import { Text, View } from 'react-native';
import tw from '../lib/tw';
import type { Booking, PropertyDetail } from '../types';

type Props = {
  booking: Booking;
  property?: PropertyDetail;
};

export default function BookingItem({ booking, property }: Props) {
  return (
    <View style={tw`bg-gray-100 p-4 rounded-lg mb-3`}>
      <Text style={tw`text-lg font-semibold`}>
        {property ? property.title : 'Unknown Property'}
      </Text>
      <Text>Status: {booking.status}</Text>
      <Text>Check-in: {booking.checkIn}</Text>
      <Text>Check-out: {booking.checkOut}</Text>
    </View>
  );
}