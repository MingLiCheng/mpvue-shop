const CONF = {
    // 其他配置 ...
    serverHost: 'localhost',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1258589191',
    qcloudSecretId: 'AKIDaocDOvOC3i8SVLl0YqrOp9jLLTKwLeor',
    qcloudSecretKey: 'N4bvNZkmXqkRsLoS0tlVxDbghWQ5W9pG',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx39e0a63b277cce56',

    // 微信小程序 App Secret
    appSecret: 'bd1270f59c4144c708f6459ed92e80cc',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    //开启服务的端口
    port: '5757',
    /**
     * MySQL 配置
     */
    mysql: {
        host: '123.56.11.149',
        port: 3306,
        user: 'root',
        db: 'jh_mall',
        pass: '888123',
        char: 'utf8mb4'
    },
    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF