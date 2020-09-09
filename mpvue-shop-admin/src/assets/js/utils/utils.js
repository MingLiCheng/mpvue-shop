import _ from 'lodash';
import Crypto from 'crypto-js';

export default {
  CryptoStr(obj, secret) {
          const keys = _.keys(obj);
          let str = '';
          keys.forEach(key => {
              str += `${key}=${obj[key]};`;
          });
          return Crypto.AES.encrypt(str, secret).toString();
      },
      decryptStr(str, secret) {
          const bytes = Crypto.AES.decrypt(str, secret);
          const originStr = bytes.toString(Crypto.enc.Utf8);
          const paramArr = originStr.split(';').filter(i => i);
          let obj = {};
          paramArr.forEach(item => {
              const ele = item.split('=');
              obj[ele[0]] = ele[1];
          });
          return obj;
      },
      getCookie(name) {
          let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg)) {
              return unescape(arr[2]);
          } else {
              return null;
          }
      },
      setCookie(name, value) {
          var Days = 30;
          var exp = new Date();
          exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
          document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      },
      delCookie(name) {
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval = this.getCookie(name);
          if (cval != null) {
              document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
          }
      },
}