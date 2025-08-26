import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
    return (
        <View style={{ flex: 1 }}>
            {/* 🔹 Custom Header */}
            <View
                style={{
                    paddingTop: 35, // space for status bar
                    paddingBottom: 18,
                    paddingHorizontal: 16,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 0,
                    borderColor: "#ddd",
                }}
            >
                {/* Left text */}
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Sahabat Warga
                </Text>

                {/* Right buttons */}
                <View style={{ flexDirection: "row", gap: 16 }}>
                    <TouchableOpacity onPress={() => alert("Tes Berhasil!")}>
                        <Ionicons name="chatbubble-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("Tes Berhasil!")}>
                        <Ionicons name="add-circle-outline" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 🔹 Tabs */}
            <TopTabs
                screenOptions={{
                    tabBarShowIcon: true,
                    tabBarIndicatorStyle: { backgroundColor: "blue" },
                    tabBarStyle: { backgroundColor: "white", elevation: 0 },
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarItemStyle: { paddingVertical: 0 },
                    tabBarIconStyle: {
                        alignItems: "center",
                        justifyContent: "center", // 👈 bikin icon tepat di tengah
                    },
                }}
            >
                <TopTabs.Screen
                    name="home"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-sharp" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="kesehatan"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="medical" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="darurat"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="alert-circle" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="info"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="videocam" size={22} color="black" />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="kerja"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="briefcase" size={22} color="black" />
                        ),
                    }}
                />

                <TopTabs.Screen
                    name="profile"
                    options={{
                        title: "",
                        contentStyle: { marginTop: 0, paddingTop: 0 },
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person" size={22} color="black" />
                        ),
                    }}
                />
            </TopTabs>
        </View>
    );
}
