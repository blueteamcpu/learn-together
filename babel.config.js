module.exports = api => {
  const isTest = api.env('test');

  const config = {
    plugins: ['@babel/plugin-proposal-class-properties'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
  };

  if (isTest) {
    config.presets[0] = [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ];
  }

  return config;
};
