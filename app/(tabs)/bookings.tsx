import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { deleteBooking } from '../../lib/api';
import { useBookingsQuery, usePropertiesQuery } from '../../lib/hooks';
import { useBookingStore } from '../../lib/store';
import tw from '../../lib/tw';
import { Booking } from '../../types';


export default function BookingsScreen() {
  const { data: bookings, isLoading } = useBookingsQuery();
  const { data: properties } = usePropertiesQuery();
  const queryClient = useQueryClient();
  const removeBooking = useBookingStore((state) => state.removeBooking);

  const getProperty = (id: string) =>
    properties?.find((p) => p.id === id);


  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (_data, id) => {
       if (typeof id === 'string') {
      removeBooking(id); // update Zustand store immediately
    }
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });


  if (isLoading) {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="grey" />
      <Text style={tw`mt-2 text-gray-500`}>Loading bookings....</Text>
    </View>
  );
}
  
  return (
   <FlatList
      data={bookings}
      keyExtractor={(item: Booking) => item.id}
      contentContainerStyle={tw`p-4`}
        ListEmptyComponent={
      <Text style={tw`text-center text-gray-500 mt-10`}>
        No bookings yet.
      </Text>
  }
      renderItem={({ item }) => {
        const property = getProperty(item.propertyId);
        return (
          <View style={tw`bg-white p-4 mb-4 rounded-lg shadow`}>
            <Text style={tw`text-lg font-bold`}>
              {property?.title ?? 'Unknown Property'}
            </Text>
            <Text style={tw`text-gray-600`}>
              {property?.location.city}, {property?.location.state}
            </Text>
            <Text style={tw`mt-2`}>
              Check-in: {item.checkIn} | Check-out: {item.checkOut}
            </Text>
            <Text style={tw`text-green-600 mt-1 font-semibold`}>
              Status: {item.status}
            </Text>
              <TouchableOpacity
              onPress={() => deleteMutation.mutate(item.id)}
              style={tw`mt-3 bg-red-500 px-4 py-2 rounded`}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Delete Booking
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}