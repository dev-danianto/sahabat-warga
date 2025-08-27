import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Tidak Ditemukan' }} />
            <View className="flex-1 items-center justify-center p-5 bg-gray-50">
                <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
                <Text className="text-2xl font-bold mt-4 text-gray-800">
                    Halaman Tidak Ditemukan
                </Text>
                <Text className="text-base text-gray-500 mt-2 text-center">
                    Maaf, kami tidak dapat menemukan halaman yang Anda cari.
                </Text>
                <Link href="/" className="mt-6 py-3 px-6 bg-blue-500 rounded-lg">
                    <Text className="text-base font-semibold text-white">
                        Kembali ke Beranda
                    </Text>
                </Link>
            </View>
        </>
    );
}