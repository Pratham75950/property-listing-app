import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useBookingsQuery, useProfileQuery } from '../../lib/hooks';
import tw from '../../lib/tw';
import { Booking } from '../../types';

export default function ProfileScreen() {
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();
  const { data: bookings, isLoading: isBookingsLoading } = useBookingsQuery();
  if (isProfileLoading || isBookingsLoading) {
     return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="grey" />
      <Text style={tw`mt-2 text-gray-500`}>Loading profile...</Text>
    </View>
  );
  }

  // Filter bookings by profile.bookings
const userBookings: Booking[] = bookings?.filter((b) =>
  b.userId === profile?.id
) ?? [];

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-2`}>Profile</Text>
      <Text style={tw`text-lg mb-1`}>Name: {profile?.name}</Text>
      <Text style={tw`text-lg mb-4`}>Email: {profile?.email}</Text>

      <Text style={tw`text-xl font-semibold mb-2`}>
        Your Bookings ({userBookings.length}):
      </Text>

      <FlatList
        data={userBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-gray-100 p-4 mb-2 rounded-xl`}>
            <Text style={tw`text-base font-medium`}>
              Booking ID: {item.id}
            </Text>
            <Text>Check-in: {item.checkIn}</Text>
            <Text>Check-out: {item.checkOut}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
