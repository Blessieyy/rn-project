import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userPassword = await AsyncStorage.getItem('userPassword');
        
        if (userEmail && userPassword) {
          console.log('Stored email:', userEmail);
          console.log('Stored password:', userPassword);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

export default HomeScreen;
