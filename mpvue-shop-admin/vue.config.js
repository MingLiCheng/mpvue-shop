const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8081,
  },
  publicPath: '/mj-shop/', //服务器文件夹
  lintOnSave: false,

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.resolve.symlinks(true);
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: IS_PROD,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
}