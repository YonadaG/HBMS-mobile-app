// screens/NewBookingScreen.js
import React, { useState, useEffect } from 'react';
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
  Pressable,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDateRangePicker from '../hooks/useDateRangePicker';

// Colors
const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const errorColor = '#FF5252';

const BOOKING_STORAGE_KEY = '@pending_booking';

const NewBookingScreen = ({ navigation }) => {
  const [guestName, setGuestName] = useState('');
  const [roomType, setRoomType] = useState('All Types');
  const [roomTypeModalVisible, setRoomTypeModalVisible] = useState(false);
  const [guests, setGuests] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({
    guestName: '',
    roomType: '',
    dates: '',
    guests: ''
  });

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

  // Load saved booking data on mount
  useEffect(() => {
    loadSavedBooking();
  }, []);

  // Auto-save booking data when fields change
  useEffect(() => {
    saveBookingData();
  }, [guestName, roomType, guests, checkIn, checkOut]);

  const loadSavedBooking = async () => {
    try {
      const savedData = await AsyncStorage.getItem(BOOKING_STORAGE_KEY);
      if (savedData) {
        const booking = JSON.parse(savedData);
        setGuestName(booking.guestName || '');
        setRoomType(booking.roomType || 'All Types');
        setGuests(booking.guests || '');
        // Note: Date picker state is managed by the hook
      }
    } catch (error) {
      console.log('Error loading saved booking:', error);
    }
  };

  const saveBookingData = async () => {
    try {
      const bookingData = {
        guestName,
        roomType,
        guests,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        savedAt: new Date().toISOString()
      };
      await AsyncStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookingData));
    } catch (error) {
      console.log('Error saving booking:', error);
    }
  };

  const clearSavedBooking = async () => {
    try {
      await AsyncStorage.removeItem(BOOKING_STORAGE_KEY);
    } catch (error) {
      console.log('Error clearing saved booking:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      guestName: '',
      roomType: '',
      dates: '',
      guests: ''
    };

    // Validate guest name
    if (!guestName.trim()) {
      newErrors.guestName = 'Guest name is required';
      isValid = false;
    } else if (guestName.trim().length < 2) {
      newErrors.guestName = 'Guest name must be at least 2 characters';
      isValid = false;
    }

    // Validate room type
    if (roomType === 'All Types') {
      newErrors.roomType = 'Please select a room type';
      isValid = false;
    }

    // Validate dates
    if (checkOut <= checkIn) {
      newErrors.dates = 'Check-out must be after check-in';
      isValid = false;
    }

    // Validate number of guests
    if (!guests.trim()) {
      newErrors.guests = 'Number of guests is required';
      isValid = false;
    } else if (isNaN(parseInt(guests)) || parseInt(guests) < 1) {
      newErrors.guests = 'Please enter a valid number of guests';
      isValid = false;
    } else if (parseInt(guests) > 10) {
      newErrors.guests = 'Maximum 10 guests allowed';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateBooking = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Validation Error',
        'Please fix the errors in the form before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      // Here you would normally make an API call to create the booking
      // For now, we'll just simulate success

      // Clear saved data after successful booking
      await clearSavedBooking();

      Alert.alert(
        'Success',
        'Booking created successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      // If there's an error, the data is already saved in AsyncStorage
      Alert.alert(
        'Error',
        'Failed to create booking. Your data has been saved and you can try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderError = (errorText) => {
    if (!errorText) return null;
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={14} color={errorColor} />
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    );
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
          <View style={[styles.inputContainer, errors.guestName && styles.inputError]}>
            <Ionicons name="person-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter guest name"
              placeholderTextColor={textMuted}
              value={guestName}
              onChangeText={(text) => {
                setGuestName(text);
                if (errors.guestName) setErrors(prev => ({ ...prev, guestName: '' }));
              }}
            />
          </View>
          {renderError(errors.guestName)}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Room Type</Text>
          <TouchableOpacity
            style={[styles.inputContainer, errors.roomType && styles.inputError]}
            onPress={() => setRoomTypeModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="bed-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <Text style={[styles.valueText, roomType === 'All Types' && { color: textMuted }]}>
              {roomType === 'All Types' ? 'Select room type' : roomType}
            </Text>
            <Ionicons name="chevron-down" size={20} color={textMuted} />
          </TouchableOpacity>
          {renderError(errors.roomType)}
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Check-in</Text>
            <TouchableOpacity
              style={[styles.inputContainer, errors.dates && styles.inputError]}
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
              style={[styles.inputContainer, errors.dates && styles.inputError]}
              onPress={() => openPicker('checkout')}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={20} color={textMuted} style={styles.inputIcon} />
              <Text style={styles.valueText}>{checkOutLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderError(errors.dates)}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Number of Guests</Text>
          <View style={[styles.inputContainer, errors.guests && styles.inputError]}>
            <Ionicons name="people-outline" size={20} color={textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter number of guests"
              placeholderTextColor={textMuted}
              keyboardType="numeric"
              value={guests}
              onChangeText={(text) => {
                setGuests(text);
                if (errors.guests) setErrors(prev => ({ ...prev, guests: '' }));
              }}
            />
          </View>
          {renderError(errors.guests)}
        </View>

        {/* Draft indicator */}
        <View style={styles.draftIndicator}>
          <Ionicons name="cloud-done-outline" size={16} color={textMuted} />
          <Text style={styles.draftText}>Draft auto-saved</Text>
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

            {roomTypes.filter(t => t !== 'All Types').map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.modalItem, roomType === t && styles.modalItemActive]}
                onPress={() => {
                  setRoomType(t);
                  setRoomTypeModalVisible(false);
                  if (errors.roomType) setErrors(prev => ({ ...prev, roomType: '' }));
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
  inputError: {
    borderColor: errorColor,
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    color: errorColor,
    fontSize: 12,
    marginLeft: 4,
  },
  draftIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  draftText: {
    color: textMuted,
    fontSize: 12,
    marginLeft: 6,
  },
  createButton: {
    backgroundColor: accent,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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