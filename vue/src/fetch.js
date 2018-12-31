import axios from "axios";
import {
  Loading,
  Message
} from 'element-ui'

let paramsSerializer = function(params) {
  let parts = [];
  for (let key in params) {
    let val = params[key];
    if (val === null || typeof val === "undefined") {
      continue;
    }
    if (Array.isArray(val)) {
      val = JSON.stringify(val);
    }
    parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
  }
  let result = parts.join("&");
  return result;
};
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

let instance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  paramsSerializer: function(params) {
    return paramsSerializer(params);
  }
});

// console.log('instance',instance)

let paramPost = function(data) {
  var params = new URLSearchParams();
  for (let name in data) {
    params.append(name, data[name]);
  }
  return params;
};

/****** request拦截器==>对请求参数做处理 ******/
var loadinginstace;
instance.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({
    fullscreen: true
  })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})


instance.interceptors.response.use(res => {
  console.log('====响应res===', res)
  loadinginstace.close()
  if (res.status == 200) {
    return res.data;
  }

  let data = res.data;
  if (Object.prototype.toString.call(data) === "[object Object]") {
    if (data.hasOwnProperty("ret")) {
      if (data.ret == 0) {
        return data.data;
      } else if (data.ret == 2) {

      }
      // return Promise.reject(data);
      return Promise.reject(new Error(data.msg));
      // return Promise.reject(new Error("request.data.ret not equal to 0"));
    } else {
      return Promise.reject(new Error("request.data.ret does not exist"));
    }
  } else {
    return Promise.reject(new Error("request.data is not Object"));
  }
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
});
// instance
let myinstance = {

}
myinstance.get = function(url, data) {
  return instance.get(url, {
    params: data
  });
}

myinstance.put = function(url, data) {
  return instance.put(url, data);
}

myinstance.post = function(url, data) {
  return instance.post(url, data);
}

myinstance.delete = function(url, data) {
  return instance.delete(url, {
    data
  });
}
export default myinstance;
// export default instance;