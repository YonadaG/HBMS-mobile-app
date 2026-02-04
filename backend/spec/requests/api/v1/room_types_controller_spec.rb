require 'rails_helper'

RSpec.describe Api::V1::RoomTypesController, type: :request do
  let(:staff_user) { User.create!(email: 'staff@test.com', password: 'password123', name: 'Staff', role: 'staff') }
  let(:guest_user) { User.create!(email: 'guest@test.com', password: 'password123', name: 'Guest', role: 'guest') }
  let(:staff_token) { JsonWebToken.encode(user_id: staff_user.id) }
  let(:guest_token) { JsonWebToken.encode(user_id: guest_user.id) }
  
  let!(:room_type) do
    RoomType.create!(
      name: 'Deluxe Room',
      price: 120.00,
      max_guests: 2,
      description: 'A comfortable deluxe room'
    )
  end

  describe 'GET /api/v1/room_types' do
    it 'returns all room types' do
      get '/api/v1/room_types', headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
      expect(json[0]['name']).to eq('Deluxe Room')
      expect(json[0]['price']).to eq('120.0')
    end

    it 'requires authentication' do
      get '/api/v1/room_types'

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET /api/v1/room_types/:id' do
    it 'returns a specific room type' do
      get "/api/v1/room_types/#{room_type.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['name']).to eq('Deluxe Room')
      expect(json['max_guests']).to eq(2)
    end
  end

  describe 'POST /api/v1/room_types' do
    let(:valid_attributes) do
      {
        room_type: {
          name: 'Executive Suite',
          price: 250.00,
          max_guests: 3,
          description: 'Luxury suite'
        }
      }
    end

    context 'as staff user' do
      it 'creates a new room type' do
        expect {
          post '/api/v1/room_types', params: valid_attributes, headers: { 'Authorization' => "Bearer #{staff_token}" }
        }.to change(RoomType, :count).by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json['name']).to eq('Executive Suite')
      end

      it 'returns errors with invalid data' do
        post '/api/v1/room_types', 
             params: { room_type: { name: '' } }, 
             headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['errors']).to be_present
      end
    end

    context 'as guest user' do
      it 'denies access' do
        post '/api/v1/room_types', params: valid_attributes, headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH /api/v1/room_types/:id' do
    context 'as staff user' do
      it 'updates the room type' do
        patch "/api/v1/room_types/#{room_type.id}",
              params: { room_type: { price: 150.00 } },
              headers: { 'Authorization' => "Bearer #{staff_token}" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['price']).to eq('150.0')
        expect(room_type.reload.price).to eq(150.00)
      end
    end

    context 'as guest user' do
      it 'denies access' do
        patch "/api/v1/room_types/#{room_type.id}",
              params: { room_type: { price: 150.00 } },
              headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE /api/v1/room_types/:id' do
    context 'as staff user' do
      it 'deletes the room type' do
        expect {
          delete "/api/v1/room_types/#{room_type.id}", headers: { 'Authorization' => "Bearer #{staff_token}" }
        }.to change(RoomType, :count).by(-1)

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'as guest user' do
      it 'denies access' do
        delete "/api/v1/room_types/#{room_type.id}", headers: { 'Authorization' => "Bearer #{guest_token}" }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
