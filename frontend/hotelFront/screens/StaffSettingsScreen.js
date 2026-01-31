import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Switch
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

const StaffSettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(true);
    const [soundEnabled, setSoundEnabled] = React.useState(true);

    const settingsSections = [
        {
            title: 'Account',
            items: [
                { icon: 'person-outline', label: 'Profile', type: 'navigate' },
                { icon: 'lock-closed-outline', label: 'Change Password', type: 'navigate' },
                { icon: 'shield-checkmark-outline', label: 'Privacy', type: 'navigate' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: 'notifications-outline', label: 'Notifications', type: 'toggle', value: notificationsEnabled, onToggle: setNotificationsEnabled },
                { icon: 'moon-outline', label: 'Dark Mode', type: 'toggle', value: darkMode, onToggle: setDarkMode },
                { icon: 'volume-high-outline', label: 'Sound', type: 'toggle', value: soundEnabled, onToggle: setSoundEnabled },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: 'help-circle-outline', label: 'Help Center', type: 'navigate' },
                { icon: 'chatbubble-ellipses-outline', label: 'Contact Support', type: 'navigate' },
                { icon: 'document-text-outline', label: 'Terms of Service', type: 'navigate' },
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={primaryBg} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.container}>
                {settingsSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    style={[
                                        styles.settingItem,
                                        itemIndex === section.items.length - 1 && styles.lastItem
                                    ]}
                                    disabled={item.type === 'toggle'}
                                >
                                    <View style={styles.settingLeft}>
                                        <Ionicons name={item.icon} size={22} color={accent} />
                                        <Text style={styles.settingLabel}>{item.label}</Text>
                                    </View>
                                    {item.type === 'toggle' ? (
                                        <Switch
                                            value={item.value}
                                            onValueChange={item.onToggle}
                                            trackColor={{ false: '#3e3e3e', true: accent }}
                                            thumbColor={item.value ? textLight : '#f4f3f4'}
                                        />
                                    ) : (
                                        <Ionicons name="chevron-forward" size={20} color={textMuted} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    })}
                >
                    <Ionicons name="log-out-outline" size={22} color="#FF5252" />
                    <Text style={styles.logoutText}>Log Out</Text>
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

                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('StaffNotifications')}
                >
                    <Ionicons name="notifications" size={24} color={textMuted} />
                    <Text style={styles.navButtonText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="settings" size={24} color={accent} />
                    <Text style={[styles.navButtonText, { color: accent }]}>Settings</Text>
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
    container: {
        flex: 1,
        backgroundColor: primaryBg,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: textMuted,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sectionContent: {
        backgroundColor: cardBg,
        borderRadius: 12,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: textLight,
        marginLeft: 12,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cardBg,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5252',
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

export default StaffSettingsScreen;
