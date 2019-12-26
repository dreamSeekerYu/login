export default {
  success: {
    msg: '',
    handler: '',
    uid: '',
    code: 0,
    version: '',
    content: {
      crmId: 1, // 优车会员ID，未升级账号为空
      loginState: true, //登录成功
      updateUrl: '', //升级跳转地址
      mobile: '', //会员手机号
      isNeedUpdate: true, //是否需要账号升级
      userId: 1000 // 宝沃汽车会员ID
    }
  },
  failed: {
    msg: '',
    handler: '',
    uid: '',
    code: 1,
    version: '',
    content: {
      crmId: 1,
      loginState: true,
      updateUrl: '',
      mobile: '',
      isNeedUpdate: true,
      userId: 1000
    }
  }
}
