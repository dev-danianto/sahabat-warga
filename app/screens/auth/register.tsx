import React, { useState } from 'react'
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Link, router } from 'expo-router'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { useAuth } from '../../../Context/AuthContext'

export default function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Error', 'Mohon isi semua field yang wajib')
            return
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password tidak cocok')
            return
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password minimal 6 karakter')
            return
        }
        setLoading(true)
        const { error } = await signUp(email, password, { name, phone })

        if (error) {
            Alert.alert('Registrasi Gagal', error.message)
        } else {
            Alert.alert(
                'Registrasi Berhasil',
                'Silakan Login',
                [{ text: 'OK', onPress: () => router.replace('/screens/auth/login') }]
            )
        }

        setLoading(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center px-6 py-8">
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
                            Daftar Akun Baru
                        </Text>
                        <Text className="text-gray-600 text-center text-base">
                            Bergabunglah dengan komunitas Sahabat Warga
                        </Text>
                    </View>
                    <View className="mb-6">
                        <Input
                            label="Nama Lengkap *"
                            placeholder="Masukkan nama lengkap Anda"
                            value={name}
                            onChangeText={setName}
                            autoComplete="name"
                        />
                        <Input
                            label="Email *"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        <Input
                            label="Nomor Telepon"
                            placeholder="Masukkan nomor telepon Anda"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                        />
                        <Input
                            label="Password *"
                            placeholder="Masukkan password (min. 6 karakter)"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password-new"
                        />
                        <Input
                            label="Konfirmasi Password *"
                            placeholder="Masukkan ulang password Anda"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoComplete="password-new"
                        />
                    </View>
                    <Button
                        title="Daftar"
                        onPress={handleRegister}
                        loading={loading}
                        className="mb-4"
                    />
                    <View className="flex-row justify-center items-center">
                        <Text className="text-gray-600">Sudah punya akun? </Text>
                        <Link href="/screens/auth/login" asChild>
                            <Text className="text-blue-500 font-medium">Masuk sekarang</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}