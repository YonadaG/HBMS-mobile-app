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

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const accent = '#1e6eff';

const mockBookings = [
  {
    id: 'b1',
    status: 'CONFIRMED',
    title: 'Deluxe King Suite',
    dates: 'Nov 12 - Nov 15 • 3 Nights',
    price: '$450.00',
    perks: ['Free WiFi', 'Ocean View'],
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'b2',
    status: 'PENDING',
    title: 'Twin Room',
    dates: 'Dec 01 - Dec 03 • 2 Nights',
    price: '$200.00',
    perks: ['Breakfast', 'Late Checkout'],
    image:
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function ManageBookingScreen({ navigation }) {
  return (
    <View style={styles.safe}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color={textLight} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Bookings</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="options-outline" size={22} color={textLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <View style={[styles.tab, styles.tabActive]}>
          <Text style={styles.tabTextActive}>Upcoming</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>History</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {mockBookings.map((b) => (
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
        ))}

        <View style={styles.summary}>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={20} color={textLight} />
            <Text style={styles.addText}>Add Another Room</Text>
          </TouchableOpacity>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal (2 Rooms)</Text>
            <Text style={styles.summaryValue}>$650.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>$650.00</Text>
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
    paddingTop: 18,
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
});


