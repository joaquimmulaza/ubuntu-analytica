const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    // Disable filename hashing
    config.output.filename = 'static/js/main.js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';
    
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.filename = 'static/css/main.css';
      miniCssExtractPlugin.options.chunkFilename = 'static/css/[name].chunk.css';
    }
    
    return config;
  }
);
