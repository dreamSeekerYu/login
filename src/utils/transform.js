import { PhotoBaseData, colors } from './constants'
import ucarStorage from './storage'

// 转换城市列表至可选择的按字母排序的结构
export const transformCities = (arr, filter = true) => {
  let result = []
  let hotCities = []
  arr.forEach(item => {
    if (filter && item.hasCar !== 1 && item.hasCar !== 1 && item.noCar !== 1 && item.rentCar !== 1 && item.buyCar !== 1 && item.selfOperated !== 1) return
    const flagIndex = result.findIndex(val => val.flag === item.firstLetter)
    if (flagIndex === -1) {
      result.push({
        flag: item.firstLetter,
        cities: [
          {
            ...item,
            id: item.cityId,
            name: item.cityName
          }
        ]
      })
    } else {
      result[flagIndex].cities.push({
        ...item,
        id: item.cityId,
        name: item.cityName
      })
    }
    if (item.hot || item.isHot) {
      hotCities.push({
        ...item,
        id: item.cityId,
        name: item.cityName
      })
    }
  })
  result = result.sort((a, b) => {
    if (a.flag < b.flag) {
      return -1
    } else if (a.flag > b.flag) {
      return 1
    }
    return 0
  })
  if (hotCities && hotCities.length > 0) {
    result.unshift({
      flag: '热门',
      cities: hotCities
    })
  }
  return result
}

export const transformColor = (colors) => {
  const colorEnum = {}
  for (let k in colors) {
    colorEnum[colors[k].id] = { ...colors[k] }
  }
  return colorEnum
}

export const transformDisapproveInfo = (info) => {
  const baseInfo = {}
  const photoInfo = {}
  let personInfoError = 0
  let carInfoError = 0
  // 个人信息照片类型枚举
  const personEnum = [
    PhotoBaseData.idCard.type,
    PhotoBaseData.idCardBack.type,
    PhotoBaseData.handholdIdCard.type,
    PhotoBaseData.license.type,
    PhotoBaseData.secondLicense.type,
    PhotoBaseData.networkLicense.type
  ]
  // 车辆信息照片类型枚举
  const carEnum = [
    PhotoBaseData.carLicense.type,
    PhotoBaseData.carSecondLicense.type,
    PhotoBaseData.car.type,
    PhotoBaseData.carVin.type,
    PhotoBaseData.networkCarLicense.type
  ]
  // 需要修改的照片类型数组
  const needModify = []
  const errors = {}
  const { recruitInfo, unapproveInfos } = info
  unapproveInfos.forEach(item => {
    if (item.canUpload) {
      personInfoError = (personEnum.indexOf(item.type) !== -1 || personInfoError) ? 1 : 0
      carInfoError = (carEnum.indexOf(item.type) !== -1 || carInfoError) ? 1 : 0
      needModify.push(item.type)
    }
    errors[item.type] = item.rejectReason
    photoInfo[item.type] = {
      imgUrl: (APP_ENV === 'prod' || APP_ENV === 'pre') ? item.imgUrl.replace(/http:\/\//, 'https://') : item.imgUrl
    }
  })
  const errorType = parseInt(`${carInfoError}${personInfoError}`, 2)
  const personInfo = {}
  personInfo.serviceCityId = recruitInfo.locationCity
  personInfo.serviceCityName = recruitInfo.locationCityName
  personInfo.driverName = recruitInfo.driverName
  personInfo.gender = `${recruitInfo.gender}`
  personInfo.driverIdCard = recruitInfo.idCardNumber
  personInfo.idCardValidDate = recruitInfo.idCardExpiryDateStr
  personInfo.houseHoldCity = { name: recruitInfo.domicileCity }
  personInfo.firstDrivingLicenseReceiveTime = recruitInfo.licenseInitDateStr
  personInfo.driverLicenseValidDate = recruitInfo.licenseExpiryDateStr
  personInfo.recruitSourceId = recruitInfo.recruitChannel
  baseInfo.personInfo = personInfo
  const carInfo = {}
  if (recruitInfo.carOwner) {
    carInfo.name = recruitInfo.carOwner
    carInfo.region = recruitInfo.licensePlatesNumber[0]
    carInfo.date = recruitInfo.carRegistrationTimeStr
    carInfo.licenceNum = recruitInfo.licensePlatesNumber.substr(1, recruitInfo.licensePlatesNumber.length - 1)
    const colorEnum = transformColor(colors)
    carInfo.carModel = { name: `${recruitInfo.vehicleBrand} ${recruitInfo.carModelName} ${colorEnum[recruitInfo.carColor].name}` }
    carInfo.vinId = recruitInfo.carIdentificationNumber
    baseInfo.carInfo = carInfo
  }
  return {
    baseInfo,
    photoInfo,
    needModify,
    errors,
    errorType
  }
}

// 由于接口方暂时不支持https协议的图片地址，所以将所有待上传的图片链接地址转换为http协议
export const transformImgUrl = (info) => {
  for (let key in info) {
    if (info.hasOwnProperty(key) && typeof info[key] === 'string') {
      info[key] = info[key].replace(/https:\/\//, 'http://')
    }
  }
  return info
}

export const transformReferrer = () => {
  const url = ucarStorage.getSession('document-referrer') || ''
  const baiduReg = /baidu\.com/
  const so360Reg = /so\.com/
  const googleReg = /google\.com/
  const sogoReg = /sogo\.com/
  if (baiduReg.test(url)) return '百度'
  if (sogoReg.test(url)) return '搜狗'
  if (so360Reg.test(url)) return '360'
  if (googleReg.test(url)) return 'google'
  return url === '' ? '' : '其他'
}

export const decodeCompanyId = (companyId) => {
  // 由于ios客户端的QQ会对url进行二次encode编码所以需要至少两次decodeURIComponent
  if (/%/g.test(companyId)) return decodeCompanyId(decodeURIComponent(companyId))
  return companyId
}

export const hideKey = (str, type = 'mobile') => {
  if (type) return str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

export const copyTargetProperty = (target, source) => {
  for (let k in source) {
    if (!target.hasOwnProperty(k)) continue
    let val = source[k]
    if (k === 'houseHoldCity') {
      target[k] = {
        name: val
      }
    } else {
      target[k] = val
    }
  }
}

// 对比目标对象中所有定义过的属性是否与源对象中的同名属性值相同，全部相同返回true，否则返回false
export const compareTargetProperty = (target, source) => {
  let result = true
  for (let k in source) {
    if (!target.hasOwnProperty(k)) continue
    if (target[k] !== source[k]) {
      result = false
      break
    }
  }
  return result
}