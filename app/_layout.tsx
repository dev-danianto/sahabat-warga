import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { AuthProvider, useAuth } from "../Context/AuthContext";
import { DataProvider } from "../Context/DataContext";
import { useEffect } from "react";
import React from "react";

function AuthRedirect() {
    const { user, loading } = useAuth();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            router.replace('/(tabs)/home');
        } else {
            router.replace('/screens/auth/login');
        }
    }, [user, loading]);

    return null;
}

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
                <DataProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="screens/splashscreen" />
                        <Stack.Screen name="screens/auth/login" />
                        <Stack.Screen name="screens/auth/register" />
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <AuthRedirect />
                    <StatusBar style="auto" />
                </DataProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}