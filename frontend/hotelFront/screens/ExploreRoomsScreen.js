import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RoomCard from '../components/RoomCard';
import { useHotel } from '../context/HotelContext';
import { Ionicons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const accent = '#1e6eff';

const filters = ['All Rooms', 'Suites', 'King Bed', 'Family'];

export default function ExploreRoomsScreen({ navigation }) {
  const { rooms } = useHotel();
  const [active, setActive] = useState('All Rooms');

  const filtered = useMemo(() => {
    switch (active) {
      case 'Suites':
        return rooms.filter((r) => r.roomType.toLowerCase().includes('suite'));
      case 'King Bed':
        return rooms.filter((r) => (r.bedType || '').toLowerCase().includes('king'));
      case 'Family':
        return rooms.filter((r) => r.roomType.toLowerCase().includes('family'));
      default:
        return rooms;
    }
  }, [active]);

  const handleOpen = (room) => {
    navigation.navigate('RoomDetail', { room });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={textLight} />
          </TouchableOpacity>
          <Text style={styles.title}>Explore Rooms</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.filters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, active === f && styles.filterChipActive]}
              onPress={() => setActive(f)}
            >
              <Text style={[styles.filterText, active === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.list}>
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} onPress={handleOpen} />
          ))}
          {!filtered.length && (
            <Text style={styles.empty}>No rooms found for this filter.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 45,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a2a3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: textLight,
    fontSize: 20,
    fontWeight: '800',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#233348',
  },
  filterChipActive: {
    backgroundColor: accent,
    borderColor: accent,
  },
  filterText: {
    color: textMuted,
    fontWeight: '700',
    fontSize: 13,
  },
  filterTextActive: {
    color: textLight,
  },
  list: {
    gap: 0,
  },
  empty: {
    color: textMuted,
    textAlign: 'center',
    paddingVertical: 32,
  },
});


