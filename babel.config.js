module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
    ],
    plugins: [
      // Temporarily disabled NativeWind babel plugin to resolve Metro bundler issue
      // "nativewind/babel",
    ],
  };
};
