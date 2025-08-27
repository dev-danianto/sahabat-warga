import React, { useEffect } from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import { PostCard } from '../../components/PostCard'
import { useData } from '../../Context/DataContext'
import { Post } from '@/lib/supabase'

export default function KerjaScreen() {
    const { posts, refreshing, fetchPosts, refreshPosts } = useData()

    useEffect(() => {
        fetchPosts('kerja')
    }, [])

    const renderPost = ({ item }: { item: Post }) => (
        <PostCard post={item} />
    )

    const renderEmpty = () => (
        <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg text-center">
                Belum ada info lowongan pekerjaan.
            </Text>
        </View>
    )

    return (
        <View className="flex-1 bg-gray-50">
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.post_id.toString()}
                contentContainerStyle={{ padding: 16, paddingTop: 0 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => refreshPosts('kerja')} />
                }
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}