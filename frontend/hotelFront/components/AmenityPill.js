import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const cardBg = '#0f1f31';
const accent = '#1e6eff';

const iconMap = {
  WiFi: 'wifi',
  'Wi-Fi': 'wifi',
  'A/C': 'snow-outline',
  'King Bed': 'bed',
  'Queen Bed': 'bed',
  Bathtub: 'water',
  Balcony: 'golf',
  Desk: 'briefcase',
  Lounge: 'wine',
  Ironing: 'shirt',
  Transport: 'car',
  Coffee: 'cafe',
};

export default function AmenityPill({ label }) {
  const icon = iconMap[label] || 'ellipse';
  return (
    <View style={styles.pill}>
      <Ionicons name={icon} size={16} color={accent} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cardBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  label: {
    color: textLight,
    fontSize: 13,
    fontWeight: '600',
  },
});


