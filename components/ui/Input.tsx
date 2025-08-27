// components/ui/Input.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    className?: string;
    multiline?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoComplete?: TextInputProps['autoComplete'];
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                placeholder,
                                                value,
                                                onChangeText,
                                                className = '',
                                                multiline = false,
                                                secureTextEntry = false,
                                                keyboardType = 'default',
                                                autoCapitalize = 'sentences',
                                                autoComplete,
                                                ...props
                                            }) => {
    return (
        <View className={`mb-4 ${className}`}>
            {label && (
                <Text className="text-gray-700 text-sm font-medium mb-2">
                    {label}
                </Text>
            )}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                className={`
          border border-gray-300 rounded-lg px-4 py-3 text-gray-900
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          ${multiline ? 'h-20 text-top' : 'h-12'}
        `}
                placeholderTextColor="#9CA3AF"
                {...props}
            />
        </View>
    );
};