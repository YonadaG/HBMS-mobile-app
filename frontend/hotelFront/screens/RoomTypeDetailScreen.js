import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const accent = '#1e6eff';
const success = '#10b981';

export default function RoomTypeDetailScreen({ route, navigation }) {
  const roomType = route.params?.roomType;
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const heroWidth = Math.max(0, width - 36);

  const total = roomType?.images?.length || 0;

  const pageLabel = useMemo(() => {
    if (!total) return '';
    return `${index + 1}/${total}`;
  }, [index, total]);

  if (!roomType) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 18 }}>
          <Text style={{ color: textLight }}>Room type not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{roomType.name}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => {}}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const w = e.nativeEvent.layoutMeasurement.width;
              const x = e.nativeEvent.contentOffset.x;
              const i = Math.round(x / Math.max(1, w));
              setIndex(i);
            }}
            scrollEventThrottle={16}
          >
            {(roomType.images || []).map((uri, i) => (
              <Image
                key={`${uri}-${i}`}
                source={{ uri }}
                style={[styles.heroImage, { width: heroWidth }]}
              />
            ))}
          </ScrollView>

          {total ? (
            <View style={styles.pagePill}>
              <Text style={styles.pageText}>{pageLabel}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.smallLabel}>Price per night</Text>
              <View style={styles.priceLine}>
                <Text style={styles.price}>${roomType.price}</Text>
                <Text style={styles.usd}>USD</Text>
              </View>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{roomType.status || 'Active'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Occupancy</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="people-outline" size={16} color={textMuted} />
                <Text style={styles.statValue}>Up to {roomType.guests}</Text>
              </View>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>Size</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="resize-outline" size={16} color={textMuted} />
                <Text style={styles.statValue}>{roomType.size || '-'}</Text>
              </View>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>Bed Type</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="bed-outline" size={16} color={textMuted} />
                <Text style={styles.statValue}>{roomType.bedType || '-'}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About this room</Text>
        <Text style={styles.body}>{roomType.description || ''}</Text>

        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.chipsWrap}>
          {(roomType.amenities || []).map((a) => (
            <View key={a.id || a.label} style={styles.chip}>
              <Ionicons name={a.icon || 'checkbox-outline'} size={16} color={accent} />
              <Text style={styles.chipText}>{a.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.roomNumbersHeader}>
          <Text style={styles.sectionTitle}>Room Numbers</Text>
          <View style={styles.totalPill}>
            <Text style={styles.totalText}>{(roomType.roomNumbers || []).length} Total</Text>
          </View>
        </View>

        <View style={styles.roomsGrid}>
          {(roomType.roomNumbers || []).map((n) => (
            <View key={n} style={styles.roomTile}>
              <Text style={styles.roomTileText}>{n}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.roomTileAdd} onPress={() => {}}>
            <Ionicons name="add" size={18} color={textMuted} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cardBg,
  },
  headerTitle: {
    color: textLight,
    fontSize: 16,
    fontWeight: '800',
    maxWidth: '65%',
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  editText: {
    color: accent,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  heroWrap: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  heroImage: {
    height: 220,
    borderRadius: 18,
  },
  pagePill: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pageText: {
    color: textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryCard: {
    marginTop: 14,
    backgroundColor: cardBg,
    borderRadius: 18,
    padding: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallLabel: {
    color: textMuted,
    fontSize: 12,
    marginBottom: 6,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  price: {
    color: textLight,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
  },
  usd: {
    color: textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  statusPill: {
    backgroundColor: 'rgba(16,185,129,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    color: success,
    fontSize: 12,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    gap: 6,
  },
  statLabel: {
    color: textMuted,
    fontSize: 12,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: textLight,
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    color: textLight,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 10,
  },
  body: {
    color: textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: cardBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: '48%',
  },
  chipText: {
    color: textLight,
    fontSize: 13,
    fontWeight: '800',
    flexShrink: 1,
  },
  roomNumbersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalPill: {
    backgroundColor: cardBg,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  totalText: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  roomTile: {
    width: '22%',
    backgroundColor: cardBg,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomTileText: {
    color: textLight,
    fontWeight: '900',
  },
  roomTileAdd: {
    width: '22%',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.18)',
  },
});
