import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Mock data
const mockData = {
  user: {
    name: 'Sarah',
    role: 'Front Desk Manager',
    status: 'Active Shift',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  stats: [
    { id: '1', title: 'Occupancy', value: '85%', change: '+2%', icon: 'building', color: '#3B82F6' },
    { id: '2', title: 'Check-Ins', value: '12', status: 'Pending', icon: 'suitcase-rolling', color: '#10B981' },
    { id: '3', title: 'Requests', value: '5', status: 'New', icon: 'clipboard-list', color: '#F59E0B' },
  ],
  recentActivities: [
    { 
      id: '1', 
      type: 'check-in', 
      title: 'Room 302 Checked In', 
      details: 'Processing by Alex M.', 
      time: '5m ago',
      icon: 'check-circle',
      iconColor: '#10B981'
    },
    { 
      id: '2', 
      type: 'housekeeping', 
      title: 'Housekeeping Request', 
      details: 'Room 405 - Extra Towels', 
      time: '12m ago',
      icon: 'broom',
      iconColor: '#3B82F6'
    },
    { 
      id: '3', 
      type: 'maintenance', 
      title: 'Key Card Issue', 
      details: 'Room 201 - Re-encoded', 
      time: '2m ago',
      icon: 'key',
      iconColor: '#F59E0B'
    },
  ]
};

const StaffDashboardScreen = ({ navigation }) => {
  const { user, stats, recentActivities } = mockData;

  const handleQuickAction = (action) => {
    switch(action) {
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
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.role}>{user.role}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{user.status}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
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
              <FontAwesome5 name={stat.icon} size={20} color="#FFFFFF" />
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
            <Ionicons name="person-add" size={24} color="#3B82F6" />
            <Text style={styles.mainActionText}>Register Guest</Text>
            <Text style={styles.mainActionSubtext}>New walk-in or reservation</Text>
            <Ionicons name="chevron-forward" size={20} color="#3B82F6" style={styles.arrowIcon} />
          </TouchableOpacity>

          <View style={styles.quickActionRow}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('bookings')}
            >
              <MaterialIcons name="event-note" size={24} color="#3B82F6" />
              <Text style={styles.quickActionText}>Manage Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('checkin')}
            >
              <MaterialCommunityIcons name="view-dashboard" size={24} color="#3B82F6" />
              <Text style={styles.quickActionText}>Check-in Dashboard</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickActionRow}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('rooms')}
            >
              <Ionicons name="bed" size={24} color="#3B82F6" />
              <Text style={styles.quickActionText}>Room Types</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => handleQuickAction('staff')}
            >
              <Ionicons name="people" size={24} color="#3B82F6" />
              <Text style={styles.quickActionText}>Staff Directory</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
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
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#3B82F6" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar" size={24} color="#94A3B8" />
          <Text style={styles.navButtonText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#94A3B8" />
          <Text style={styles.navButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="settings" size={24} color="#94A3B8" />
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="qr-code" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1A237E',
    paddingTop: 50,
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  role: {
    color: '#E0E0E0',
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
    color: '#E0E0E0',
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
    backgroundColor: '#F8FAFC',
  },
  greetingCard: {
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 4,
  },
  statChange: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  statStatus: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  quickActions: {
    padding: 16,
  },
  mainActionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainActionText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  mainActionSubtext: {
    color: '#64748B',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: '#1E293B',
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
    color: '#1E293B',
  },
  seeAllText: {
    color: '#3B82F6',
    fontSize: 14,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    color: '#1E293B',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: '#64748B',
  },
  activityTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default StaffDashboardScreen;