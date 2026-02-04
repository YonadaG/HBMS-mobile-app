class Api::V1::BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update, :destroy, :check_in, :check_out, :assign_room]

  # GET /api/v1/bookings
  def index
    @bookings = current_user.staff? ? Booking.all : current_user.bookings
    @bookings = @bookings.includes(:user, :room_type, :room)
    
    # Filter by status
    @bookings = @bookings.where(status: params[:status]) if params[:status].present?
    
    # Search by guest name or confirmation
    if params[:search].present?
      @bookings = @bookings.where("guest_name ILIKE ? OR confirmation ILIKE ?", 
                                    "%#{params[:search]}%", "%#{params[:search]}%")
    end
    
    # Filter by dates
    @bookings = @bookings.where("check_in >= ?", params[:check_in]) if params[:check_in].present?
    @bookings = @bookings.where("check_out <= ?", params[:check_out]) if params[:check_out].present?
    
    render json: @bookings.as_json(include: [:user, :room_type, :room])
  end

  # GET /api/v1/bookings/:id
  def show
    render json: @booking.as_json(include: [:user, :room_type, :room])
  end

  # POST /api/v1/bookings
  def create
    @booking = current_user.bookings.new(booking_params)
    if @booking.save
      render json: @booking.as_json(include: [:user, :room_type, :room]), status: :created
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/bookings/:id
  def update
    if @booking.update(booking_params)
      render json: @booking.as_json(include: [:user, :room_type, :room])
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/bookings/:id/check_in
  def check_in
    return render json: { errors: ['Staff only'] }, status: :forbidden unless current_user.staff?
    
    if @booking.update(status: 'Checked In')
      render json: @booking.as_json(include: [:user, :room_type, :room])
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/bookings/:id/check_out
  def check_out
    return render json: { errors: ['Staff only'] }, status: :forbidden unless current_user.staff?
    
    if @booking.update(status: 'Departing')
      render json: @booking.as_json(include: [:user, :room_type, :room])
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/bookings/:id/assign_room
  def assign_room
    return render json: { errors: ['Staff only'] }, status: :forbidden unless current_user.staff?
    
    room = Room.find_by(id: params[:room_id])
    if room && @booking.update(room: room)
      render json: @booking.as_json(include: [:user, :room_type, :room])
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/bookings/:id
  def destroy
    @booking.update(status: 'cancelled')
    head :no_content
  end

  private

  def set_booking
    @booking = current_user.staff? ? Booking.find(params[:id]) : current_user.bookings.find(params[:id])
  end

  def booking_params
    params.require(:booking).permit(:guest_name, :guest_count, :room_type_id, :room_id, 
                                     :check_in, :check_out, :status, :authorize_card)
  end
end
