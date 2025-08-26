import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // masuk ke tabs/home setelah 2 detik
            router.replace("/(tabs)/home");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-3xl font-bold text-blue-600">Sahabat Warga</Text>
            <ActivityIndicator size="large" color="blue" className="mt-4" />
        </View>
    );
}
