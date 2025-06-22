import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Image,
} from 'react-native';
import {useRouter} from 'expo-router'
import logoImage from '../assets/images/logo-NC.png'
// Define types for props and state

function SignupScreen() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  // Format phone number as user types
  const formatPhoneNumber = (text: string): string => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length <= 3) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };
  
  const handlePhoneChange = (text: string): void => {
    // Only update if we don't exceed proper length
    if (text.replace(/\D/g, '').length <= 10) {
      setPhoneNumber(formatPhoneNumber(text));
    }
  };

  const handleContinue = (): void => {
    // Handle signup logic here
    console.log('Continue with phone number:', phoneNumber);
  };

  const openTerms = (): void => {
    Linking.openURL('https://neurocare.com/terms');
  };

  const openPrivacy = (): void => {
    Linking.openURL('https://neurocare.com/privacy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={logoImage} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>NeuroCARE</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>
            Enter your phone number to sign up for this app
          </Text>
          
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="(   )-000-0000"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.noSignUp} onPress={() => router.push("./Home")}>
              Continue without signing up</Text>
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By clicking continue, you agree to our{' '}
            <Text style={styles.termsLink} onPress={openTerms}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text style={styles.termsLink} onPress={openPrivacy}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noSignUp: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 17
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
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
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#1D1755',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  termsContainer: {
    marginTop: 20,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    lineHeight: 20,
  },
  termsLink: {
    color: '#1D1755',
    fontWeight: '500',
  },
});

export default SignupScreen;