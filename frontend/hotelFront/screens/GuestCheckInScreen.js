import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const success = '#10b981';

export default function GuestCheckInScreen({ route, navigation }) {
  const booking = route?.params?.booking;

  const guestName = booking?.guestName ?? 'Eleanor Vance';
  const roomType = booking?.roomType ?? 'Standard Queen';
  const guestCount = booking?.guestCount ?? 2;
  const arrivalLabel = 'Arrival: Today';

  const [roomQuery, setRoomQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('304');
  const [passportId, setPassportId] = useState('');
  const [authorize, setAuthorize] = useState(true);

  const rooms = useMemo(
    () => [
      { id: '304', type: 'Queen', badge: 'Vacant & Clean', available: true },
      { id: '308', type: 'Queen', badge: '', available: true },
      { id: 'B145', type: 'Suite', badge: '', available: true },
      { id: '312', type: 'Queen', badge: '', available: true },
      { id: '315', type: 'Queen', badge: '', available: true },
    ],
    []
  );

  const filteredRooms = useMemo(() => {
    const q = roomQuery.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter((r) => r.id.toLowerCase().includes(q));
  }, [roomQuery, rooms]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guest Check-In</Text>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={textLight} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.guestCard}>
          <View style={styles.guestAvatar}>
            <Text style={styles.guestAvatarText}>{guestName.split(' ').map((s) => s[0]).slice(0, 2).join('')}</Text>
          </View>
          <View style={styles.guestInfo}>
            <Text style={styles.guestName}>{guestName}</Text>
            <Text style={styles.guestMeta}>
              {roomType} • {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
            </Text>
            <View style={styles.arrivalPill}>
              <Text style={styles.arrivalPillText}>{arrivalLabel}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Room Assignment</Text>
        <View style={styles.roomAssignmentCard}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={18} color={textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Find room (e.g. B145)"
              placeholderTextColor={textMuted}
              value={roomQuery}
              onChangeText={setRoomQuery}
            />
          </View>

          <View style={styles.availRow}>
            <Text style={styles.availText}>AVAILABLE: VACANT & CLEAN</Text>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterText}>Filter</Text>
              <Ionicons name="filter" size={14} color={accent} />
            </TouchableOpacity>
          </View>

          <View style={styles.roomGrid}>
            {filteredRooms.map((r) => {
              const active = selectedRoom === r.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  style={[styles.roomTile, active && styles.roomTileActive]}
                  onPress={() => setSelectedRoom(r.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.roomTileTop}>
                    {active ? (
                      <View style={styles.roomSelectedDot}>
                        <Ionicons name="checkmark" size={12} color={textLight} />
                      </View>
                    ) : (
                      <View style={styles.roomEmptyDot} />
                    )}
                    <Text style={[styles.roomId, active && styles.roomIdActive]}>{r.id}</Text>
                  </View>
                  <Text style={[styles.roomType, active && styles.roomTypeActive]}>{r.type}</Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={[styles.roomTile, styles.roomTileGhost]} activeOpacity={0.85}>
              <Text style={styles.roomId}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.roomStatusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.roomStatusText}>Room {selectedRoom} is Vacant & Clean</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Verification</Text>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Passport Number or National ID</Text>
          <View style={styles.fieldRow}>
            <Ionicons name="card-outline" size={18} color={textMuted} />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter ID number"
              placeholderTextColor={textMuted}
              value={passportId}
              onChangeText={setPassportId}
            />
            <TouchableOpacity style={styles.scanBtn}>
              <Ionicons name="scan-outline" size={18} color={accent} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Guest Signature</Text>
          <TouchableOpacity style={styles.signatureBox} activeOpacity={0.85}>
            <Ionicons name="brush" size={18} color={textMuted} />
            <Text style={styles.signatureText}>Tap to sign registration card</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.card}>
          <View style={styles.lineItem}>
            <Text style={styles.lineItemLabel}>Room Total (4 Nights)</Text>
            <Text style={styles.lineItemValue}>$580.00</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineItemLabel}>Taxes & Fees</Text>
            <Text style={styles.lineItemValue}>$84.50</Text>
          </View>
          <View style={styles.lineItem}>
            <Text style={styles.lineItemLabel}>Deposit Paid</Text>
            <Text style={[styles.lineItemValue, { color: success }]}>-$200.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Balance Due</Text>
            <Text style={styles.balanceValue}>$464.50</Text>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAuthorize((v) => !v)}
            activeOpacity={0.85}
          >
            <View style={[styles.checkbox, authorize && styles.checkboxActive]}>
              {authorize && <Ionicons name="checkmark" size={14} color={textLight} />}
            </View>
            <Text style={styles.checkboxText}>Authorize Card for Incidentals</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
          <Ionicons name="key" size={18} color={textLight} />
          <Text style={styles.primaryBtnText}>Complete Check-In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: primaryBg,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: textLight,
    fontSize: 16,
    fontWeight: '800',
  },
  scroll: {
    padding: 16,
    paddingBottom: 140,
  },
  guestCard: {
    flexDirection: 'row',
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#152437',
    marginBottom: 14,
  },
  guestAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guestAvatarText: {
    color: textLight,
    fontWeight: '800',
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    color: textLight,
    fontSize: 16,
    fontWeight: '800',
  },
  guestMeta: {
    color: textMuted,
    fontSize: 12,
    marginTop: 3,
  },
  arrivalPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 110, 255, 0.16)',
    marginTop: 8,
  },
  arrivalPillText: {
    color: accent,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    color: textLight,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 10,
  },
  roomAssignmentCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#152437',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0b192a',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#1a2a3a',
  },
  searchInput: {
    flex: 1,
    color: textLight,
    fontSize: 13,
  },
  availRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 10,
  },
  availText: {
    color: textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    color: accent,
    fontWeight: '700',
    fontSize: 12,
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  roomTile: {
    width: '31%',
    backgroundColor: '#0b192a',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1a2a3a',
    minHeight: 64,
  },
  roomTileActive: {
    borderColor: accent,
    backgroundColor: 'rgba(30, 110, 255, 0.10)',
  },
  roomTileGhost: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomTileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomEmptyDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#314159',
  },
  roomSelectedDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomId: {
    color: textLight,
    fontWeight: '800',
    fontSize: 14,
  },
  roomIdActive: {
    color: textLight,
  },
  roomType: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  roomTypeActive: {
    color: textLight,
  },
  roomStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: success,
  },
  roomStatusText: {
    color: success,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#152437',
  },
  fieldLabel: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0b192a',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#1a2a3a',
  },
  fieldInput: {
    flex: 1,
    color: textLight,
    fontSize: 13,
  },
  scanBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 110, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureBox: {
    height: 92,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2a3a4a',
    backgroundColor: '#0b192a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signatureText: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lineItemLabel: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  lineItemValue: {
    color: textLight,
    fontSize: 12,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#1a2a3a',
    marginVertical: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  balanceLabel: {
    color: textLight,
    fontSize: 14,
    fontWeight: '800',
  },
  balanceValue: {
    color: textLight,
    fontSize: 14,
    fontWeight: '800',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0b192a',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1a2a3a',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#32445b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: accent,
    borderColor: accent,
  },
  checkboxText: {
    color: textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: primaryBg,
    borderTopWidth: 1,
    borderTopColor: '#13233a',
  },
  primaryBtn: {
    height: 54,
    borderRadius: 14,
    backgroundColor: accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryBtnText: {
    color: textLight,
    fontSize: 14,
    fontWeight: '800',
  },
});
