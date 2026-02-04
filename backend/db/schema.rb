# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_04_202157) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.boolean "authorize_card", default: false
    t.date "check_in", null: false
    t.date "check_out", null: false
    t.string "confirmation", null: false
    t.datetime "created_at", null: false
    t.integer "guest_count", null: false
    t.string "guest_name", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.bigint "room_id"
    t.bigint "room_type_id", null: false
    t.string "status", default: "confirmed", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["check_in", "check_out"], name: "index_bookings_on_check_in_and_check_out"
    t.index ["confirmation"], name: "index_bookings_on_confirmation", unique: true
    t.index ["room_id"], name: "index_bookings_on_room_id"
    t.index ["room_type_id"], name: "index_bookings_on_room_type_id"
    t.index ["status"], name: "index_bookings_on_status"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "room_types", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "image"
    t.integer "max_guests", null: false
    t.string "name", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_room_types_on_name", unique: true
  end

  create_table "rooms", force: :cascade do |t|
    t.json "amenities", default: []
    t.string "bed_type", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "floor_no", null: false
    t.json "images", default: []
    t.decimal "price_per_night", precision: 10, scale: 2, null: false
    t.string "room_no", null: false
    t.bigint "room_type_id", null: false
    t.integer "size", null: false
    t.string "status", default: "available", null: false
    t.datetime "updated_at", null: false
    t.index ["room_no"], name: "index_rooms_on_room_no", unique: true
    t.index ["room_type_id"], name: "index_rooms_on_room_type_id"
    t.index ["status"], name: "index_rooms_on_status"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "role", default: "guest", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "bookings", "room_types"
  add_foreign_key "bookings", "rooms"
  add_foreign_key "bookings", "users"
  add_foreign_key "rooms", "room_types"
end
