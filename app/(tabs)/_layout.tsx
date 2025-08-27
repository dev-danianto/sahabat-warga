import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CreatePost } from '../../components/CreatePost';

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
    const [showCreatePost, setShowCreatePost] = useState(false);

    return (
        <View className="flex-1 bg-white">
            <View className="pt-10 pb-4 px-4 flex-row items-center justify-between border-b border-gray-200">
                <Text className="text-xl font-bold">Sahabat Warga</Text>
                <View className="flex-row gap-4">
                    <TouchableOpacity onPress={() => alert("Fitur chat segera hadir!")}>
                        <Ionicons name="chatbubble-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowCreatePost(true)}>
                        <Ionicons name="add-circle-outline" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TopTabs
                screenOptions={{
                    tabBarShowIcon: true,
                    tabBarIndicatorStyle: { backgroundColor: "#3B82F6" },
                    tabBarStyle: { elevation: 0 },
                    tabBarLabel: () => "",
                }}
            >
                <TopTabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-sharp" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="kesehatan"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="medical" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="darurat"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="alert-circle" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="info"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="videocam" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="kerja"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="briefcase" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person" size={22} color="black" />
                        ),
                    }}
                />
            </TopTabs>
            <CreatePost
                visible={showCreatePost}
                onClose={() => setShowCreatePost(false)}
            />
        </View>
    );
}