import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Footer from './others/Footer';

const Dashboard = () => {
  const { token } = useLocalSearchParams();
  const router = useRouter();

  const navigateToScreen = (screen) => {
    router.push(`/${screen}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/images/datingLogo.jpeg')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Welcome to Your Dashboard</Text>
      
     
      </ScrollView>
          <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    padding: 30,
  },
  scrollContent: {
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: colors.textPrimary,
    fontSize: 12,
    marginTop: 5,
  },
});

export default Dashboard;