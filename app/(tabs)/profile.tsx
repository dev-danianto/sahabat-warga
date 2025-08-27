import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../Context/AuthContext'
import { PostCard } from '../../components/PostCard'
import { supabase, Post } from '@/lib/supabase'
import { router } from 'expo-router'

export default function ProfileScreen() {
    const { user, signOut, updateProfile } = useAuth()
    const [editing, setEditing] = useState(false)
    const [userStats, setUserStats] = useState({ posts: 0, followers: 0, following: 0 })
    const [userPosts, setUserPosts] = useState<Post[]>([])

    const [name, setName] = useState(user?.name || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [phone, setPhone] = useState(user?.phone || '')

    useEffect(() => {
        if (user) {
            setName(user.name)
            setBio(user.bio || '')
            setPhone(user.phone || '')
            fetchUserStats()
            fetchUserPosts()
        }
    }, [user])

    const fetchUserStats = async () => {
        if (!user) return
        const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('user_id', user.user_id)
        const { count: followersCount } = await supabase.from('followers').select('*', { count: 'exact', head: true }).eq('followed_id', user.user_id)
        const { count: followingCount } = await supabase.from('followers').select('*', { count: 'exact', head: true }).eq('follower_id', user.user_id)
        setUserStats({ posts: postsCount || 0, followers: followersCount || 0, following: followingCount || 0 })
    }

    const fetchUserPosts = async () => {
        if (!user) return
        const { data, error } = await supabase.from('posts').select(`*, users (*), comments(*), likes(*) `).eq('user_id', user.user_id).order('created_at', { ascending: false })
        if (error) return
        const postsWithCounts = data?.map(post => ({ ...post, like_count: post.likes?.length || 0, comment_count: post.comments?.length || 0 })) || []
        setUserPosts(postsWithCounts)
    }

    const handleSaveProfile = async () => {
        const { error } = await updateProfile({ name, bio, phone })
        if (error) {
            Alert.alert('Error', 'Gagal memperbarui profil')
        } else {
            setEditing(false)
            Alert.alert('Berhasil', 'Profil berhasil diperbarui')
        }
    }

    const handleSignOut = async () => {
        await signOut()
        router.replace('/screens/auth/login')
    }

    const confirmSignOut = () => {
        Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar?', [ { text: 'Batal', style: 'cancel' }, { text: 'Keluar', style: 'destructive', onPress: handleSignOut }])
    }

    const renderPost = ({ item }: { item: Post }) => <PostCard post={item} />

    const renderProfileHeader = () => (
        <View className="bg-white">
            <View className="h-32 bg-blue-500" />
            <View className="px-4 pb-4">
                <View className="flex-row items-end -mt-12">
                    <Avatar uri={user?.avatar_url} name={user?.name || 'U'} size={80} />
                    <View className="flex-1 ml-4 mt-12 flex-row justify-between items-center">
                        {editing ? null : (
                            <Button title="Edit Profil" variant="outline" size="sm" onPress={() => setEditing(true)} />
                        )}
                    </View>
                </View>
                <View className="mt-4">
                    {editing ? (
                        <>
                            <Input value={name} onChangeText={setName} placeholder="Nama" />
                            <Input value={bio} onChangeText={setBio} placeholder="Bio" multiline />
                            <Input value={phone} onChangeText={setPhone} placeholder="Nomor Telepon" keyboardType="phone-pad" />
                            <View className="flex-row mt-2">
                                <Button title="Simpan" onPress={handleSaveProfile} className="flex-1 mr-2" />
                                <Button title="Batal" variant="outline" onPress={() => setEditing(false)} className="flex-1" />
                            </View>
                        </>
                    ) : (
                        <>
                            <Text className="text-xl font-bold text-gray-900">{user?.name}</Text>
                            <Text className="text-gray-600 text-sm">{user?.email}</Text>
                            <Text className="text-gray-700 text-sm leading-5 mt-2">{user?.bio || 'Belum ada bio.'}</Text>
                        </>
                    )}
                </View>
                <View className="flex-row justify-around mt-6 pt-4 border-t border-gray-200">
                    <View className="items-center"><Text className="text-xl font-bold text-gray-900">{userStats.posts}</Text><Text className="text-gray-600 text-sm">Postingan</Text></View>
                    <View className="items-center"><Text className="text-xl font-bold text-gray-900">{userStats.followers}</Text><Text className="text-gray-600 text-sm">Pengikut</Text></View>
                    <View className="items-center"><Text className="text-xl font-bold text-gray-900">{userStats.following}</Text><Text className="text-gray-600 text-sm">Mengikuti</Text></View>
                </View>
            </View>
            <View className="bg-gray-50 px-4 py-3 border-y border-gray-200">
                <Text className="text-lg font-semibold text-gray-900">Postingan Saya</Text>
            </View>
        </View>
    )

    const renderEmpty = () => (
        <View className="bg-white flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg mt-4 text-center">Anda belum membuat postingan.</Text>
        </View>
    )

    return (
        <View className="flex-1 bg-gray-50">
            <FlatList
                data={userPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.post_id.toString()}
                ListHeaderComponent={renderProfileHeader}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity onPress={confirmSignOut} className="absolute top-12 right-4 bg-white/30 rounded-full p-2">
                <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}