import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Colors
const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';
const success = '#10b981';
const warning = '#f59e0b';
const danger = '#ef4444';

// Mock data for bookings
const bookingsData = [
  {
    id: '1',
    guestName: 'Eleanor Vance',
    guestCount: 2,
    confirmation: 'B082957',
    roomType: 'Superior King Room',
    checkIn: '14 Aug',
    checkOut: '18 Aug',
    status: 'Arriving',
    statusColor: accent,
  },
  {
    id: '2',
    guestName: 'Thomas Shelby',
    guestCount: 1,
    confirmation: 'C193764',
    roomType: 'Deluxe Suite',
    checkIn: '15 Aug',
    checkOut: '20 Aug',
    status: 'Checked In',
    statusColor: success,
  },
  {
    id: '3',
    guestName: 'Olivia Parker',
    guestCount: 3,
    confirmation: 'D204857',
    roomType: 'Family Room',
    checkIn: '16 Aug',
    checkOut: '19 Aug',
    status: 'Departing',
    statusColor: warning,
  },
];

const BookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Arriving', 'Departing', 'Stay-overs'];

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.confirmation.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && booking.status === activeTab;
  });

  const getStatusBadgeStyle = (status) => ({
    backgroundColor: status === 'Arriving' ? 'rgba(30, 110, 255, 0.15)' : 
                      status === 'Checked In' ? 'rgba(16, 185, 129, 0.15)' :
                      status === 'Departing' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(107, 114, 128, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  });

  const getStatusTextStyle = (status) => ({
    color: status === 'Arriving' ? accent : 
           status === 'Checked In' ? success :
           status === 'Departing' ? warning : textMuted,
    fontSize: 12,
    fontWeight: '600',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
     
<View style={styles.header}>
  <TouchableOpacity style={styles.headerButton}>
    <Ionicons name="calendar-outline" size={24} color={textLight} />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Bookings</Text>
  <TouchableOpacity 
    style={styles.headerButton}
    onPress={() => navigation.navigate('NewBooking')} // Add this navigation
  >
    <Ionicons name="add" size={24} color={textLight} />
  </TouchableOpacity>
</View>

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Arrivals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>22</Text>
            <Text style={styles.statLabel}>Departures</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>76</Text>
            <Text style={styles.statLabel}>In-House</Text>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text 
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by guest or confirmation #"
            placeholderTextColor={textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Bookings List */}
        <View style={styles.bookingsList}>
          {filteredBookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('GuestCheckIn', { booking })}
            >
              <View style={styles.bookingHeader}>
                <Text style={styles.guestName}>
                  {booking.guestName} ({booking.guestCount} {booking.guestCount === 1 ? 'guest' : 'guests'})
                </Text>
                <View style={getStatusBadgeStyle(booking.status)}>
                  <Text style={getStatusTextStyle(booking.status)}>
                    {booking.status}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.confirmation}>CONF: #{booking.confirmation}</Text>
              <Text style={styles.roomType}>{booking.roomType}</Text>
              <Text style={styles.dates}>
                {booking.checkIn} - {booking.checkOut}
              </Text>
              
              <View style={styles.bookingActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('GuestCheckIn', { booking })}
                >
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                {booking.status === 'Arriving' && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.primaryActionButton]}
                    onPress={() => navigation.navigate('GuestCheckIn', { booking })}
                  >
                    <Text style={[styles.actionButtonText, { color: textLight }]}>
                      Check In
                    </Text>
                  </TouchableOpacity>
                )}
                {booking.status === 'Checked In' && (
                  <>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => navigation.navigate('GuestCheckIn', { booking })}
                    >
                      <Text style={styles.actionButtonText}>View Bill</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.dangerActionButton]}
                      onPress={() => navigation.navigate('GuestCheckIn', { booking })}
                    >
                      <Text style={[styles.actionButtonText, { color: danger }]}>
                        Check Out
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity style={styles.moreOptions}>
                  <Ionicons name="ellipsis-vertical" size={18} color={textMuted} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: textLight,
    fontSize: 18,
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  statValue: {
    color: textLight,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: accent,
  },
  tabText: {
    color: textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: textLight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cardBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: textLight,
    fontSize: 14,
  },
  bookingsList: {
    paddingBottom: 24,
  },
  bookingCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  guestName: {
    color: textLight,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  confirmation: {
    color: textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  roomType: {
    color: textLight,
    fontSize: 14,
    marginBottom: 4,
  },
  dates: {
    color: textMuted,
    fontSize: 13,
    marginBottom: 12,
  },
  bookingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
  },
  primaryActionButton: {
    backgroundColor: accent,
    borderColor: accent,
  },
  dangerActionButton: {
    borderColor: danger,
  },
  actionButtonText: {
    color: textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  moreOptions: {
    marginLeft: 'auto',
    padding: 4,
  },
});

export default BookingsScreen;
