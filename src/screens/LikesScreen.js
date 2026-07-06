import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import DeckSwiper from 'react-native-deck-swiper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const profiles = [
  {
    id: 1,
    name: "Sophie",
    age: 24,
    bio: "Love hiking, coffee & deep talks ☕",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Mia",
    age: 26,
    bio: "Artist & dog mom 🎨",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Emma",
    age: 23,
    bio: "Travel addict ✈️",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

export default function LikesScreen() {
  const [showGift, setShowGift] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const deckRef = useRef(null);

  const handleLike = () => {
    deckRef.current?.swipeRight();
  };

  const handleNope = () => {
    deckRef.current?.swipeLeft();
  };

  const handleSuperLike = () => {
    deckRef.current?.swipeTop();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>moonit</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <Text style={[styles.tab, styles.activeTab]}>❤️ LIKES</Text>
        <Text style={styles.tab}>⭐ TOP PICKS</Text>
      </View>

      {/* Deck Swiper */}
      <View style={styles.deckContainer}>
        <DeckSwiper
          ref={deckRef}
          cards={profiles}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>
                  {card.name}, {card.age}
                </Text>
                <Text style={styles.cardBio}>{card.bio}</Text>
              </View>
            </View>
          )}
          onSwiped={(index) => setCurrentIndex(index + 1)}
          onSwipedAll={() => alert("You've seen all profiles for now! 🎉")}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          swipeThreshold={100}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleNope}>
          <Ionicons name="close" size={40} color="#FF4757" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.superLike]} onPress={handleSuperLike}>
          <Ionicons name="star" size={35} color="#00BFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons name="heart" size={40} color="#FF2D55" />
        </TouchableOpacity>
      </View>

      {/* Gift Button */}
      <TouchableOpacity style={styles.giftFloatingButton} onPress={() => setShowGift(true)}>
        <Ionicons name="gift" size={28} color="white" />
      </TouchableOpacity>

      {/* Gift Modal */}
      <Modal visible={showGift} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Impress Your Connection with a Gift</Text>
            
            <View style={styles.giftOptions}>
              <TouchableOpacity style={styles.giftItem}><Ionicons name="rose" size={55} color="#C71585" /></TouchableOpacity>
              <TouchableOpacity style={[styles.giftItem, styles.selectedGift]}><Ionicons name="heart" size={55} color="#FF2D55" /></TouchableOpacity>
              <TouchableOpacity style={styles.giftItem}><Ionicons name="gift" size={55} color="#FF8C00" /></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sendButton} onPress={() => setShowGift(false)}>
              <Text style={styles.sendText}>Send Gift</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowGift(false)}>
              <Text style={styles.addNote}>Add a Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 15 
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FF2D55' },
  
  tabBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 12, 
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  tab: { fontSize: 17, fontWeight: '600', color: '#666' },
  activeTab: { color: '#FF2D55', borderBottomWidth: 3, borderBottomColor: '#FF2D55' },

  deckContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { 
    width: width * 0.9, 
    height: 480, 
    borderRadius: 20, 
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardImage: { width: '100%', height: '75%', resizeMode: 'cover' },
  cardInfo: { padding: 20 },
  cardName: { fontSize: 28, fontWeight: 'bold' },
  cardBio: { fontSize: 16, color: '#555', marginTop: 8 },

  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 20 
  },
  actionButton: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
  },
  superLike: { transform: [{ scale: 0.9 }] },

  giftFloatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#FF2D55',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  // Modal Styles (same as before)
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalContent: { backgroundColor: 'white', margin: 20, borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  giftOptions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 20 },
  giftItem: { padding: 15, borderRadius: 50, backgroundColor: '#F0F0F0' },
  selectedGift: { backgroundColor: '#FFE6E6', borderWidth: 3, borderColor: '#FF2D55' },
  sendButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 30, marginTop: 20 },
  sendText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  addNote: { color: '#FF2D55', marginTop: 15, fontSize: 16 },
});