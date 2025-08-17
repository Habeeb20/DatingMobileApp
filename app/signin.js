import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors';
import { useNavigation } from 'expo-router';

const SignIn = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Go Back</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignIn;