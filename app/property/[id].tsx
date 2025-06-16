import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useBookingMutation, usePropertiesQuery } from '../../lib/hooks';
import { useBookingStore } from '../../lib/store';
import tw from '../../lib/tw';
import { Booking, PropertyDetail } from '../../types';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: properties, isLoading } = usePropertiesQuery();
  const { mutate } = useBookingMutation();
  
  // Get Zustand bookings state
  const bookings = useBookingStore((state) => state.bookings);
  const addBooking = useBookingStore((state) => state.addBooking);

  if (isLoading) {
    return <Text style={tw`p-4`}>Loading...</Text>;
  }

  const property = properties?.find((p: PropertyDetail) => p.id === id);

  if (!property) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg`}>Property not found.</Text>
      </View>
    );
  }

  // Check if property is already booked by the user
  // (Assuming userId is 'user1' for now)
  const userId = 'user1';
  const isAlreadyBooked = bookings.some(
    (booking) => booking.propertyId === property.id && booking.userId === userId
  );

  const handleBooking = () => {
    if (isAlreadyBooked) {
      alert('You have already booked this property.');
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      userId,
      checkIn: '2025-07-01',
      checkOut: '2025-07-05',
      status: 'confirmed',
    };

    mutate(newBooking, {
      onSuccess: () => {
        addBooking(newBooking);
        alert('Booking successful!');
      },
      onError: () => {
        alert('Booking failed. Try again.');
      },
    });
  };

  return (
    <>
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold ml-3`}>{property.title}</Text>
      </View>

      <ScrollView style={tw`flex-1 bg-white`}>
        <Image
          source={{ uri: property.images[0] }}
          style={tw`h-60 w-full`}
          resizeMode="cover"
        />

        <View style={tw`p-4`}>
          <Text style={tw`text-gray-600 mb-1`}>
            {property.location.city}, {property.location.state}
          </Text>

          <Text style={tw`text-lg font-semibold mb-2`}>Features:</Text>
          {property.features.map((feature, index) => (
            <Text key={index} style={tw`text-gray-700 ml-2`}>
              • {feature}
            </Text>
          ))}
        </View>

        <View style={tw`h-70 m-4 rounded-xl overflow-hidden`}>
          <MapView
            style={tw`flex-1`}
            initialRegion={{
              latitude: property.location.coordinates.latitude,
              longitude: property.location.coordinates.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: property.location.coordinates.latitude,
                longitude: property.location.coordinates.longitude,
              }}
              title={property.title}
              description={property.location.address}
            />
          </MapView>

          {/* Disable button if already booked */}
          <TouchableOpacity
            style={tw.style(
              'm-1 p-2 rounded-xl',
              isAlreadyBooked ? 'bg-gray-400' : 'bg-blue-600'
            )}
            onPress={handleBooking}
            disabled={isAlreadyBooked}
          >
            <Text style={tw`text-white text-center text-lg font-semibold`}>
              {isAlreadyBooked ? 'Booked' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}