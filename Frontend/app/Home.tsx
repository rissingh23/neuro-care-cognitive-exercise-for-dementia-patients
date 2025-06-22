// app/index.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View>
    <TouchableOpacity
      style={styles.loginButton}
      onPress={() => router.push('/')}
      ><Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>


    <View style={styles.buttonContainer}>
      <Text style={styles.title}>Neuro-Care</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Memory-Exercises')}
      >
        <Text style={styles.buttonText}>Play Memory Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/Math-Exercises')}
      >
        <Text style={styles.buttonText}>Play Math Game</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#467fd0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: 'center',
    marginTop: 50,
  },
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  title:     { fontSize:28, marginBottom:32 },
  button:    { backgroundColor:'#467fd0', padding:12, borderRadius:8, marginVertical:8 },
  buttonText:{ color:'#fff', fontSize:18 },
    buttonContainer: {
      flexDirection: 'row',    // align buttons horizontally
      justifyContent: 'center', // center horizontally
      alignItems: 'center',     // center vertically
    },
    buttonImage: {
      width: 100,    // set your desired width
      height: 100,   // set your desired height
      margin: 10,    // optional spacing between images
    },
  
});
