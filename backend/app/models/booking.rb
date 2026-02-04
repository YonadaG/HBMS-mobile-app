class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :room_type
  belongs_to :room, optional: true
  
  before_create :generate_confirmation_code
  before_save :calculate_price
  
  validates :guest_name, presence: true
  validates :guest_count, presence: true, numericality: { greater_than: 0, only_integer: true }
  validates :check_in, presence: true
  validates :check_out, presence: true
  validates :status, presence: true, inclusion: { in: %w[confirmed Arriving Checked\ In Departing cancelled] }
  validate :check_out_after_check_in
  validate :room_available_for_dates, if: :room_id_changed?
  
  scope :arriving, -> { where(status: 'Arriving') }
  scope :checked_in, -> { where(status: 'Checked In') }
  scope :departing, -> { where(status: 'Departing') }
  scope :active, -> { where.not(status: 'cancelled') }
  
  def nights
    (check_out - check_in).to_i
  end
  
  def subtotal
    room_type.price * nights
  end
  
  def taxes
    subtotal * 0.10
  end
  
  def total
    subtotal + taxes
  end
  
  private
  
  def generate_confirmation_code
    self.confirmation = loop do
      code = SecureRandom.alphanumeric(7).upcase
      break code unless Booking.exists?(confirmation: code)
    end
  end
  
  def calculate_price
    self.price = total
  end
  
  def check_out_after_check_in
    return if check_out.blank? || check_in.blank?
    
    if check_out <= check_in
      errors.add(:check_out, "must be after check-in date")
    end
  end
  
  def room_available_for_dates
    return unless room
    
    unless room.available_for_dates?(check_in, check_out)
      errors.add(:room, "is not available for the selected dates")
    end
  end
end
