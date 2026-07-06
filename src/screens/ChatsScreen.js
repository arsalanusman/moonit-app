import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chats = [
  { id: '1', name: 'Charlie', message: 'It seems we have a lot in common...', time: '09:43', unread: 1, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Eleanor', message: 'Damn, you\'re a knockout...', time: '12:44', unread: 2, image: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

export default function ChatsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View style={styles.matches}>
        <Text style={styles.sectionTitle}>Recent Matches</Text>
        <FlatList
          horizontal
          data={chats}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.matchItem}>
              <Image source={{ uri: item.image }} style={styles.matchImage} />
              <Text style={styles.matchName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { name: item.name })}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '600', padding: 15 },
  matches: { paddingVertical: 10 },
  matchItem: { alignItems: 'center', marginHorizontal: 10 },
  matchImage: { width: 70, height: 70, borderRadius: 35 },
  matchName: { marginTop: 5, fontSize: 12 },
  chatItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  chatInfo: { flex: 1 },
  name: { fontWeight: '600', fontSize: 16 },
  lastMessage: { color: '#666', marginTop: 3 },
  time: { color: '#999', fontSize: 12 },
});