class Api::V1::AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:login, :register]

  # POST /api/v1/auth/register
  def register
    user = User.new(user_params)
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user_response(user) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/auth/login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: user_response(user) }, status: :ok
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  # GET /api/v1/auth/me
  def me
    render json: user_response(current_user), status: :ok
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :name, :role)
  end

  def user_response(user)
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at
    }
  end
end
