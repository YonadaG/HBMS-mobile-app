FactoryBot.define do
  factory :room_type do
    name { "MyString" }
    price { "9.99" }
    max_guests { 1 }
    image { "MyString" }
    description { "MyText" }
  end
end
