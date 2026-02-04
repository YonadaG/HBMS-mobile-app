class RoomType < ApplicationRecord
  has_many :rooms, dependent: :destroy
  has_many :bookings, dependent: :restrict_with_error
  
  validates :name, presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :max_guests, presence: true, numericality: { greater_than: 0, only_integer: true }
end
