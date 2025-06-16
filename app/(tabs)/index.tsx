import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usePropertiesQuery } from '../../lib/hooks';
import tw from '../../lib/tw';
import { PropertyDetail } from '../../types';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<PropertyDetail[]>([]);
  const [allProperties, setAllProperties] = useState<PropertyDetail[]>([]);
  const router = useRouter();

  const { data: properties, isLoading } = usePropertiesQuery();

  // Update state when API data arrives
  useEffect(() => {
    if (properties) {
      setAllProperties(properties);
      setFiltered(properties); // initially show all
    }
  }, [properties]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filteredData = allProperties.filter((property) =>
      property.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

if (isLoading) {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="grey" />
      <Text style={tw`mt-2 text-gray-500`}>Loading...</Text>
    </View>
  );
}
  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Find Your Stay</Text>

      <TextInput
        placeholder="Search properties..."
        value={search}
        onChangeText={handleSearch}
        style={tw`bg-gray-100 px-4 py-3 rounded-lg mb-4`}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push(`/property/${item.id}`)}
            style={tw`bg-gray-100 p-4 rounded-xl mb-3`}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={tw`h-40 w-full rounded-lg mb-2`}
              resizeMode="cover"
            />
            <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
            <Text style={tw`text-gray-500`}>
              {item.location.city}, {item.location.state}
            </Text>
            <Text style={tw`text-gray-800 mt-1`}>₹{item.price}/night</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}