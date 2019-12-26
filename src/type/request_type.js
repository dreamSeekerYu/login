export default {
  login: '/action/user/login',
  loginOut: '/action/user/logout',
  upload: '/action/user/upload', // 文件上传
  verifyCode: '/action/user/getVerifyCode', // 获取手机验证码
  readIdCard: '/action/user/readIDCard', // 实名认证－身份证识别
  lipCode: '/action/user/getLipCode', // 活体认证－获取唇语code
  faceCompare: '/action/user/faceCompare', // 活体认证－视频人脸验证
  loginUser: '/action/user/getLoginUser', // 获取当前登录用户信息
  updateIdCardInfo: '/action/user/updateIdCardInfo' // 实名认证-保存实名信息
}
