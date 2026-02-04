require 'rails_helper'

RSpec.describe Api::V1::BookingsController, type: :request do
  let(:staff_user) { User.create!(email: 'staff@test.com', password: 'password123', name: 'Staff', role: 'staff') }
  let(:guest_user) { User.create!(email: 'guest@test.com', password: 'password123', name: 'Guest', role: 'guest') }
  let(:staff_token) { JsonWebToken.encode(user_id: staff_user.id) }
  let(:guest_token) { JsonWebToken.encode(user_id: guest_user.id) }
  
  let!(:room_type) { RoomType.create!(name: 'Deluxe Room', price: 120.00, max_guests: 2) }
  let!(:room) { Room.create!(room_no: '101', room_type: room_type, bed_type: 'Queen', size: 25, floor_no: 1, price_per_night: 120, status: 'available') }
  let!(:booking) do
    Booking.create!(
      user: guest_user,
      guest_name: 'John Doe',
      guest_count: 2,
      room_type: room_type,
      check_in: Date.today + 1,
      check_out: Date.today + 3,
      status: 'confirmed'
    )
  end

  describe 'GET /api/v1/bookings' do
    context 'as guest user' do
      it 'returns only own bookings' do
        other_user = User.create!(email: 'other@test.com', password: 'password123', name: 'Other', role: 'guest')
        Booking.create!(user: other_user, guest_name: 'Jane', guest_count: 1, room_type: room_type, check_in: Date.today, check_out: Date.today + 1, status: 'confirmed')

        get '/api/v1/bookings', headers: { 'Authorization' => "Bearer #{guest_token}" }

        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
        expect(json[0]['guest_name']).to eq('John Doe')
      end
    end

    context 'as staff user' do
      it 'returns all bookings' do
        other_user = User.create!(email: 'other@test.com', password: 'password123', name: 'Other', role: 'guest')
        Booking.create!(user: other_user, guest_name: 'Jane', guest_count: 1, room_type: room_type, check_in: Date.today, check_out: Date.today + 1, status: 'confirmed')

        get '/api/v1/bookings', headers: { 'Authorization' => "Bearer #{staff_token}" }

        json = JSON.parse(response.body)
        expect(json.length).to eq(2)
      end
    end

    it 'filters by status' do
      Booking.create!(user: guest_user, guest_name: 'Jane', guest_count: 1, room_type: room_type, check_in: Date.today, check_out: Date.today + 1, status: 'Checked In')

      get '/api/v1/bookings', params: { status: 'confirmed' }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['status']).to eq('confirmed')
    end

    it 'searches by guest name' do
      Booking.create!(user: guest_user, guest_name: 'Jane Smith', guest_count: 1, room_type: room_type, check_in: Date.today, check_out: Date.today + 1, status: 'confirmed')

      get '/api/v1/bookings', params: { search: 'John' }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['guest_name']).to eq('John Doe')
    end

    it 'searches by confirmation code' do
      get '/api/v1/bookings', params: { search: booking.confirmation }, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['confirmation']).to eq(booking.confirmation)
    end
  end

  describe 'GET /api/v1/bookings/:id' do
    it 'returns a specific booking with associations' do
      get "/api/v1/bookings/#{booking.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['guest_name']).to eq('John Doe')
      expect(json['user']['email']).to eq(guest_user.email)
      expect(json['room_type']['name']).to eq('Deluxe Room')
    end
  end

  describe 'POST /api/v1/bookings' do
    let(:valid_attributes) do
      {
        booking: {
          guest_name: 'Alice Johnson',
          guest_count: 2,
          room_type_id: room_type.id,
          check_in: Date.today + 5,
          check_out: Date.today + 7,
          authorize_card: true
        }
      }
    end

    it 'creates a new booking' do
      expect {
        post '/api/v1/bookings', params: valid_attributes, headers: { 'Authorization' => "Bearer #{guest_token}" }
      }.to change(Booking, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['guest_name']).to eq('Alice Johnson')
      expect(json['confirmation']).to be_present
    end

    it 'automatically generates confirmation code' do
      post '/api/v1/bookings', params: valid_attributes, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      expect(json['confirmation']).to match(/^[A-Z0-9]{7}$/)
    end

    it 'calculates price automatically' do
      post '/api/v1/bookings', params: valid_attributes, headers: { 'Authorization' => "Bearer #{guest_token}" }

      json = JSON.parse(response.body)
      # 2 nights * 120 = 240, + 10% tax = 264
      expect(json['price'].to_f).to eq(264.0)
    end

    it 'returns errors with invalid data' do
      post '/api/v1/bookings',
           params: { booking: { guest_name: '' } },
           headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'validates check-out is after check-in' do
      post '/api/v1/bookings',
           params: { booking: valid_attributes[:booking].merge(check_out: Date.today) },
           headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['errors']).to include(match(/check.out/i))
    end
  end

  describe 'PATCH /api/v1/bookings/:id' do
    it 'updates the booking' do
      patch "/api/v1/bookings/#{booking.id}",
            params: { booking: { guest_count: 3 } },
            headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      expect(booking.reload.guest_count).to eq(3)
    end
  end

  describe 'PATCH /api/v1/bookings/:id/check_in' do
    context 'as staff user' do
      it 'checks in the guest' do
        patch "/api/v1/bookings/#{booking.id}/check_in", headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['status']).to eq('Checked In')
        expect(booking.reload.status).to eq('Checked In')
      end
    end

    context 'as guest user' do
      it 'denies access' do
        patch "/api/v1/bookings/#{booking.id}/check_in", headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/bookings/:id/check_out' do
    before { booking.update(status: 'Checked In') }

    context 'as staff user' do
      it 'checks out the guest' do
        patch "/api/v1/bookings/#{booking.id}/check_out", headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['status']).to eq('Departing')
      end
    end

    context 'as guest user' do
      it 'denies access' do
        patch "/api/v1/bookings/#{booking.id}/check_out", headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/bookings/:id/assign_room' do
    context 'as staff user' do
      it 'assigns a room to the booking' do
        patch "/api/v1/bookings/#{booking.id}/assign_room",
              params: { room_id: room.id },
              headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['room']['room_no']).to eq('101')
        expect(booking.reload.room_id).to eq(room.id)
      end
    end

    context 'as guest user' do
      it 'denies access' do
        patch "/api/v1/bookings/#{booking.id}/assign_room",
              params: { room_id: room.id },
              headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/bookings/:id' do
    it 'cancels the booking' do
      delete "/api/v1/bookings/#{booking.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:no_content)
      expect(booking.reload.status).to eq('cancelled')
    end
  end
end
