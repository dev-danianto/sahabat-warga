import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://qamkbebxniswwqrnytim.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbWtiZWJ4bmlzd3dxcm55dGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjgzNDAsImV4cCI6MjA3MTgwNDM0MH0.5Xq9UAGu9fgAlg9iiobnM3J2ti8Sg0sNAag5gdw9AVA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

export type PostType = 'general' | 'medis' | 'darurat' | 'video' | 'kerja'
export type ChatParticipantRole = 'member' | 'admin'
export type ReminderRepeatType = 'once' | 'daily' | 'weekly'
export type ReminderStatus = 'active' | 'done'
export type FriendStatus = 'pending' | 'accepted' | 'blocked'
export type TicketCategory = 'teknis' | 'kesehatan' | 'darurat' | 'lainnya'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface User {
    user_id: string
    name: string
    email: string
    phone?: string
    bio?: string
    avatar_url?: string
    created_at: string
    updated_at: string
}

export interface Post {
    post_id: number
    user_id: string
    content?: string
    media_url?: string
    post_type: PostType
    created_at: string
    updated_at: string
    users?: User
    comments?: Comment[]
    likes?: Like[]
    like_count?: number
    comment_count?: number
}

export interface Comment {
    comment_id: number
    post_id: number
    user_id: string
    content: string
    created_at: string
    users?: User
}

export interface Like {
    like_id: number
    post_id: number
    user_id: string
    created_at: string
    users?: User
}

export interface Chat {
    chat_id: number
    is_group: boolean
    created_at: string
    chat_participants?: ChatParticipant[]
    messages?: Message[]
}

export interface ChatParticipant {
    chat_id: number
    user_id: string
    role: ChatParticipantRole
    users?: User
}

export interface Message {
    message_id: number
    chat_id: number
    sender_id: string
    content?: string
    media_url?: string
    created_at: string
    users?: User
}

export interface Reminder {
    reminder_id: number
    user_id: string
    title: string
    description?: string
    reminder_time: string
    repeat_type: ReminderRepeatType
    status: ReminderStatus
    created_at: string
}

export interface Friend {
    user_id: string
    friend_id: string
    status: FriendStatus
    users?: User
}

export interface Follower {
    follower_id: string
    followed_id: string
    created_at: string
    followers?: User
    followed?: User
}

export interface SupportTicket {
    ticket_id: number
    user_id: string
    category: TicketCategory
    description: string
    status: TicketStatus
    created_at: string
    users?: User
}