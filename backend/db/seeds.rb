# Clear existing data
puts "Clearing existing data..."
Booking.destroy_all
Room.destroy_all
RoomType.destroy_all
User.destroy_all

puts "Creating users..."
# Create staff user
staff = User.create!(
  email: 'staff@hotel.com',
  password: 'password123',
  password_confirmation: 'password123',
  name: 'Sarah Connor',
  role: 'staff'
)

# Create guest user
guest = User.create!(
  email: 'guest@hotel.com',
  password: 'password123',
  password_confirmation: 'password123',
  name: 'Eleanor Vance',
  role: 'guest'
)

puts "Creating room types..."
deluxe = RoomType.create!(
  name: 'Deluxe Room',
  price: 120.00,
  max_guests: 2,
  image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  description: 'Cozy and comfortable, perfect for solo travelers or couples.'
)

standard = RoomType.create!(
  name: 'Standard Room',
  price: 80.00,
  max_guests: 2,
  image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  description: 'Comfortable standard room suitable for budget travelers.'
)

executive = RoomType.create!(
  name: 'Executive Suite',
  price: 250.00,
  max_guests: 3,
  image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80',
  description: 'Luxury suite with separate living area and premium amenities.'
)

family = RoomType.create!(
  name: 'Family Room',
  price: 180.00,
  max_guests: 5,
  image: 'https://images.unsplash.com/photo-1559599101-7466dbdf4e7d?auto=format&fit=crop&w=1200&q=80',
  description: 'Spacious room designed for families with children.'
)

junior = RoomType.create!(
  name: 'Junior Suite',
  price: 200.00,
  max_guests: 4,
  image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  description: 'Junior suite offering extra space and comfort.'
)

puts "Creating rooms..."
Room.create!([
  {
    room_no: '101',
    room_type: deluxe,
    bed_type: 'Queen Bed',
    size: 25,
    description: 'Cozy and comfortable, perfect for solo travelers or couples looking for a quick city stay.',
    floor_no: 1,
    price_per_night: 120.00,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', 'Coffee Maker'],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    room_no: '203',
    room_type: executive,
    bed_type: 'King Bed',
    size: 55,
    description: 'Executive suite with separate living area, luxury bathroom, and balcony.',
    floor_no: 2,
    price_per_night: 250.00,
    status: 'booked',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', 'King Bed', 'Balcony', 'Pool View', 'Coffee Maker'],
    images: [
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    room_no: '305',
    room_type: standard,
    bed_type: 'Queen Bed',
    size: 28,
    description: 'Comfortable standard room suitable for solo travelers or couples.',
    floor_no: 3,
    price_per_night: 80.00,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Queen Bed'],
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80']
  },
  {
    room_no: '410',
    room_type: family,
    bed_type: '2 Queen Beds',
    size: 50,
    description: 'Large family room with extra beds and child-friendly amenities.',
    floor_no: 4,
    price_per_night: 180.00,
    status: 'maintenance',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', '2 Queen Beds', 'Coffee Maker'],
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80']
  },
  {
    room_no: '501',
    room_type: junior,
    bed_type: 'King Bed',
    size: 40,
    description: 'Junior suite offering extra space and comfort with a sitting area.',
    floor_no: 5,
    price_per_night: 200.00,
    status: 'available',
    amenities: ['Wi-Fi', 'A/C', 'Smart TV', 'King Bed', 'Coffee Maker', 'Mini Bar'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ]
  }
])

puts "Creating bookings..."
Booking.create!([
  {
    user: guest,
    guest_name: 'Eleanor Vance',
    guest_count: 2,
    room_type: executive,
    room: nil,
    check_in: Date.today + 1,
    check_out: Date.today + 5,
    status: 'Arriving',
    authorize_card: true
  },
  {
    user: guest,
    guest_name: 'Thomas Shelby',
    guest_count: 1,
    room_type: deluxe,
    room: Room.find_by(room_no: '305'),
    check_in: Date.today,
    check_out: Date.today + 5,
    status: 'Checked In',
    authorize_card: true
  },
  {
    user: guest,
    guest_name: 'Olivia Parker',
    guest_count: 3,
    room_type: family,
    room: nil,
    check_in: Date.today + 2,
    check_out: Date.today + 5,
    status: 'Departing',
    authorize_card: false
  }
])

puts "Seed data created successfully!"
puts "Staff user: staff@hotel.com / password123"
puts "Guest user: guest@hotel.com / password123"
