import axios from "axios";
import _ from "lodash";
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
let needLoadingRequestCount = 0
function showLoading(isShow=true) {
  if (isShow) {
    if (needLoadingRequestCount === 0) {
      loadinginstace = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    needLoadingRequestCount++
  }
  
}
function tryHideLoading(isShow=true) {
  if (isShow) {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    _.debounce(()=>{
      if (needLoadingRequestCount === 0) {
        loadinginstace.close()
      }
    }, 300)()
    
  }
  
}


instance.interceptors.request.use(config => {
  console.log('config',config)
  showLoading(config.showLoading)

  return config
}, error => {
  tryHideLoading(config.showLoading)
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})


instance.interceptors.response.use(res => {
  console.log('====响应res===', res.config)
  tryHideLoading(res.config.showLoading)
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
  tryHideLoading(res.config.showLoading)
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
});
// instance
// let myinstance = instance;
let _get = instance.get
let _delete = instance.delete
// myinstance.get = function(){};
/*instance.get = function(url, data) {
  return _get(url, {
    params: data
  });
}*/
instance.get = function(...params) {
  let data = params[1];
  let option = params[2];
  params[1] = {
    params: data,
  }
  params.length=2;
  Object.assign(params[1], option);
  return _get(...params);
}

instance.delete = function(...params) {
  let data = params[1];
  let option = params[2];
  params[1] = {
    data,
  }
  params.length=2;
  Object.assign(params[1], option);
  return _delete(...params);
}


export default instance;
// export default instance;