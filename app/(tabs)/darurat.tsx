import React, { useEffect } from 'react'
import { View, FlatList, RefreshControl, Text, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PostCard } from '../../components/PostCard'
import { useData } from '../../Context/DataContext'

import { Post } from '@/lib/supabase'

export default function DaruratScreen() {
    const { posts, refreshing, fetchPosts, refreshPosts } = useData()

    useEffect(() => {
        fetchPosts('darurat')
    }, [])

    const handleEmergencyCall = () => {
        Alert.alert(
            'Panggilan Darurat',
            'Pilih nomor darurat yang ingin dihubungi:',
            [
                { text: 'Polisi (110)', onPress: () => {} },
                { text: 'Ambulans (119)', onPress: () => {} },
                { text: 'Pemadam Kebakaran (113)', onPress: () => {} },
                { text: 'Batal', style: 'cancel' },
            ]
        )
    }

    const renderPost = ({ item }: { item: Post }) => (
        <PostCard post={item} />
    )

    const renderHeader = () => (
        <View className="mb-4">
            <View className="bg-red-500 rounded-lg p-4 mb-4">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-1">Butuh Bantuan Cepat?</Text>
                        <Text className="text-red-100 text-sm">Gunakan tombol panggilan darurat.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleEmergencyCall}
                        className="bg-white rounded-full p-3 shadow"
                    >
                        <Ionicons name="call" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text className="text-lg font-semibold text-gray-900 mb-2">Laporan Darurat Terbaru</Text>
        </View>
    )

    const renderEmpty = () => (
        <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg text-center">
                Tidak ada laporan darurat.{'\n'}Semoga semua aman!
            </Text>
        </View>
    )

    return (
        <View className="flex-1 bg-gray-50">
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.post_id.toString()}
                contentContainerStyle={{ padding: 16, paddingTop: 16 }}
                ListHeaderComponent={renderHeader}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => refreshPosts('darurat')} />
                }
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}