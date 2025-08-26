import { Tabs } from 'expo-router';
import React from 'react';
import {Platform, View} from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//Icon ION
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
        <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="home-sharp" size={size + 4} color="" />
                )
            }}
        />
        <Tabs.Screen
            name="kesehatan"
            options={{
                title: 'Kesehatan',
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="medical" size={size + 4} color="" />
                )
            }}
        />
      <Tabs.Screen
        name="darurat"
        options={{
            title: 'Darurat',
            tabBarIcon: ({ color, size}) => (
                <Ionicons name="alert-circle" size={size + 4} color="" />
            )
        }}
      />
        <Tabs.Screen
            name="info"
            options={{
                title: 'Informasi',
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="logo-ionic" size={size + 4} />
                )
            }}
        />
        <Tabs.Screen
            name="kerja"
            options={{
                title: 'Kerja',
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="briefcase" size={size + 4} />
                )
            }}
        />

    </Tabs>
  );
}
