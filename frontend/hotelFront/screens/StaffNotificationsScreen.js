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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

// Mock notifications data
const mockNotifications = [
    {
        id: '1',
        type: 'check-in',
        title: 'New Check-In Request',
        message: 'Guest John Smith has arrived for Room 302',
        time: '5 min ago',
        read: false,
        icon: 'login',
        iconColor: '#4CAF50'
    },
    {
        id: '2',
        type: 'housekeeping',
        title: 'Housekeeping Alert',
        message: 'Room 405 requires cleaning - Priority: High',
        time: '15 min ago',
        read: false,
        icon: 'broom',
        iconColor: '#FF9800'
    },
    {
        id: '3',
        type: 'maintenance',
        title: 'Maintenance Request',
        message: 'AC repair needed in Room 201',
        time: '1 hour ago',
        read: true,
        icon: 'wrench',
        iconColor: '#2196F3'
    },
    {
        id: '4',
        type: 'booking',
        title: 'New Booking',
        message: 'Reservation confirmed for Room 512 - Dec 15-18',
        time: '2 hours ago',
        read: true,
        icon: 'calendar-check',
        iconColor: accent
    },
    {
        id: '5',
        type: 'checkout',
        title: 'Check-Out Reminder',
        message: 'Room 108 checkout scheduled for 11:00 AM',
        time: '3 hours ago',
        read: true,
        icon: 'logout',
        iconColor: '#9C27B0'
    },
    {
        id: '6',
        type: 'system',
        title: 'System Update',
        message: 'Shift schedule has been updated for this week',
        time: 'Yesterday',
        read: true,
        icon: 'information',
        iconColor: textMuted
    }
];

const StaffNotificationsScreen = ({ navigation }) => {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={primaryBg} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
                {unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{unreadCount} new</Text>
                    </View>
                )}
            </View>

            <ScrollView style={styles.container}>
                {/* Notifications List */}
                <View style={styles.notificationsList}>
                    {mockNotifications.map((notification, index) => (
                        <TouchableOpacity
                            key={notification.id}
                            style={[
                                styles.notificationItem,
                                !notification.read && styles.unreadItem,
                                index === mockNotifications.length - 1 && styles.lastItem
                            ]}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: `${notification.iconColor}20` }]}>
                                <MaterialCommunityIcons
                                    name={notification.icon}
                                    size={22}
                                    color={notification.iconColor}
                                />
                            </View>
                            <View style={styles.notificationContent}>
                                <View style={styles.notificationHeader}>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                    {!notification.read && <View style={styles.unreadDot} />}
                                </View>
                                <Text style={styles.notificationMessage}>{notification.message}</Text>
                                <Text style={styles.notificationTime}>{notification.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Mark All as Read */}
                <TouchableOpacity style={styles.markAllButton}>
                    <Ionicons name="checkmark-done" size={20} color={accent} />
                    <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('StaffDashboard')}
                >
                    <Ionicons name="home" size={24} color={textMuted} />
                    <Text style={styles.navButtonText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="notifications" size={24} color={accent} />
                    <Text style={[styles.navButtonText, { color: accent }]}>Notifications</Text>
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
        alignItems: 'center',
        padding: 16,
        paddingTop: 18,
        paddingBottom: 20,
        backgroundColor: primaryBg,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: textLight,
    },
    unreadBadge: {
        backgroundColor: accent,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 12,
    },
    unreadBadgeText: {
        color: textLight,
        fontSize: 12,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: primaryBg,
    },
    notificationsList: {
        backgroundColor: cardBg,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    unreadItem: {
        backgroundColor: 'rgba(30, 110, 255, 0.08)',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: textLight,
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: accent,
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 13,
        color: textMuted,
        marginTop: 4,
        lineHeight: 18,
    },
    notificationTime: {
        fontSize: 11,
        color: textMuted,
        marginTop: 6,
        opacity: 0.7,
    },
    markAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
        backgroundColor: cardBg,
        borderRadius: 12,
    },
    markAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: accent,
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

export default StaffNotificationsScreen;
