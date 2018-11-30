// Created by szatpig at 2018/11/30.
const crypto = require('crypto');

function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}

module.exports = WXBizDataCrypt;


// 在需要解密页使用
// var WXBizDataCrypt = require('./crypto')
//
// var appId = 'wx4f4bc4dec97d474b'
// var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
// var encryptedData =
//     'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
//     'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
//     '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
//     '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
//     'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
//     'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
//     '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
//     'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
//     '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
//     '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
//     'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
//     '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
//     '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
//     'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
//     'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
//     '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
//     'Db/XcxxmK01EpqOyuxINew=='
// var iv = 'r7BXXKkLb8qrSNn05n0qiA=='
//
// var pc = new WXBizDataCrypt(appId, sessionKey)
//
// var data = pc.decryptData(encryptedData , iv)
//
// console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }


