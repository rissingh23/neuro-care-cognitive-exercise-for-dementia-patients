import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MemoryGame() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Memory Game</Text>
      <Text style={styles.subtext}>[2×3 & 3×4 card grid goes here]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  header: { fontSize:24, marginBottom:16 },
  subtext: { fontSize:16, color:'#666' },
});
