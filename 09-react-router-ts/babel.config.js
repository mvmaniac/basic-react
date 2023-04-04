const presets = [
  [
    '@babel/preset-env',
    {
      targets: 'defaults',
      useBuiltIns: 'usage',
      corejs: {version: '3.29', proposals: true}
    }
  ],
  '@babel/preset-typescript',
  '@babel/preset-react'
];

const plugins = [];

export default {presets, plugins};
