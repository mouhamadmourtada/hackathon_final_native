module.exports = function (api) {
  api.cache(true);
  // nativewind/babel
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
    
  };
};