export type PropertyDetail = {
   id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
};

export type Booking = {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;  // ISO date string
  checkOut: string; // ISO date string
  status: string;
};


export type Profile = {
  id: string;
  name: string;
  email: string;
  bookings: string[]; // array of booking IDs
};