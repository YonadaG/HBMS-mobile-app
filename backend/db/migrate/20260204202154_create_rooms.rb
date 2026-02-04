class CreateRooms < ActiveRecord::Migration[8.1]
  def change
    create_table :rooms do |t|
      t.string :room_no, null: false
      t.references :room_type, null: false, foreign_key: true
      t.string :bed_type, null: false
      t.integer :size, null: false
      t.text :description
      t.integer :floor_no, null: false
      t.decimal :price_per_night, precision: 10, scale: 2, null: false
      t.string :status, null: false, default: 'available'
      t.json :amenities, default: []
      t.json :images, default: []

      t.timestamps
    end
    
    add_index :rooms, :room_no, unique: true
    add_index :rooms, :status
  end
end
