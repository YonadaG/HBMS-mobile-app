import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useHotel } from '../context/HotelContext';

const { width } = Dimensions.get('window');

// Theme Colors (Consistent with app)
const primaryBg = '#0b1420';
const cardBg = '#152232'; // Slightly lighter than pure black/primary
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#9ca3af';
const success = '#10b981';

export default function StaffRoomDetailScreen({ route, navigation }) {
    const { roomType } = route.params;
    const { rooms } = useHotel(); // Get live rooms from context

    // Filter to find physical rooms of this type
    const roomsOfThisType = rooms.filter(r => r.roomType === roomType.name || r.roomType === roomType.id);
    const roomCount = roomsOfThisType.length;

    // derived stats
    const stats = [
        { label: 'Occupancy', value: `Up to ${roomType.guests || 2}`, icon: 'people' },
        { label: 'Size', value: roomType.size ? `${roomType.size} m²` : '35 m²', icon: 'resize' },
        { label: 'Bed Type', value: roomType.bedType || 'King', icon: 'bed' }
    ];

    // Helper to map amenity name to icon
    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('wifi')) return 'wifi';
        if (n.includes('air') || n.includes('ac') || n.includes('a/c')) return 'snow';
        if (n.includes('tv')) return 'tv';
        if (n.includes('coffee')) return 'cafe';
        if (n.includes('bar')) return 'wine';
        if (n.includes('pool')) return 'water';
        if (n.includes('desk')) return 'briefcase';
        if (n.includes('balcony')) return 'sunny';
        return 'star';
    };

    // Try to get amenities from the first physical room of this type (since data.js roomTypes lack amenities)
    const rawAmenities = roomsOfThisType[0]?.amenities || roomType.amenities;

    const amenitiesList = rawAmenities ? rawAmenities.map(a => ({ name: a, icon: getIcon(a) })) : [
        { name: 'Free Wi-Fi', icon: 'wifi' },
        { name: 'Air Conditioning', icon: 'snow' },
        { name: 'Smart TV', icon: 'tv' },
        { name: 'Work Desk', icon: 'briefcase' },
    ];

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{roomType.name}</Text>
                <TouchableOpacity onPress={() => alert('Edit')}>
                    <Text style={styles.editBtn}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Image Carousel */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: roomType.image }} style={styles.mainImage} />
                    <View style={styles.imageCounter}>
                        <Text style={styles.counterText}>1/5</Text>
                    </View>
                </View>

                {/* Price & Stats Card */}
                <View style={styles.card}>
                    <View style={styles.priceRow}>
                        <View>
                            <Text style={styles.label}>Price per night</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={styles.price}>${roomType.price}</Text>
                                <Text style={styles.currency}> USD</Text>
                            </View>
                        </View>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeText}>Active</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statsRow}>
                        {stats.map((s, i) => (
                            <View key={i} style={[styles.statItem, i !== stats.length - 1 && styles.statBorder]}>
                                <Ionicons name={s.icon} size={20} color={textMuted} style={{ marginBottom: 4 }} />
                                <Text style={styles.label}>{s.label}</Text>
                                <Text style={styles.statValue}>{s.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* About */}
                <Text style={styles.sectionTitle}>About this room</Text>
                <Text style={styles.description}>
                    {roomType.description || "Experience ultimate comfort in our room. Designed for relaxation, it features a plush bed, modern bathroom, and panoramic city view."}
                </Text>

                {/* Amenities */}
                <Text style={styles.sectionTitle}>Amenities</Text>
                <View style={styles.amenitiesGrid}>
                    {amenitiesList.map((item, i) => (
                        <View key={i} style={styles.amenityItem}>
                            <View style={styles.iconBox}>
                                <Ionicons name={item.icon} size={18} color={accent} />
                            </View>
                            <Text style={styles.amenityText}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                {/* Room Numbers */}
                <View style={styles.roomHeaderRow}>
                    <Text style={styles.sectionTitle}>Room Numbers</Text>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{roomCount} Total</Text>
                    </View>
                </View>

                <View style={styles.roomGrid}>
                    {roomsOfThisType.map(r => (
                        <TouchableOpacity key={r.id} style={styles.roomNumBtn}>
                            <Text style={styles.roomNumText}>{r.roomNo}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.addRoomBtn}>
                        <Ionicons name="add" size={24} color={textMuted} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: primaryBg },
    scroll: { padding: 16 },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16, paddingTop: 45, paddingBottom: 16
    },
    headerTitle: { color: textLight, fontSize: 18, fontWeight: '700' },
    editBtn: { color: accent, fontSize: 16, fontWeight: '600' },
    imageContainer: { marginBottom: 20, borderRadius: 16, overflow: 'hidden' },
    mainImage: { width: '100%', height: 220, backgroundColor: '#202020' },
    imageCounter: {
        position: 'absolute', bottom: 12, right: 12,
        backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12
    },
    counterText: { color: textLight, fontSize: 12, fontWeight: '600' },
    card: { backgroundColor: cardBg, borderRadius: 16, padding: 16, marginBottom: 24 },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    label: { color: textMuted, fontSize: 12, marginBottom: 4 },
    price: { color: textLight, fontSize: 28, fontWeight: '800' },
    currency: { color: textMuted, fontSize: 14, fontWeight: '600' },
    activeBadge: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    activeText: { color: success, fontSize: 12, fontWeight: '700' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
    statsRow: { flexDirection: 'row' },
    statItem: { flex: 1, alignItems: 'center' },
    statBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)' },
    statValue: { color: textLight, fontSize: 14, fontWeight: '700', marginTop: 2 },
    sectionTitle: { color: textLight, fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 8 },
    description: { color: textMuted, fontSize: 14, lineHeight: 22, marginBottom: 24 },
    amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
    amenityItem: {
        width: '48%', flexDirection: 'row', alignItems: 'center',
        backgroundColor: cardBg, padding: 12, borderRadius: 12, gap: 10
    },
    iconBox: { width: 32, height: 32, backgroundColor: 'rgba(30, 110, 255, 0.1)', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    amenityText: { color: textLight, fontSize: 13, fontWeight: '600' },
    roomHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    countBadge: { backgroundColor: '#233348', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    countText: { color: textMuted, fontSize: 11, fontWeight: '600' },
    roomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    roomNumBtn: {
        width: '22%', aspectRatio: 1.8, backgroundColor: cardBg, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#233348'
    },
    roomNumText: { color: textLight, fontWeight: '700', fontSize: 14 },
    addRoomBtn: {
        width: '22%', aspectRatio: 1.8, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: textMuted
    }
});
