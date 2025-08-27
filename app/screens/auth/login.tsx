// app/screens/auth/login.tsx

import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../Context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Mohon isi semua field');
            return;
        }

        setLoading(true);
        const { error } = await signIn(email, password);

        // SETELAH MEMANGGIL signIn, JANGAN LAKUKAN APA-APA LAGI.
        // JANGAN TAMBAHKAN router.replace() DI SINI.
        // BIARKAN index.tsx YANG BEKERJA.

        if (error) {
            Alert.alert('Login Gagal', error.message);
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center px-6">
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
                            Selamat Datang
                        </Text>
                        <Text className="text-gray-600 text-center text-base">
                            Masuk ke akun Sahabat Warga Anda
                        </Text>
                    </View>
                    <View className="mb-6">
                        <Input
                            label="Email"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        <Input
                            label="Password"
                            placeholder="Masukkan password Anda"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password"
                        />
                    </View>
                    <Button
                        title="Masuk"
                        onPress={handleLogin}
                        loading={loading}
                        className="mb-4"
                    />
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-600">Belum punya akun? </Text>
                        <Link href="/screens/auth/register" asChild>
                            <Text className="text-blue-500 font-medium">Daftar sekarang</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}