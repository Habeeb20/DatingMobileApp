import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors';

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [dateOfBirth, setDateOfBirth] = useState(new Date('1990-01-01'));
  const [gender, setGender] = useState('male');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150'); // Placeholder URL
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/datingLogo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Image
        source={{ uri: profilePicture }}
        style={styles.profilePicture}
        resizeMode="cover"
      />
      <Text style={styles.title}>Edit your profile</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor={colors.textSecondary}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.inputText}>
          {dateOfBirth.toLocaleDateString('en-US')}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Gender (male/female/other)"
        placeholderTextColor={colors.textSecondary}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle save logic here (e.g., API call to backend)
          navigation.navigate('home'); // Replace with actual home route
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={onDateChange}
          maximumDate={new Date()} // Restrict to past dates
          style={styles.datePicker}
          textColor={colors.textPrimary}
          accentColor={colors.primary} // Highlight color for selected date
          themeVariant="light"
        />
      )}
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
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: colors.textPrimary,
    justifyContent: 'center',
  },
  inputText: {
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '85%',
    marginTop: 10,
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
  datePicker: {
    backgroundColor: colors.background,
    width: '80%',
  },
});

export default Profile;