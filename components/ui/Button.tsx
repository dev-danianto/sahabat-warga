// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onPress,
                                                  loading = false,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  className = '',
                                                  disabled,
                                                  ...props
                                              }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'outline':
                return 'bg-transparent border border-blue-500';
            case 'ghost':
                return 'bg-transparent';
            default:
                return 'bg-blue-500';
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return 'py-2 px-3';
            case 'lg':
                return 'py-4 px-6';
            default:
                return 'py-3 px-4';
        }
    };

    const getTextStyles = () => {
        const baseTextStyles = 'font-semibold text-center';
        const sizeTextStyles = size === 'sm' ? 'text-sm' : 'text-base';

        switch (variant) {
            case 'outline':
                return `${baseTextStyles} ${sizeTextStyles} text-blue-500`;
            case 'ghost':
                return `${baseTextStyles} ${sizeTextStyles} text-blue-500`;
            default:
                return `${baseTextStyles} ${sizeTextStyles} text-white`;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`
        rounded-lg items-center justify-center
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled || loading ? 'opacity-50' : ''}
        ${className}
      `}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? 'white' : '#3B82F6'}
                />
            ) : (
                <Text className={getTextStyles()}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};