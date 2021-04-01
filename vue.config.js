module.exports = {
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        components: "@/components",
        content: "@/components/content",
        common: "@/components/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    open: "true",
    port: 8080
  }
}