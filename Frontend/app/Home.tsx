// app/index.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import logoImage from '../assets/images/logo-NC.png';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={logoImage} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>NeuroCARE</Text>
      </View>

      <View style={styles.gamesContainer}>
        <Text style={styles.subtitle}>Choose your exercise</Text>
        
        <TouchableOpacity
          style={styles.gameButton}
          onPress={() => router.push('/Memory-Exercises')}
        >
          <Text style={styles.gameButtonText}>Memory Game</Text>
          <Text style={styles.gameDescription}>Train your memory with card matching</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gameButton}
          onPress={() => router.push('/Math-Exercises')}
        >
          <Text style={styles.gameButtonText}>Math Exercises</Text>
          <Text style={styles.gameDescription}>Practice arithmetic skills</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1D1755',
  },
  loginButtonText: {
    color: '#1D1755',
    fontSize: 16,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  logoText: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#1D1755',
    marginTop: 0,
  },
  gamesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  gameButton: {
    backgroundColor: '#1D1755',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gameButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gameDescription: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
});

