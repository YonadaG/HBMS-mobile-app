import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useHotel } from '../context/HotelContext';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const accent = '#1e6eff';

export default function ManageBookingScreen({ navigation }) {
  const { bookings, roomTypes } = useHotel();

  // Enrich bookings with room details
  const myBookings = bookings.map(b => {
    const rt = roomTypes.find(type => type.name === b.roomType) || roomTypes[0];
    return {
      ...b,
      title: b.roomType,
      image: rt.image,
      dates: `${b.checkIn} - ${b.checkOut}`,
      priceValue: b.price, // Store numeric for calc
      price: `$${b.price}`,
      perks: ['Free Cancellation', 'Breakfast Included'], // Mock perks
    };
  });
  return (
    <View style={styles.safe}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={textLight} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Bookings</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {myBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={textMuted} />
            <Text style={styles.emptyText}>No booked room</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => navigation.navigate('ExploreRooms')}
            >
              <Text style={styles.bookButtonText}>Book a Room</Text>
            </TouchableOpacity>
          </View>
        ) : (
          myBookings.map((b) => (
            <View key={b.id} style={styles.card}>
              <Image source={{ uri: b.image }} style={styles.image} />
              <View style={styles.badgeWrapper}>
                <View style={[styles.badge, b.status === 'CONFIRMED' ? styles.badgeGreen : styles.badgeYellow]}>
                  <Text style={styles.badgeText}>{b.status}</Text>
                </View>
              </View>
              <View style={styles.body}>
                <Text style={styles.cardTitle}>{b.title}</Text>
                <View style={styles.row}>
                  <Ionicons name="calendar" size={16} color={textMuted} />
                  <Text style={styles.meta}>{b.dates}</Text>
                </View>
                <View style={styles.perks}>
                  {b.perks.map((p) => (
                    <View key={p} style={styles.perk}>
                      <Ionicons name="checkmark-circle" size={14} color={accent} />
                      <Text style={styles.perkText}>{p}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.footer}>
                  <View>
                    <Text style={styles.label}>Price per room</Text>
                    <Text style={styles.price}>{b.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.removeBtn}>
                    <Ionicons name="trash-outline" size={16} color="#f87171" />
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={styles.summary}>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={20} color={textLight} />
            <Text style={styles.addText}>Add Another Room</Text>
          </TouchableOpacity>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({myBookings.length} Rooms)</Text>
            <Text style={styles.summaryValue}>
              ${myBookings.reduce((sum, b) => sum + b.priceValue, 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & Fees (10%)</Text>
            <Text style={styles.summaryValue}>
              ${(myBookings.reduce((sum, b) => sum + b.priceValue, 0) * 0.10).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>
              ${(myBookings.reduce((sum, b) => sum + b.priceValue, 0) * 1.10).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111d2c',
  },
  title: {
    color: textLight,
    fontSize: 20,
    fontWeight: '800',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#0e1a28',
    borderRadius: 14,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#121f31',
  },
  tabText: {
    color: textMuted,
    fontWeight: '700',
  },
  tabTextActive: {
    color: textLight,
    fontWeight: '800',
  },
  scroll: {
    paddingHorizontal: 14,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    backgroundColor: cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#14253a',
  },
  image: {
    width: '100%',
    height: 200,
  },
  badgeWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeGreen: {
    backgroundColor: '#22c55e33',
  },
  badgeYellow: {
    backgroundColor: '#facc1533',
  },
  badgeText: {
    color: textLight,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  body: {
    padding: 12,
    gap: 10,
  },
  cardTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meta: {
    color: textMuted,
    fontSize: 13,
  },
  perks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  perk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#112034',
    borderRadius: 10,
  },
  perkText: {
    color: textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: textMuted,
    fontSize: 12,
  },
  price: {
    color: textLight,
    fontSize: 20,
    fontWeight: '800',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#2a1a1a',
    borderRadius: 12,
  },
  removeText: {
    color: '#f87171',
    fontWeight: '700',
  },
  summary: {
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#14253a',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  addText: {
    color: textLight,
    fontSize: 14,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: textMuted,
    fontSize: 13,
  },
  summaryValue: {
    color: textLight,
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: textLight,
    fontSize: 22,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyText: {
    color: textMuted,
    fontSize: 18,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  bookButtonText: {
    color: textLight,
    fontSize: 15,
    fontWeight: '700',
  },
});


