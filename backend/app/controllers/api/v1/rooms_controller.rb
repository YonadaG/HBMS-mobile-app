class Api::V1::RoomsController < ApplicationController
  before_action :require_staff, only: [:create, :update, :destroy]
  before_action :set_room, only: [:show, :update, :destroy]

  # GET /api/v1/rooms
  def index
    @rooms = Room.includes(:room_type).all
    
    # Filter by room type
    @rooms = @rooms.by_type(params[:room_type_id]) if params[:room_type_id].present?
    
    # Filter by status
    @rooms = @rooms.where(status: params[:status]) if params[:status].present?
    
    # Filter by floor
    @rooms = @rooms.by_floor(params[:floor_no]) if params[:floor_no].present?
    
    # Search by room number
    @rooms = @rooms.where("room_no ILIKE ?", "%#{params[:search]}%") if params[:search].present?
    
    render json: @rooms.as_json(include: :room_type)
  end

  # GET /api/v1/rooms/available
  def available
    check_in = params[:check_in]&.to_date
    check_out = params[:check_out]&.to_date
    room_type_id = params[:room_type_id]
    
    @rooms = Room.available
    @rooms = @rooms.by_type(room_type_id) if room_type_id.present?
    
    if check_in && check_out
      @rooms = @rooms.select { |room| room.available_for_dates?(check_in, check_out) }
    end
    
    render json: @rooms.as_json(include: :room_type)
  end

  # GET /api/v1/rooms/:id
  def show
    render json: @room.as_json(include: :room_type)
  end

  # POST /api/v1/rooms
  def create
    @room = Room.new(room_params)
    if @room.save
      render json: @room.as_json(include: :room_type), status: :created
    else
      render json: { errors: @room.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/rooms/:id
  def update
    if @room.update(room_params)
      render json: @room.as_json(include: :room_type)
    else
      render json: { errors: @room.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/rooms/:id
  def destroy
    @room.destroy
    head :no_content
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:room_no, :room_type_id, :bed_type, :size, :description, 
                                   :floor_no, :price_per_night, :status, amenities: [], images: [])
  end
end
