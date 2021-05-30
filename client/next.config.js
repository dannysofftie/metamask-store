module.exports = {
  env: {
    MQTT_HOST: process.env.MQTT_HOST,
    MQTT_PORT: process.env.MQTT_PORT,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    GRAPHQL_WS_ENDPOINT: process.env.GRAPHQL_WS_ENDPOINT,
  },
  future: {
    webpack5: true,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
};
