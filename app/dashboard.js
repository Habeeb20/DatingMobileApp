import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import colors from '../colors';
import { useLocalSearchParams } from 'expo-router';

const Dashboard = () => {
  const { token } = useLocalSearchParams();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/datingLogo.jpeg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Welcome to Your Dashboard</Text>
      <Text style={styles.subtitle}>You are logged in with token: {token}</Text>
      {/* Add dashboard content here, e.g., user profile, matches, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 30,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default Dashboard;