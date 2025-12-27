// screens/NewBookingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import useDateRangePicker from '../hooks/useDateRangePicker';

// Colors
const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

const NewBookingScreen = ({ navigation }) => {
  const [guestName, setGuestName] = useState('');
  const [roomType, setRoomType] = useState('All Types');
  const [roomTypeModalVisible, setRoomTypeModalVisible] = useState(false);
  const [guests, setGuests] = useState('');

  const roomTypes = [
    'All Types',
    'Standard Queen',
    'Superior King',
    'Deluxe King',
    'Suite',
    'Family Room',
  ];

  const {
    checkIn,
    checkOut,
    checkInLabel,
    checkOutLabel,
    pickerState,
    openPicker,
    onPickerChange,
  } = useDateRangePicker({ initialNights: 3 });

  const handleCreateBooking = () => {
    // Handle booking creation logic here
    navigation.goBack(); // Go back to bookings after creating
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Booking</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Guest Name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter guest name"
              placeholderTextColor={textMuted}
              value={guestName}
              onChangeText={setGuestName}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Room Type</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setRoomTypeModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="bed-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <Text style={styles.valueText}>{roomType}</Text>
            <Ionicons name="chevron-down" size={20} color={textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Check-in</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => openPicker('checkin')}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={20} color={textMuted} style={styles.inputIcon} />
              <Text style={styles.valueText}>{checkInLabel}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Check-out</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => openPicker('checkout')}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={20} color={textMuted} style={styles.inputIcon} />
              <Text style={styles.valueText}>{checkOutLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Number of Guests</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="people-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter number of guests"
              placeholderTextColor={textMuted}
              keyboardType="numeric"
              value={guests}
              onChangeText={setGuests}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateBooking}
        >
          <Text style={styles.createButtonText}>Create Booking</Text>
        </TouchableOpacity>
      </ScrollView>

      {pickerState.visible && (
        <DateTimePicker
          value={pickerState.mode === 'checkin' ? checkIn : checkOut}
          mode="date"
          display="default"
          onChange={onPickerChange}
        />
      )}

      <Modal
        transparent
        visible={roomTypeModalVisible}
        animationType="fade"
        onRequestClose={() => setRoomTypeModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setRoomTypeModalVisible(false)}
        >
          <Pressable style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Room Type</Text>
              <TouchableOpacity onPress={() => setRoomTypeModalVisible(false)}>
                <Ionicons name="close" size={22} color={textLight} />
              </TouchableOpacity>
            </View>

            {roomTypes.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.modalItem, roomType === t && styles.modalItemActive]}
                onPress={() => {
                  setRoomType(t);
                  setRoomTypeModalVisible(false);
                }}
              >
                <Text style={[styles.modalItemText, roomType === t && styles.modalItemTextActive]}>
                  {t}
                </Text>
                {roomType === t && (
                  <Ionicons name="checkmark" size={18} color={accent} />
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: cardBg,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: textLight,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cardBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#2a3a4a',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: textLight,
    fontSize: 16,
    height: '100%',
  },
  valueText: {
    flex: 1,
    color: textLight,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  createButton: {
    backgroundColor: accent,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1a2a3a',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  modalTitle: {
    color: textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  modalItem: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1a2a3a',
  },
  modalItemActive: {
    backgroundColor: 'rgba(30, 110, 255, 0.12)',
  },
  modalItemText: {
    color: textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  modalItemTextActive: {
    color: accent,
  },
});

export default NewBookingScreen;