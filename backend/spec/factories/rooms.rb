FactoryBot.define do
  factory :room do
    room_no { "MyString" }
    room_type { nil }
    bed_type { "MyString" }
    size { 1 }
    description { "MyText" }
    floor_no { 1 }
    price_per_night { "9.99" }
    status { "MyString" }
    amenities { "" }
    images { "" }
  end
end
