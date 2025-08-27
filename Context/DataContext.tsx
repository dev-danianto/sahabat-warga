import React, { createContext, useContext, useState, ReactNode } from 'react'
import { supabase, Post, PostType } from '@/lib/supabase'
import { useAuth } from './AuthContext'

interface DataContextType {
    posts: Post[]
    loading: boolean
    refreshing: boolean
    fetchPosts: (postType?: PostType) => Promise<void>
    createPost: (content: string, postType: PostType, mediaUrl?: string) => Promise<{ error: any }>
    likePost: (postId: number) => Promise<{ error: any }>
    unlikePost: (postId: number) => Promise<{ error: any }>
    addComment: (postId: number, content: string) => Promise<{ error: any }>
    refreshPosts: (postType?: PostType) => Promise<void>
}

const DataContext = createContext<DataContextType>({} as DataContextType)

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useData must be used within a DataProvider')
    }
    return context
}

interface DataProviderProps {
    children: ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const { user } = useAuth()

    const fetchPosts = async (postType?: PostType) => {
        try {
            setLoading(true)
            let query = supabase
                .from('posts')
                .select(`
                    *,
                    users (user_id, name, avatar_url),
                    comments (*, users (user_id, name, avatar_url)),
                    likes (*, users (user_id, name))
                `)
                .order('created_at', { ascending: false })

            if (postType) {
                query = query.eq('post_type', postType)
            }

            const { data, error } = await query

            if (error) throw error

            const postsWithCounts = data?.map(post => ({
                ...post,
                like_count: post.likes?.length || 0,
                comment_count: post.comments?.length || 0,
            })) || []

            setPosts(postsWithCounts)
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const refreshPosts = async (postType?: PostType) => {
        setRefreshing(true)
        await fetchPosts(postType)
        setRefreshing(false)
    }

    const createPost = async (content: string, postType: PostType, mediaUrl?: string) => {
        try {
            if (!user) throw new Error('User not authenticated')
            const { data, error } = await supabase
                .from('posts')
                .insert([{ user_id: user.user_id, content, post_type: postType, media_url: mediaUrl }])
                .select(`*, users (user_id, name, avatar_url)`)
                .single()

            if (error) throw error

            const newPost = { ...data, comments: [], likes: [], like_count: 0, comment_count: 0 }
            setPosts(prev => [newPost, ...prev])
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const likePost = async (postId: number) => {
        try {
            if (!user) throw new Error('User not authenticated')
            const { error } = await supabase.from('likes').insert([{ post_id: postId, user_id: user.user_id }])
            if (error) throw error

            setPosts(prev => prev.map(post =>
                post.post_id === postId
                    ? {
                        ...post,
                        like_count: (post.like_count || 0) + 1,
                        likes: [...(post.likes || []), { like_id: Date.now(), post_id: postId, user_id: user.user_id, created_at: new Date().toISOString(), users: user }]
                    }
                    : post
            ))
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const unlikePost = async (postId: number) => {
        try {
            if (!user) throw new Error('User not authenticated')
            const { error } = await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.user_id)
            if (error) throw error

            setPosts(prev => prev.map(post =>
                post.post_id === postId
                    ? {
                        ...post,
                        like_count: Math.max((post.like_count || 0) - 1, 0),
                        likes: (post.likes || []).filter(like => like.user_id !== user.user_id)
                    }
                    : post
            ))
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const addComment = async (postId: number, content: string) => {
        try {
            if (!user) throw new Error('User not authenticated')
            const { data, error } = await supabase
                .from('comments')
                .insert([{ post_id: postId, user_id: user.user_id, content }])
                .select(`*, users (user_id, name, avatar_url)`)
                .single()

            if (error) throw error
            setPosts(prev => prev.map(post =>
                post.post_id === postId
                    ? {
                        ...post,
                        comment_count: (post.comment_count || 0) + 1,
                        comments: [...(post.comments || []), data]
                    }
                    : post
            ))
            return { error: null }
        } catch (error) {
            return { error }
        }
    }

    const value = {
        posts,
        loading,
        refreshing,
        fetchPosts,
        createPost,
        likePost,
        unlikePost,
        addComment,
        refreshPosts,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}