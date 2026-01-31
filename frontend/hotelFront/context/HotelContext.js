import React, { createContext, useState, useContext } from 'react';
import { roomTypes as initialRoomTypes, rooms as initialRooms } from '../data';

const HotelContext = createContext();

export const useHotel = () => useContext(HotelContext);

// Consolidated Initial Data
const initialBookings = [
    {
        id: '1',
        guestName: 'Eleanor Vance',
        guestCount: 2,
        confirmation: 'B082957',
        roomType: 'Executive Suite',
        roomId: null, // Not assigned yet
        checkIn: '2024-08-14',
        checkOut: '2024-08-18',
        status: 'Arriving',
        price: 1200,
    },
    {
        id: '2',
        guestName: 'Thomas Shelby',
        guestCount: 1,
        confirmation: 'C193764',
        roomType: 'Deluxe Room',
        roomId: '305',
        checkIn: '2024-08-15',
        checkOut: '2024-08-20',
        status: 'Checked In',
        price: 850,
    },
    {
        id: '3',
        guestName: 'Olivia Parker',
        guestCount: 3,
        confirmation: 'D204857',
        roomType: 'Family Room',
        roomId: null,
        checkIn: '2024-08-16',
        checkOut: '2024-08-19',
        status: 'Departing',
        price: 600,
    },
];

export const HotelProvider = ({ children }) => {
    // State
    const [user, setUser] = useState({ name: 'Sarah', role: 'staff' });
    const [bookings, setBookings] = useState(initialBookings);
    const [rooms, setRooms] = useState(initialRooms);
    const [roomTypes] = useState(initialRoomTypes);

    // Actions
    const addBooking = (newBooking) => {
        setBookings((prev) => [
            ...prev,
            { ...newBooking, id: Math.random().toString(36).substr(2, 9), status: 'confirmed' },
        ]);
    };

    const updateBookingStatus = (id, status, assignedRoomId = null) => {
        setBookings((prev) =>
            prev.map((b) =>
                b.id === id ? { ...b, status, roomId: assignedRoomId || b.roomId } : b
            )
        );
    };

    const getAvailableRooms = (type) => {
        // Simple filter: match type and check if not occupied (mock logic)
        return rooms.filter(r => r.roomType === type && r.status === 'available');
    };

    const value = {
        user,
        setUser,
        bookings,
        rooms,
        roomTypes,
        addBooking,
        updateBookingStatus,
        getAvailableRooms
    };

    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
};
