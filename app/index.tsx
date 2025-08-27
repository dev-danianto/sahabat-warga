// app/index.tsx

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../Context/AuthContext';

export default function Index() {
    const { user, loading } = useAuth();

    useEffect(() => {
        // Jangan lakukan apa-apa selagi status auth masih dicek
        if (loading) {
            return;
        }

        // Ini adalah satu-satunya tempat Anda mengatur navigasi
        if (user) {
            // Jika ada user (sudah login), paksa pindah ke tabs
            router.replace('/(tabs)/home');
        } else {
            // Jika tidak ada user, paksa pindah ke login
            router.replace('/screens/auth/login');
        }
    }, [user, loading]);

    // Tampilkan layar loading selagi useEffect bekerja
    return (
        <View className="flex-1 bg-blue-500 items-center justify-center">
            <Text className="text-white text-2xl font-bold mb-4">
                Sahabat Warga
            </Text>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}