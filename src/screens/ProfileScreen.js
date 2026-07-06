import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.profilePic} />
      <Text style={styles.name}>Your Name</Text>
      <Text style={styles.bio}>Building the best dating experience ✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' },
  profilePic: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold' },
  bio: { fontSize: 16, color: '#666', marginTop: 10 },
});