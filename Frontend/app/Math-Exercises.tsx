import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MathGame() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Math Game</Text>
      <Text style={styles.subtext}>[Adaptive multiple-choice math questions go here]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20 },
  header: { fontSize:24, marginBottom:16 },
  subtext: { fontSize:16, color:'#666' },
});
