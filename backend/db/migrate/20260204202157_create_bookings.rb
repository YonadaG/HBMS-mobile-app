class CreateBookings < ActiveRecord::Migration[8.1]
  def change
    create_table :bookings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :guest_name, null: false
      t.integer :guest_count, null: false
      t.string :confirmation, null: false
      t.references :room_type, null: false, foreign_key: true
      t.references :room, null: true, foreign_key: true
      t.date :check_in, null: false
      t.date :check_out, null: false
      t.string :status, null: false, default: 'confirmed'
      t.decimal :price, precision: 10, scale: 2, null: false
      t.boolean :authorize_card, default: false

      t.timestamps
    end
    
    add_index :bookings, :confirmation, unique: true
    add_index :bookings, [:check_in, :check_out]
    add_index :bookings, :status
  end
end
