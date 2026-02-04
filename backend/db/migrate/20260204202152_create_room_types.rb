class CreateRoomTypes < ActiveRecord::Migration[8.1]
  def change
    create_table :room_types do |t|
      t.string :name, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.integer :max_guests, null: false
      t.string :image
      t.text :description

      t.timestamps
    end
    
    add_index :room_types, :name, unique: true
  end
end
