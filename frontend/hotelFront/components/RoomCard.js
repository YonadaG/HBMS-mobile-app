import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const cardBg = '#0f1f31';

export default function RoomCard({ room, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress?.(room)}>
      <Image source={{ uri: room.images[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{room.roomType}</Text>
          <Text style={styles.price}>${room.pricePerNight}</Text>
        </View>
        <Text style={styles.meta}>
          {room.bedType || room.roomType} · {room.size}㎡
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {room.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.details}>Details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    color: textLight,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: textMuted,
    fontSize: 12,
  },
  description: {
    color: textMuted,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  details: {
    color: '#1e6eff',
    fontWeight: '700',
    fontSize: 13,
  },
});


