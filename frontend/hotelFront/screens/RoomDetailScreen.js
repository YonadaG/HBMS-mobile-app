import React, { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AmenityPill from '../components/AmenityPill';

const primaryBg = '#0b1420';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const accent = '#1e6eff';
const cardBg = '#0f1f31';

export default function RoomDetailScreen({ route, navigation }) {
  const room = route.params?.room;
  const [checkIn, setCheckIn] = useState(() => new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  });
  const [pickerState, setPickerState] = useState({ visible: false, mode: 'checkin' });

  const checkInLabel = useMemo(() => formatDate(checkIn), [checkIn]);
  const checkOutLabel = useMemo(() => formatDate(checkOut), [checkOut]);

  if (!room) {
    return (
      <View style={styles.safe}>
        <Text style={{ color: textLight, padding: 16 }}>Room not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {room.images.map((uri, idx) => (
              <Image key={uri + idx} source={{ uri }} style={styles.heroImage} />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{room.roomType}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="business-outline" size={16} color={textMuted} />
            <Text style={styles.metaText}>{room.floorNo}th Floor</Text>
            <Ionicons name="apps" size={16} color={textMuted} />
            <Text style={styles.metaText}>{room.size}㎡</Text>
          </View>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenities}>
            {room.amenities.map((a) => (
              <AmenityPill key={a} label={a} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>About this room</Text>
          <Text style={styles.description}>{room.description}</Text>

          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.dateRow}>
            <TouchableOpacity style={styles.dateBox} onPress={() => setPickerState({ visible: true, mode: 'checkin' })}>
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>{checkInLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateBox} onPress={() => setPickerState({ visible: true, mode: 'checkout' })}>
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>{checkOutLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaBar}>
        <View>
          <Text style={styles.price}>${room.pricePerNight}</Text>
          <Text style={styles.free}>Free cancellation</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {pickerState.visible && (
        <DateTimePicker
          value={pickerState.mode === 'checkin' ? checkIn : checkOut}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (event.type === 'dismissed') {
              setPickerState({ visible: false, mode: pickerState.mode });
              return;
            }
            const picked = date || new Date();
            if (pickerState.mode === 'checkin') {
              setCheckIn(picked);
              // Ensure checkout is after checkin
              if (picked >= checkOut) {
                const next = new Date(picked);
                next.setDate(next.getDate() + 1);
                setCheckOut(next);
              }
            } else {
              if (picked <= checkIn) {
                const next = new Date(checkIn);
                next.setDate(next.getDate() + 1);
                setCheckOut(next);
              } else {
                setCheckOut(picked);
              }
            }
            setPickerState({ visible: false, mode: pickerState.mode });
          }}
        />
      )}
    </View>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  scroll: {
    paddingBottom: 140,
  },
  hero: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 320,
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: textLight,
    fontSize: 26,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: textMuted,
    fontSize: 13,
  },
  sectionTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  description: {
    color: textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateBox: {
    flex: 1,
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  dateLabel: {
    color: textMuted,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  dateValue: {
    color: textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: cardBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#14253a',
  },
  price: {
    color: textLight,
    fontSize: 20,
    fontWeight: '800',
  },
  free: {
    color: '#4ade80',
    fontSize: 12,
  },
  bookBtn: {
    backgroundColor: accent,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bookText: {
    color: textLight,
    fontWeight: '800',
    fontSize: 15,
  },
});

