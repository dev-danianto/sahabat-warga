// components/PostCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from './ui/Avatar';
import { useAuth } from '../Context/AuthContext';
import { useData } from '../Context/DataContext';
import { Post } from '@/lib/supabase';

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { user } = useAuth();
    const { likePost, unlikePost, addComment } = useData();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const isLiked = post.likes?.some(like => like.user_id === user?.user_id) || false;

    const handleLike = async () => {
        if (!user) return;

        if (isLiked) {
            await unlikePost(post.post_id);
        } else {
            await likePost(post.post_id);
        }
    };

    const handleAddComment = async () => {
        if (!commentText.trim() || !user) return;

        setLoading(true);
        const { error } = await addComment(post.post_id, commentText);

        if (error) {
            Alert.alert('Error', 'Gagal menambahkan komentar');
        } else {
            setCommentText('');
        }
        setLoading(false);
    };

    const getPostTypeIcon = () => {
        switch (post.post_type) {
            case 'medis':
                return 'medical';
            case 'darurat':
                return 'alert-circle';
            case 'video':
                return 'videocam';
            case 'kerja':
                return 'briefcase';
            default:
                return 'chatbubble';
        }
    };

    const getPostTypeColor = () => {
        switch (post.post_type) {
            case 'medis':
                return 'text-green-600';
            case 'darurat':
                return 'text-red-600';
            case 'video':
                return 'text-purple-600';
            case 'kerja':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Baru saja';
        if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
        return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
    };

    return (
        <View className="bg-white rounded-lg mb-4 shadow-sm border border-gray-200">
            {/* Header */}
            <View className="flex-row items-center p-4 pb-2">
                <Avatar
                    uri={post.users?.avatar_url}
                    name={post.users?.name || 'User'}
                    size={40}
                />
                <View className="ml-3 flex-1">
                    <View className="flex-row items-center">
                        <Text className="font-semibold text-gray-900">
                            {post.users?.name || 'User'}
                        </Text>
                        <Ionicons
                            name={getPostTypeIcon()}
                            size={16}
                            className={`ml-2 ${getPostTypeColor()}`}
                            color={post.post_type === 'medis' ? '#059669' :
                                post.post_type === 'darurat' ? '#DC2626' :
                                    post.post_type === 'video' ? '#7C3AED' :
                                        post.post_type === 'kerja' ? '#2563EB' : '#6B7280'}
                        />
                    </View>
                    <Text className="text-gray-500 text-sm">
                        {formatDate(post.created_at)}
                    </Text>
                </View>
            </View>

            {/* Content */}
            {post.content && (
                <View className="px-4 pb-2">
                    <Text className="text-gray-800 text-base leading-5">
                        {post.content}
                    </Text>
                </View>
            )}

            {/* Media */}
            {post.media_url && (
                <View className="mb-2">
                    <Image
                        source={{ uri: post.media_url }}
                        className="w-full h-64"
                        resizeMode="cover"
                    />
                </View>
            )}

            {/* Actions */}
            <View className="px-4 py-2 border-t border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity
                            onPress={handleLike}
                            className="flex-row items-center"
                        >
                            <Ionicons
                                name={isLiked ? 'heart' : 'heart-outline'}
                                size={24}
                                color={isLiked ? '#DC2626' : '#6B7280'}
                            />
                            <Text className="ml-2 text-gray-600 text-sm">
                                {post.like_count || 0}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowComments(!showComments)}
                            className="flex-row items-center"
                        >
                            <Ionicons
                                name="chatbubble-outline"
                                size={24}
                                color="#6B7280"
                            />
                            <Text className="ml-2 text-gray-600 text-sm">
                                {post.comment_count || 0}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Comments Section */}
            {showComments && (
                <View className="px-4 pb-4 border-t border-gray-100">
                    {/* Add Comment */}
                    <View className="flex-row items-center mt-3">
                        <Avatar
                            uri={user?.avatar_url}
                            name={user?.name || 'U'}
                            size={32}
                        />
                        <View className="flex-1 ml-3 flex-row">
                            <TextInput
                                value={commentText}
                                onChangeText={setCommentText}
                                placeholder="Tulis komentar..."
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
                                multiline
                            />
                            <TouchableOpacity
                                onPress={handleAddComment}
                                disabled={!commentText.trim() || loading}
                                className="bg-blue-500 rounded-full px-4 py-2 justify-center"
                            >
                                <Ionicons name="send" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Comments List */}
                    {post.comments && post.comments.length > 0 && (
                        <View className="mt-4">
                            {post.comments.map((comment) => (
                                <View key={comment.comment_id} className="flex-row mb-3">
                                    <Avatar
                                        uri={comment.users?.avatar_url}
                                        name={comment.users?.name || 'User'}
                                        size={28}
                                    />
                                    <View className="ml-2 flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                        <Text className="font-semibold text-gray-900 text-sm">
                                            {comment.users?.name || 'User'}
                                        </Text>
                                        <Text className="text-gray-800 text-sm">
                                            {comment.content}
                                        </Text>
                                        <Text className="text-gray-500 text-xs mt-1">
                                            {formatDate(comment.created_at)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};