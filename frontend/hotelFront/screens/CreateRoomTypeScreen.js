import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const primaryBg = '#0b1420';
const cardBg = '#0f1f31';
const cardBg2 = '#12243a';
const accent = '#1e6eff';
const textLight = '#ffffff';
const textMuted = '#cdd5e1';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=256&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=256&q=80',
];

const DEFAULT_AMENITIES = [
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' },
  { id: 'ac', label: 'A/C', icon: 'snow-outline' },
  { id: 'king', label: 'King Bed', icon: 'bed-outline' },
  { id: 'tv', label: 'Smart TV', icon: 'tv-outline' },
  { id: 'coffee', label: 'Coffee Maker', icon: 'cafe-outline' },
  { id: 'balcony', label: 'Balcony', icon: 'home-outline' },
  { id: 'pool', label: 'Pool View', icon: 'water-outline' },
];

export default function CreateRoomTypeScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [floor, setFloor] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState(new Set(['wifi', 'ac']));

  const amenities = useMemo(() => DEFAULT_AMENITIES, []);

  const addImage = () => {
    const next = SAMPLE_IMAGES[images.length % SAMPLE_IMAGES.length];
    setImages((prev) => [...prev, next]);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onSave = () => {
    Alert.alert('Saved', 'Room type saved (mock).');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Room Type</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Room Images</Text>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.9} onPress={addImage}>
            <View style={styles.uploadIconWrap}>
              <Ionicons name="camera" size={18} color={accent} />
            </View>
            <Text style={styles.uploadTitle}>Click to upload</Text>
            <Text style={styles.uploadSubtitle}>SVG, PNG, JPG or GIF (max. 5MB)</Text>
          </TouchableOpacity>

          {images.length > 0 ? (
            <View style={styles.thumbRow}>
              {images.map((uri, idx) => (
                <View key={`${uri}-${idx}`} style={styles.thumbWrap}>
                  <Image source={{ uri }} style={styles.thumb} />
                  <TouchableOpacity
                    style={styles.thumbClose}
                    onPress={() => removeImage(idx)}
                  >
                    <Ionicons name="close" size={14} color={textLight} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : null}

          <Text style={styles.label}>Room Type Name</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Deluxe Ocean View Suite"
              placeholderTextColor={textMuted}
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Description</Text>
          <View style={[styles.inputWrap, styles.textAreaWrap]}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter room details, view type, and highlights..."
              placeholderTextColor={textMuted}
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          <View style={styles.row2}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Base Price (Night)</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={basePrice}
                  onChangeText={setBasePrice}
                  placeholder="$ 0.00"
                  placeholderTextColor={textMuted}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Floor Number</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={floor}
                  onChangeText={setFloor}
                  placeholder="e.g. 5"
                  placeholderTextColor={textMuted}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.amenitiesHeader}>
            <Text style={styles.label}>Amenities</Text>
            <Text style={styles.amenitiesHint}>Select all that apply</Text>
          </View>

          <View style={styles.chipsWrap}>
            {amenities.map((a) => {
              const selected = selectedAmenities.has(a.id);
              return (
                <TouchableOpacity
                  key={a.id}
                  style={[styles.chip, selected ? styles.chipActive : styles.chipInactive]}
                  onPress={() => toggleAmenity(a.id)}
                  activeOpacity={0.9}
                >
                  <Ionicons
                    name={a.icon}
                    size={16}
                    color={selected ? textLight : textMuted}
                  />
                  <Text style={[styles.chipText, selected ? styles.chipTextActive : styles.chipTextInactive]}>
                    {a.label}
                  </Text>
                  {selected ? (
                    <Ionicons name="checkmark" size={16} color={textLight} />
                  ) : null}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={[styles.chip, styles.chipCustom]}
              onPress={() => Alert.alert('Custom', 'Custom amenity (mock).')}
              activeOpacity={0.9}
            >
              <Ionicons name="add" size={16} color={textMuted} />
              <Text style={[styles.chipText, styles.chipTextInactive]}>Custom</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={onSave} activeOpacity={0.9}>
            <Text style={styles.saveText}>Save Room Type</Text>
          </TouchableOpacity>

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: primaryBg,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cardBg,
  },
  headerTitle: {
    color: textLight,
    fontSize: 16,
    fontWeight: '800',
  },
  headerRight: {
    width: 36,
    height: 36,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  sectionTitle: {
    color: textLight,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 6,
  },
  uploadBox: {
    borderRadius: 16,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#27405f',
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: cardBg2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    color: textLight,
    fontWeight: '800',
    fontSize: 13,
  },
  uploadSubtitle: {
    color: textMuted,
    fontSize: 12,
  },
  thumbRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    marginBottom: 10,
  },
  thumbWrap: {
    width: 84,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  thumbClose: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: textLight,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 8,
  },
  inputWrap: {
    backgroundColor: cardBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    color: textLight,
    fontSize: 14,
  },
  textAreaWrap: {
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  row2: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  amenitiesHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  amenitiesHint: {
    color: textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: accent,
    borderColor: accent,
  },
  chipInactive: {
    backgroundColor: cardBg,
    borderColor: '#1b2a3f',
  },
  chipCustom: {
    backgroundColor: cardBg,
    borderColor: '#1b2a3f',
    borderStyle: 'dashed',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextActive: {
    color: textLight,
  },
  chipTextInactive: {
    color: textMuted,
  },
  saveButton: {
    marginTop: 22,
    backgroundColor: accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    color: textLight,
    fontSize: 15,
    fontWeight: '800',
  },
});
