import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const initialMessages = [
  {
    id: '1',
    text: "Hi 😊 It's good. Yours?",
    isMe: false,
    time: '09:42',
  },
  {
    id: '2',
    text: "It seems we have a lot in common and have a lot of interest in each other 😘",
    isMe: true,
    time: '09:43',
  },
  {
    id: '3',
    text: "I want to invite you to dinner tomorrow night at 7 at Starbelly Restaurant 🍝",
    isMe: false,
    time: '08:40',
  },
  {
    id: '4',
    text: "What do you think?",
    isMe: false,
    time: '08:41',
  },
];

export default function ChatDetail() {
  const route = useRoute();
  const { name = "Charlie" } = route.params || {};
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerUser}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="videocam" size={24} color="#FF2D55" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isMe ? styles.myBubble : styles.theirBubble]}>
            <Text style={item.isMe ? styles.myText : styles.theirText}>{item.text}</Text>
            <Text style={item.isMe ? styles.myTime : styles.theirTime}>{item.time}</Text>
          </View>
        )}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={28} color="#FF2D55" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type message..."
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#FF2D55" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerUser: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  status: { fontSize: 13, color: '#4CAF50' },

  messagesList: { flex: 1, padding: 15 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF2D55',
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  myText: { color: 'white', fontSize: 16 },
  theirText: { color: '#000', fontSize: 16 },
  myTime: { color: 'rgba(255,255,255,0.7)', fontSize: 11, alignSelf: 'flex-end', marginTop: 4 },
  theirTime: { color: '#999', fontSize: 11, marginTop: 4 },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: { padding: 8 },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 8,
    fontSize: 16,
  },
  sendButton: { padding: 8 },
});