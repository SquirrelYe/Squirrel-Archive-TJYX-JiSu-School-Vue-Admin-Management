module.exports = {
  //设置cookie
  setCookie(c_name, c_pwd, c_type, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString();
    window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString();
    window.document.cookie = 'userType' + '=' + c_type + ';path=/;expires=' + exdate.toGMTString();
  },
  //读取cookie
  getCookie: function (that) {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //再次切割
        //判断查找相对应的值
        if (arr2[0] == 'userName') {
          that.username = arr2[1]; //保存到保存数据的地方
        } else if (arr2[0] == 'userPwd') {
          that.password = arr2[1];
        }
      }
    }
  },
  //读取单项cookie
  getCookieByStr: function (str) {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //再次切割
        //判断查找相对应的值
        if (arr2[0] == str) {
          return arr2[1];
        }
      }
    }
  },
  //清除cookie
  clearCookie: function () {
    this.setCookie('', '', -1); //修改2值都为空，天数为负1天就好了
  }
};
