export const rooms = [
  {
    id: 'r1',
    roomNo: '101',
    roomType: 'Deluxe Room',
    bedType: 'Queen Bed',
    size: 25,
    description:
      'Cozy and comfortable, perfect for solo travelers or couples looking for a quick city stay.',
    floorNo: 1,
    pricePerNight: 120,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', 'Coffee Maker'],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'r2',
    roomNo: '203',
    roomType: 'Executive Suite',
    bedType: 'King Bed',
    size: 55,
    description:
      'Executive suite with separate living area, luxury bathroom, and balcony.',
    floorNo: 2,
    pricePerNight: 250,
    status: 'booked',
    amenities: [
      'Wi-Fi',
      'A/C',
      'Smart TV',
      'King Bed',
      'Balcony',
      'Pool View',
      'Coffee Maker',
    ],
    images: [
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'r3',
    roomNo: '305',
    roomType: 'Standard Room',
    bedType: 'Queen Bed',
    size: 28,
    description: 'Comfortable standard room suitable for solo travelers or couples.',
    floorNo: 3,
    pricePerNight: 80,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Queen Bed'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'r4',
    roomNo: '410',
    roomType: 'Family Room',
    bedType: '2 Queen Beds',
    size: 50,
    description: 'Large family room with extra beds and child-friendly amenities.',
    floorNo: 4,
    pricePerNight: 180,
    status: 'maintenance',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', '2 Queen Beds', 'Coffee Maker'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'r5',
    roomNo: '501',
    roomType: 'Junior Suite',
    bedType: 'King Bed',
    size: 40,
    description: 'Junior suite offering extra space and comfort with a sitting area.',
    floorNo: 5,
    pricePerNight: 200,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', 'King Bed', 'Coffee Maker', 'Mini Bar'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

export const roomTypes = [
  {
    id: 'rt1',
    name: 'Deluxe Room',
    price: 120,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: 'Cozy and comfortable, perfect for solo travelers or couples.'
  },
  {
    id: 'rt2',
    name: 'Standard Room',
    price: 80,
    guests: 2,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    description: 'Comfortable standard room suitable for budget travelers.'
  },
  {
    id: 'rt3',
    name: 'Executive Suite',
    price: 250,
    guests: 3,
    image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury suite with separate living area and premium amenities.'
  },
  {
    id: 'rt4',
    name: 'Family Room',
    price: 180,
    guests: 5,
    image: 'https://images.unsplash.com/photo-1559599101-7466dbdf4e7d?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious room designed for families with children.'
  },
  {
    id: 'rt5',
    name: 'Junior Suite',
    price: 200,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    description: 'Junior suite offering extra space and comfort.'
  },
];

