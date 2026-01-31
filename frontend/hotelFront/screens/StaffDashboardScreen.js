import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useHotel } from '../context/HotelContext';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

// Mock data
const mockData = {
  user: {
    name: 'Sarah',
    role: 'Front Desk Manager',
    status: 'Active Shift',
  },
  stats: [
    { id: '1', title: 'Occupancy', value: '85%', change: '+2%', icon: 'building', color: accent },
    { id: '2', title: 'Check-Ins', value: '12', status: 'Pending', icon: 'suitcase-rolling', color: accent },
    { id: '3', title: 'Requests', value: '5', status: 'New', icon: 'clipboard-list', color: accent },
  ],
  recentActivities: [
    {
      id: '1',
      type: 'check-in',
      title: 'Room 302 Checked In',
      details: 'Processing by Alex M.',
      time: '5m ago',
      icon: 'check-circle',
      iconColor: accent
    },
    {
      id: '2',
      type: 'housekeeping',
      title: 'Housekeeping Request',
      details: 'Room 405 - Extra Towels',
      time: '12m ago',
      icon: 'broom',
      iconColor: accent
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Key Card Issue',
      details: 'Room 201 - Re-encoded',
      time: '2m ago',
      icon: 'key',
      iconColor: accent
    },
  ]
};



const StaffDashboardScreen = ({ navigation }) => {
  const { user, bookings } = useHotel();

  // Derive stats from bookings
  const checkInsCount = bookings.filter(b => b.status === 'Arriving').length;
  const occupancyRate = '85%'; // Mock for now, or calc from rooms

  const stats = [
    { id: '1', title: 'Occupancy', value: occupancyRate, change: '+2%', icon: 'building', color: accent },
    { id: '2', title: 'Check-Ins', value: checkInsCount.toString(), status: 'Pending', icon: 'suitcase-rolling', color: accent },
    { id: '3', title: 'Requests', value: '5', status: 'New', icon: 'clipboard-list', color: accent },
  ];

  const recentActivities = mockData.recentActivities; // Keep mock for now

  const handleQuickAction = (action) => {
    switch (action) {
      case 'register':
        navigation.navigate('NewBooking');
        break;
      case 'bookings':
        navigation.navigate('Bookings');
        break;
      case 'checkin':
        navigation.navigate('CheckInDashboard');
        break;
      case 'rooms':
        navigation.navigate('RoomTypes');
        break;
      case 'staff':
        navigation.navigate('StaffDirectory');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={primaryBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => navigation.navigate('StaffSettings')}
        >
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={28} color={textLight} />
          </View>
          <View>
            <Text style={styles.role}>{user.role}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{user.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('StaffNotifications')}
        >
          <Ionicons name="notifications" size={24} color={textLight} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Greeting Card */}
        <View style={styles.greetingCard}>
          <Text style={styles.greeting}>Good Evening, {user.name}</Text>
          <Text style={styles.subtitle}>Here's what's happening at the hotel today.</Text>
        </View>

        {/* Stats Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}
        >
          {stats.map((stat) => (
            <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.color }]}>
              <FontAwesome5 name={stat.icon} size={20} color={textLight} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              {stat.change && (
                <Text style={styles.statChange}>{stat.change}</Text>
              )}
              {stat.status && (
                <Text style={styles.statStatus}>{stat.status}</Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => handleQuickAction('register')}
          >
            <Ionicons name="person-add" size={24} color={accent} />
            <Text style={styles.mainActionText}>Register Guest</Text>
            <Text style={styles.mainActionSubtext}>New walk-in or reservation</Text>
            <Ionicons name="chevron-forward" size={20} color={accent} style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={styles.quickActionRow}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('bookings')}
            >
              <MaterialIcons name="event-note" size={24} color={accent} />
              <Text style={styles.quickActionText}>Manage Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('rooms')}
            >
              <Ionicons name="bed" size={24} color={accent} />
              <Text style={styles.quickActionText}>Room Types</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        {recentActivities && recentActivities.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityList}>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: `${activity.iconColor}20` }]}>
                    <MaterialCommunityIcons
                      name={activity.icon}
                      size={20}
                      color={activity.iconColor}
                    />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDetails}>{activity.details}</Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color={accent} />
          <Text style={[styles.navButtonText, { color: accent }]}>Home</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('StaffSettings')}
        >
          <Ionicons name="settings" size={24} color={textMuted} />
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: primaryBg,
    paddingTop: 45,
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  role: {
    color: textMuted,
    fontSize: 14,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: textMuted,
    fontSize: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  container: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  greetingCard: {
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: textLight,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: textMuted,
  },
  statsScroll: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  statCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: cardBg,
  },
  statValue: {
    color: textLight,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statTitle: {
    color: textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  statChange: {
    color: textLight,
    fontSize: 12,
    marginTop: 4,
  },
  statStatus: {
    color: textLight,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  quickActions: {
    padding: 16,
  },
  mainActionButton: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  mainActionText: {
    color: textLight,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  mainActionSubtext: {
    color: textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  arrowIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: textLight,
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: textLight,
  },
  seeAllText: {
    color: accent,
    fontSize: 14,
  },
  activityList: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: textLight,
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: textMuted,
  },
  activityTime: {
    fontSize: 10,
    color: textMuted,
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: primaryBg,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 10,
    color: textMuted,
    marginTop: 4,
  },

});

export default StaffDashboardScreen;