require 'rails_helper'

RSpec.describe Api::V1::RoomsController, type: :request do
  let(:staff_user) { User.create!(email: 'staff@test.com', password: 'password123', name: 'Staff', role: 'staff') }
  let(:guest_user) { User.create!(email: 'guest@test.com', password: 'password123', name: 'Guest', role: 'guest') }
  let(:staff_token) { JsonWebToken.encode(user_id: staff_user.id) }
  let(:guest_token) { JsonWebToken.encode(user_id: guest_user.id) }
  
  let!(:room_type) { RoomType.create!(name: 'Deluxe Room', price: 120.00, max_guests: 2) }
  let!(:room) do
    Room.create!(
      room_no: '101',
      room_type: room_type,
      bed_type: 'Queen Bed',
      size: 25,
      floor_no: 1,
      price_per_night: 120.00,
      status: 'available',
      amenities: ['Wi-Fi', 'A/C'],
      images: ['image1.jpg']
    )
  end

  describe 'GET /api/v1/rooms' do
    it 'returns all rooms with room type' do
      get '/api/v1/rooms', headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['room_no']).to eq('101')
      expect(json[0]['room_type']['name']).to eq('Deluxe Room')
    end

    it 'filters by room type' do
      other_type = RoomType.create!(name: 'Suite', price: 200, max_guests: 3)
      Room.create!(room_no: '201', room_type: other_type, bed_type: 'King', size: 40, floor_no: 2, price_per_night: 200, status: 'available')

      get '/api/v1/rooms', params: { room_type_id: room_type.id }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['room_no']).to eq('101')
    end

    it 'filters by status' do
      Room.create!(room_no: '102', room_type: room_type, bed_type: 'Queen', size: 25, floor_no: 1, price_per_night: 120, status: 'booked')

      get '/api/v1/rooms', params: { status: 'available' }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['status']).to eq('available')
    end

    it 'searches by room number' do
      Room.create!(room_no: '202', room_type: room_type, bed_type: 'Queen', size: 25, floor_no: 2, price_per_night: 120, status: 'available')

      get '/api/v1/rooms', params: { search: '101' }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['room_no']).to eq('101')
    end
  end

  describe 'GET /api/v1/rooms/available' do
    it 'returns available rooms' do
      Room.create!(room_no: '102', room_type: room_type, bed_type: 'Queen', size: 25, floor_no: 1, price_per_night: 120, status: 'booked')

      get '/api/v1/rooms/available', headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['status']).to eq('available')
    end

    it 'filters by room type' do
      other_type = RoomType.create!(name: 'Suite', price: 200, max_guests: 3)
      Room.create!(room_no: '201', room_type: other_type, bed_type: 'King', size: 40, floor_no: 2, price_per_night: 200, status: 'available')

      get '/api/v1/rooms/available', params: { room_type_id: room_type.id }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['room_type']['name']).to eq('Deluxe Room')
    end
  end

  describe 'GET /api/v1/rooms/:id' do
    it 'returns a specific room with room type' do
      get "/api/v1/rooms/#{room.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['room_no']).to eq('101')
      expect(json['room_type']['name']).to eq('Deluxe Room')
      expect(json['amenities']).to eq(['Wi-Fi', 'A/C'])
    end
  end

  describe 'POST /api/v1/rooms' do
    let(:valid_attributes) do
      {
        room: {
          room_no: '301',
          room_type_id: room_type.id,
          bed_type: 'King Bed',
          size: 30,
          floor_no: 3,
          price_per_night: 150.00,
          status: 'available',
          amenities: ['Wi-Fi'],
          images: []
        }
      }
    end

    context 'as staff user' do
      it 'creates a new room' do
        expect {
          post '/api/v1/rooms', params: valid_attributes, headers: { 'Authorization' => "Bearer #{staff_token}" }
        }.to change(Room, :count).by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json['room_no']).to eq('301')
      end

      it 'returns errors with invalid data' do
        post '/api/v1/rooms',
             params: { room: { room_no: '' } },
             headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'as guest user' do
      it 'denies access' do
        post '/api/v1/rooms', params: valid_attributes, headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/rooms/:id' do
    context 'as staff user' do
      it 'updates the room' do
        patch "/api/v1/rooms/#{room.id}",
              params: { room: { status: 'maintenance' } },
              headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:ok)
        expect(room.reload.status).to eq('maintenance')
      end
    end

    context 'as guest user' do
      it 'denies access' do
        patch "/api/v1/rooms/#{room.id}",
              params: { room: { status: 'maintenance' } },
              headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/rooms/:id' do
    context 'as staff user' do
      it 'deletes the room' do
        expect {
          delete "/api/v1/rooms/#{room.id}", headers: { 'Authorization' => "Bearer #{staff_token}" }
        }.to change(Room, :count).by(-1)

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'as guest user' do
      it 'denies access' do
        delete "/api/v1/rooms/#{room.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
