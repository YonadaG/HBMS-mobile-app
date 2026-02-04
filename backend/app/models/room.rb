class Room < ApplicationRecord
  belongs_to :room_type
  has_many :bookings, dependent: :restrict_with_error
  
  validates :room_no, presence: true, uniqueness: true
  validates :bed_type, presence: true
  validates :size, presence: true, numericality: { greater_than: 0 }
  validates :floor_no, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :price_per_night, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true, inclusion: { in: %w[available booked maintenance] }
  
  scope :available, -> { where(status: 'available') }
  scope :by_type, ->(type_id) { where(room_type_id: type_id) }
  scope :by_floor, ->(floor) { where(floor_no: floor) }
  
  def available_for_dates?(check_in, check_out)
    return false unless status == 'available'
    
    conflicting_bookings = bookings.where(
      "(check_in <= ? AND check_out >= ?) OR (check_in <= ? AND check_out >= ?)",
      check_out, check_in, check_in, check_out
    ).where.not(status: 'cancelled')
    
    conflicting_bookings.empty?
  end
end
