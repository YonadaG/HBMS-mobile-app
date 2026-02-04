require 'rails_helper'

RSpec.describe Api::V1::AuthController, type: :request do
  let(:valid_user_attributes) do
    {
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      name: 'Test User',
      role: 'guest'
    }
  end

  describe 'POST /api/v1/auth/register' do
    context 'with valid parameters' do
      it 'creates a new user and returns a token' do
        post '/api/v1/auth/register', params: valid_user_attributes

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json['token']).to be_present
        expect(json['user']['email']).to eq('test@example.com')
        expect(json['user']['name']).to eq('Test User')
        expect(json['user']['role']).to eq('guest')
      end

      it 'creates a user in the database' do
        expect {
          post '/api/v1/auth/register', params: valid_user_attributes
        }.to change(User, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'returns errors when email is missing' do
        post '/api/v1/auth/register', params: valid_user_attributes.except(:email)

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['errors']).to be_present
      end

      it 'returns errors when password is too short' do
        post '/api/v1/auth/register', params: valid_user_attributes.merge(password: '123')

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['errors']).to be_present
      end

      it 'returns errors when email is already taken' do
        User.create!(valid_user_attributes)
        post '/api/v1/auth/register', params: valid_user_attributes

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['errors']).to include(match(/email/i))
      end

      it 'returns errors when passwords do not match' do
        post '/api/v1/auth/register', params: valid_user_attributes.merge(password_confirmation: 'different')

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['errors']).to be_present
      end
    end
  end

  describe 'POST /api/v1/auth/login' do
    let!(:user) { User.create!(valid_user_attributes) }

    context 'with valid credentials' do
      it 'returns a token and user data' do
        post '/api/v1/auth/login', params: { email: user.email, password: 'password123' }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['token']).to be_present
        expect(json['user']['email']).to eq(user.email)
        expect(json['user']['name']).to eq(user.name)
      end

      it 'returns a valid JWT token' do
        post '/api/v1/auth/login', params: { email: user.email, password: 'password123' }

        json = JSON.parse(response.body)
        decoded = JsonWebToken.decode(json['token'])
        expect(decoded['user_id']).to eq(user.id)
      end
    end

    context 'with invalid credentials' do
      it 'returns unauthorized when email does not exist' do
        post '/api/v1/auth/login', params: { email: 'wrong@example.com', password: 'password123' }

        expect(response).to have_http_status(:unauthorized)
        json = JSON.parse(response.body)
        expect(json['errors']).to include('Invalid email or password')
      end

      it 'returns unauthorized when password is incorrect' do
        post '/api/v1/auth/login', params: { email: user.email, password: 'wrongpassword' }

        expect(response).to have_http_status(:unauthorized)
        json = JSON.parse(response.body)
        expect(json['errors']).to include('Invalid email or password')
      end
    end
  end

  describe 'GET /api/v1/auth/me' do
    let!(:user) { User.create!(valid_user_attributes) }
    let(:token) { JsonWebToken.encode(user_id: user.id) }

    context 'with valid token' do
      it 'returns current user data' do
        get '/api/v1/auth/me', headers: { 'Authorization' => "Bearer #{token}" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['email']).to eq(user.email)
        expect(json['name']).to eq(user.name)
        expect(json['role']).to eq(user.role)
      end
    end

    context 'without token' do
      it 'returns unauthorized' do
        get '/api/v1/auth/me'

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid token' do
      it 'returns unauthorized' do
        get '/api/v1/auth/me', headers: { 'Authorization' => 'Bearer invalid_token' }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
