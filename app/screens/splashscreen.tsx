import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function SplashScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-3xl font-bold text-blue-500 mb-4">Sahabat Warga</Text>
            <ActivityIndicator size="large" color="#3B82F6" />
        </View>
    );
}