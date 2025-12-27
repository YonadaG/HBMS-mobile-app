import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { rooms } from '../data';
import RoomCard from '../components/RoomCard';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

const services = [
  { id: 's1', title: 'Room Service', subtitle: 'Order in-room dining', icon: 'restaurant' },
  { id: 's2', title: 'Spa Booking', subtitle: 'Relax and rejuvenate', icon: 'leaf-outline' },
  { id: 's3', title: 'Concierge', subtitle: 'Local tips & requests', icon: 'information-circle-outline' },
  { id: 's4', title: 'Transport', subtitle: 'Book a ride', icon: 'car-outline' },
];

export default function DashboardScreen({ navigation }) {
  const featuredRoom = rooms[0];
  const exploreRooms = rooms.slice(0, 3);

  const openRoom = (room) => navigation.navigate('RoomDetail', { room });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Ionicons name="menu-outline" size={28} color={textLight} />
          <Text style={styles.headerTitle}>Selam Hotel</Text>
          <TouchableOpacity 
            style={styles.avatar} 
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Ionicons name="person" size={18} color={primaryBg} />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcome}>Welcome, Guest!</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Booking</Text>
          <View style={styles.bookingCard}>
            <Image
              source={{ uri: featuredRoom.images?.[0] }}
              style={styles.bookingImage}
            />
            <View style={styles.bookingContent}>
              
              <Text style={styles.roomName}>{featuredRoom.roomType}</Text>
              <Text style={styles.bookingMeta}>
                Check-in: Oct 26 | Check-out: Oct 30
              </Text>
              <Text style={styles.bookingMeta}>Room {featuredRoom.roomNo}</Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('ManageBooking')}
              >
                <Text style={styles.primaryButtonText}>Manage Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Rooms</Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('ExploreRooms')}
            >
              <Text style={styles.exploreButtonText}>Explore Rooms</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardGrid}>
            {exploreRooms.map((room) => (
              <View key={room.id} style={{ width: '48%' }}>
                <RoomCard room={room} onPress={openRoom} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hotel Services</Text>
          <View style={styles.cardGrid}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Ionicons
                  name={service.icon}
                  size={22}
                  color={accent}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </View>
            ))}
          </View>
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
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 6,
  },
  headerTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '700',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    color: textLight,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookingImage: {
    width: '100%',
    height: 200,
  },
  bookingContent: {
    padding: 16,
    gap: 6,
  },
  hotelName: {
    color: textMuted,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  roomName: {
    color: textLight,
    fontSize: 20,
    fontWeight: '700',
  },
  bookingMeta: {
    color: textMuted,
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: accent,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: textLight,
    fontWeight: '700',
    fontSize: 15,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  roomCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
  },
  roomImage: {
    width: '100%',
    height: 120,
  },
  roomInfo: {
    padding: 12,
    gap: 6,
  },
  roomTitle: {
    color: textLight,
    fontSize: 15,
    fontWeight: '700',
  },
  roomDescription: {
    color: textMuted,
    fontSize: 12,
  },
  serviceCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    width: '48%',
    gap: 8,
  },
  serviceIcon: {
    marginBottom: 4,
  },
  serviceTitle: {
    color: textLight,
    fontSize: 15,
    fontWeight: '700',
  },
  serviceSubtitle: {
    color: textMuted,
    fontSize: 12,
  },
  exploreButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: accent,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: accent,
    fontWeight: '700',
    fontSize: 13,
  },
});

