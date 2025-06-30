import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
//import { getMathQuestion, submitAnswer } from './services/mathService';
//import type { MathQuestion } from '../../types';

export default function MathExercises() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fetchNewQuestion = async (difficulty?: number) => {
    try {
      setLoading(true);
      fadeOut();
      const question = await getMathQuestion(difficulty);
      if (!question || !question.id) {
        throw new Error('Invalid question data received');
      }
      setCurrentQuestion(question);
      setUserAnswer('');
      setStartTime(Date.now());
      fadeIn();
    } catch (error) {
      console.error('Error fetching question:', error);
      Alert.alert(
        'Error',
        'Failed to load question. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const handleSubmit = async () => {
    if (!userAnswer || !currentQuestion) {
      Alert.alert('Error', 'Please enter an answer');
      return;
    }

    try {
      const timeTaken = Date.now() - startTime;
      const result = await submitAnswer(
        currentQuestion.id,
        parseInt(userAnswer),
        timeTaken
      );

      setQuestionsAnswered(prev => prev + 1);
      if (result.isCorrect) {
        setScore(prev => prev + 1);
        Alert.alert('Correct!', 'Great job! Let\'s try another one.');
      } else {
        Alert.alert('Incorrect', `The correct answer was ${result.correctAnswer}`);
      }

      fetchNewQuestion(currentQuestion.difficulty);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit answer. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1D1755" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Math Exercises</Text>
        <Text style={styles.score}>Score: {score}/{questionsAnswered}</Text>
      </View>

      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>
        
        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Enter your answer"
          keyboardType="numeric"
          maxLength={10}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => fetchNewQuestion(currentQuestion?.difficulty)}
        >
          <Text style={styles.skipButtonText}>Skip Question</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/Home')}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#1D1755',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1755',
    textAlign: 'center',
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1D1755',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#1D1755',
    borderRadius: 8,
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#1D1755',
    borderRadius: 8,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    borderWidth: 2,
    borderColor: '#1D1755',
    borderRadius: 8,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#1D1755',
    fontSize: 18,
    fontWeight: '600',
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

