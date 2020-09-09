// 文件上传， 上传至服务端进行文件解析使用

import axios from 'axios'

const uploadUrl = 'http://www.cdbook.xyz/api/api/upload'


export default {
  async uploadFile(params, res, err) {
    return await this.fileUploadHandle(params, uploadUrl, res, err)
  },

  // 文件上传函数
  async fileUploadHandle(params, path, scb, ecb) {
    const formData = new FormData()
    Object.keys(params).forEach(key => {
      console.log('key', key,'vlaue', params[key]);
      formData.append(key, params[key])
    })
    axios({
      url: path,
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData
    }).then(res => {
      scb(res.data)
    }).catch(err => {
      ecb(err)
    })
  }
}
