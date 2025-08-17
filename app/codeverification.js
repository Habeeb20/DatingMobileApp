import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../colors';

const codeverification = ({ navigation }) => {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/datingLogo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>Check your email for a 4-digit code</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="1234"
        placeholderTextColor={colors.textSecondary}
        keyboardType="number-pad"
        maxLength={4}
        textAlign="center"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('onboarding3')}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '60%',
    height: 50,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default codeverification;