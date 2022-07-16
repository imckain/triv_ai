module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
// module.exports = (api) => {
//   api.cache(false);

//   const presets = [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-react',
//     '@babel/preset-env',
//     '@babel/preset-flow',
//   ];
//   const plugins = [
//     '@babel/plugin-syntax-jsx',
//     '@babel/plugin-transform-runtime',
//     '@babel/plugin-transform-react-jsx', {
//       'runtime': 'automatic',
//     },
//   ];

//   return {
//     presets,
//     plugins,
//   };
// };
