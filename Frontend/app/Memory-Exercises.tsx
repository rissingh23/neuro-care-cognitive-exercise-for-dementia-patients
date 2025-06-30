import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

const CARD_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryExercises() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number } | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const initializeGame = (rows: number, cols: number) => {
    const totalPairs = (rows * cols) / 2;
    const values = [...CARD_COLORS.slice(0, totalPairs), ...CARD_COLORS.slice(0, totalPairs)];
    const shuffledCards = values
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setGridSize({ rows, cols });
    setGameStarted(true);
    setMoves(0);
    setMatches(0);
    setFlippedCards([]);
  };

  const handleCardPress = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].value === cards[secondCard].value) {
        // Match found
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatches(matches + 1);

        // Check if game is complete
        if (matches + 1 === (gridSize!.rows * gridSize!.cols) / 2) {
          Alert.alert(
            'Congratulations!',
            `You completed the game in ${moves + 1} moves!`,
            [
              {
                text: 'Play Again',
                onPress: () => setGameStarted(false),
              },
              {
                text: 'Home',
                onPress: () => router.push('/Home'),
              },
            ]
          );
        }
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstCard].isFlipped = false;
          resetCards[secondCard].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.subtitle}>Select grid size</Text>
        
        <View style={styles.gridOptionsContainer}>
          <TouchableOpacity
            style={styles.gridOption}
            onPress={() => initializeGame(2, 4)}
          >
            <Text style={styles.gridOptionText}>2 x 4</Text>
            <Text style={styles.gridOptionDescription}>8 cards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridOption}
            onPress={() => initializeGame(3, 4)}
          >
            <Text style={styles.gridOptionText}>3 x 4</Text>
            <Text style={styles.gridOptionDescription}>12 cards</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/Home')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.statsText}>Moves: {moves}</Text>
        <Text style={styles.statsText}>Matches: {matches}</Text>
      </View>

      <View style={styles.gameBoard}>
        {Array.from({ length: gridSize!.rows }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: gridSize!.cols }).map((_, colIndex) => {
              const cardIndex = rowIndex * gridSize!.cols + colIndex;
              const card = cards[cardIndex];
              return (
                <TouchableOpacity
                  key={cardIndex}
                  style={[
                    styles.card,
                    card.isFlipped && { backgroundColor: card.value },
                    card.isMatched && styles.matchedCard,
                  ]}
                  onPress={() => handleCardPress(cardIndex)}
                  activeOpacity={0.7}
                >
                  {!card.isFlipped && <Text style={styles.cardText}>?</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setGameStarted(false)}
      >
        <Text style={styles.backButtonText}>New Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1755',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  gridOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  gridOption: {
    backgroundColor: '#1D1755',
    borderRadius: 15,
    padding: 20,
    width: '45%',
    alignItems: 'center',
  },
  gridOptionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gridOptionDescription: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    color: '#1D1755',
    fontWeight: '600',
  },
  gameBoard: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  card: {
    width: 70,
    height: 70,
    backgroundColor: '#1D1755',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  matchedCard: {
    opacity: 0.7,
  },
  backButton: {
    backgroundColor: '#1D1755',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

