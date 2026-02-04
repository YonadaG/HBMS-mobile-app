class User < ApplicationRecord
  has_secure_password
  
  has_many :bookings, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :role, presence: true, inclusion: { in: %w[staff guest] }
  
  def staff?
    role == 'staff'
  end
  
  def guest?
    role == 'guest'
  end
end
