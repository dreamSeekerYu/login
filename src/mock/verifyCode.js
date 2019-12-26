export const verifyCode = {
  success: {
    msg: '',
    handler: '',
    uid: '',
    code: 1,
    version: '',
    content: {
      verifyCode: '验证码',
      sendState: true //  是否发送成功
    }
  },
  failed: {
    msg: '',
    handler: '',
    uid: '',
    code: 1,
    version: '',
    content: {
      verifyCode: '验证码发送失败',
      sendState: false
    }
  }
}
