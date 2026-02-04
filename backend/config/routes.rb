Rails.application.routes.draw do
  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'
      get 'auth/me', to: 'auth#me'
      
      # Room types routes
      resources :room_types
      
      # Rooms routes
      resources :rooms do
        collection do
          get 'available'
        end
      end
      
      # Bookings routes
      resources :bookings do
        member do
          patch 'check_in'
          patch 'check_out'
          patch 'assign_room'
        end
      end
    end
  end
end
