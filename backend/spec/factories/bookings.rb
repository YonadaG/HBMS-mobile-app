FactoryBot.define do
  factory :booking do
    user { nil }
    guest_name { "MyString" }
    guest_count { 1 }
    confirmation { "MyString" }
    room_type { nil }
    room { nil }
    check_in { "2026-02-04" }
    check_out { "2026-02-04" }
    status { "MyString" }
    price { "9.99" }
    authorize_card { false }
  end
end
