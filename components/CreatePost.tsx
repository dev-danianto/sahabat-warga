// components/CreatePost.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './ui/Button';
import { useData } from '../Context/DataContext';
import { PostType } from '@/lib/supabase';

interface CreatePostProps {
    visible: boolean;
    onClose: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ visible, onClose }) => {
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState<PostType>('general');
    const [loading, setLoading] = useState(false);
    const { createPost } = useData();

    const postTypes = [
        { value: 'general' as PostType, label: 'Umum', icon: 'chatbubble', color: '#6B7280' },
        { value: 'medis' as PostType, label: 'Kesehatan', icon: 'medical', color: '#059669' },
        { value: 'darurat' as PostType, label: 'Darurat', icon: 'alert-circle', color: '#DC2626' },
        { value: 'video' as PostType, label: 'Video/Info', icon: 'videocam', color: '#7C3AED' },
        { value: 'kerja' as PostType, label: 'Pekerjaan', icon: 'briefcase', color: '#2563EB' },
    ];

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert('Error', 'Mohon isi konten postingan');
            return;
        }

        setLoading(true);
        const { error } = await createPost(content, postType);

        if (error) {
            Alert.alert('Error', 'Gagal membuat postingan');
        } else {
            setContent('');
            setPostType('general');
            onClose();
            Alert.alert('Berhasil', 'Postingan berhasil dibuat');
        }
        setLoading(false);
    };

    const handleClose = () => {
        setContent('');
        setPostType('general');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={handleClose}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold">Buat Postingan</Text>
                    <Button
                        title="Posting"
                        onPress={handleSubmit}
                        loading={loading}
                        size="sm"
                        disabled={!content.trim()}
                    />
                </View>

                <ScrollView className="flex-1">
                    {/* Content Input */}
                    <View className="p-4">
                        <TextInput
                            value={content}
                            onChangeText={setContent}
                            placeholder="Apa yang ingin Anda bagikan?"
                            multiline
                            className="text-base text-gray-900 min-h-32"
                            textAlignVertical="top"
                            autoFocus
                        />
                    </View>

                    {/* Post Type Selection */}
                    <View className="p-4 border-t border-gray-200">
                        <Text className="text-base font-semibold text-gray-900 mb-3">
                            Kategori Postingan
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                            {postTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.value}
                                    onPress={() => setPostType(type.value)}
                                    className={`
                    flex-row items-center px-4 py-2 rounded-full border
                    ${postType === type.value
                                        ? 'bg-blue-50 border-blue-500'
                                        : 'bg-gray-50 border-gray-300'
                                    }
                  `}
                                >
                                    <Ionicons
                                        name={type.icon as any}
                                        size={18}
                                        color={postType === type.value ? '#2563EB' : type.color}
                                    />
                                    <Text
                                        className={`ml-2 text-sm font-medium ${
                                            postType === type.value ? 'text-blue-600' : 'text-gray-700'
                                        }`}
                                    >
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Post Type Description */}
                    <View className="p-4 bg-gray-50 mx-4 rounded-lg">
                        <Text className="text-sm text-gray-600">
                            {postType === 'general' && 'Postingan umum untuk berbagi informasi atau diskusi sehari-hari.'}
                            {postType === 'medis' && 'Postingan terkait kesehatan, tips medis, atau konsultasi kesehatan.'}
                            {postType === 'darurat' && 'Laporan situasi darurat atau permintaan bantuan mendesak.'}
                            {postType === 'video' && 'Konten video, tutorial, atau informasi multimedia.'}
                            {postType === 'kerja' && 'Informasi lowongan pekerjaan atau peluang karir.'}
                        </Text>
                    </View>

                    {/* Additional Options */}
                    <View className="p-4">
                        <TouchableOpacity
                            className="flex-row items-center py-3 border-b border-gray-200"
                            onPress={() => Alert.alert('Info', 'Fitur upload gambar segera hadir!')}
                        >
                            <Ionicons name="image-outline" size={24} color="#6B7280" />
                            <Text className="ml-3 text-base text-gray-700">Tambah Gambar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center py-3 border-b border-gray-200"
                            onPress={() => Alert.alert('Info', 'Fitur lokasi segera hadir!')}
                        >
                            <Ionicons name="location-outline" size={24} color="#6B7280" />
                            <Text className="ml-3 text-base text-gray-700">Tambah Lokasi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};