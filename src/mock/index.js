import Mock from 'mockjs'
// 所有请求
import URL from '@/type/request_type.js'
// 所有响应体
import {
  // login,
  // loginOut,
  // upload,
  verifyCode
  // readIdCard,
  // lipCode,
  // faceCompare,
  // loginUser,
  // updateIdCardInfo
} from './response.js'
alert('verifyCode', verifyCode)
Mock.setup({
  timeout: 300
})
// Mock.mock( url, post/get , 返回的数据)

/**
 * verifyCode 获取登录验证码
 * url = /action/user/getVerifyCode
 */
Mock.mock(URL.verifyCode, /get|post/i, verifyCode)
// Mock.mock(loginUrl, /get|post/i, responseData.login.failed)

/**
 * login 登录
 */
// Mock.mock(URL.login, /get|post/i, res.login.success)
// Mock.mock(URL.login, /get|post/i, )
