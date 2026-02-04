class ApplicationController < ActionController::API
  before_action :authorize_request, except: [:not_found]
  
  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: 'Unauthorized' }, status: :unauthorized
    rescue => e
      render json: { errors: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
  
  def require_staff
    unless current_user&.staff?
      render json: { errors: 'Access denied. Staff only.' }, status: :forbidden
    end
  end

  def not_found
    render json: { error: 'not_found' }, status: :not_found
  end
end
