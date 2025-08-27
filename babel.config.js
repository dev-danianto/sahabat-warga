module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            // Konfigurasi ini sudah cukup untuk NativeWind
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        ],
        plugins: [
            // Plugin untuk alias path '@/'
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                    },
                },
            ],
            // Plugin untuk animasi
            "react-native-reanimated/plugin",
        ],
    };
};