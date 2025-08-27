// components/ui/Avatar.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
    uri?: string;
    name: string;
    size?: number;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
                                                  uri,
                                                  name,
                                                  size = 40,
                                                  className = '',
                                              }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const containerStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
    };

    if (uri) {
        return (
            <Image
                source={{ uri }}
                style={containerStyle}
                className={`bg-gray-300 ${className}`}
                resizeMode="cover"
            />
        );
    }

    return (
        <View
            style={containerStyle}
            className={`bg-blue-500 items-center justify-center ${className}`}
        >
            <Text
                className="text-white font-bold"
                style={{ fontSize: size * 0.4 }}
            >
                {getInitials(name)}
            </Text>
        </View>
    );
};