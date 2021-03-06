export default {
  pageTimer: {},
  localHost: window.location.host,
  isLocalHost: localHost.indexOf('localhost') !== -1 || localHost.indexOf('192') !== -1,

  isLogin() {
    return (this.getStorage('isLogin', true) == 'true');
  },

  getUserInfo() {
    let userInfo = this.getStorage('userInfo', true);
    return userInfo ? (userInfo.userInfo || {}) : {};
  },

  init() {
    Number.prototype.toFixed = function (d) {
      var s = this + "";
      if (!d) d = 0;
      if (s.indexOf(".") == -1) s += ".";
      s += new Array(d + 1).join("0");
      if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2,
          pm = RegExp.$1,
          a = RegExp.$3.length,
          b = true;
        if (a == d + 2) {
          a = s.match(/\d/g);
          if (parseInt(a[a.length - 1]) > 4) {
            for (var i = a.length - 2; i >= 0; i--) {
              a[i] = parseInt(a[i]) + 1;
              if (a[i] == 10) {
                a[i] = 0;
                b = i != 1;
              } else break;
            }
          }
          s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

        }
        if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
      }
      return this + "";

    };


  },

  needClickFc(domId) {
    document.getElementsByClassName(domId)[0].addEventListener('touchstart', function (event) {
      event.target.classList.add('needsclick');
    })
  },

  checkDup(arr, key, value) {
    let flag = false;
    for (let i = 0, v; v = arr[i++];) {
      if (v[key] === value) {
        flag = true;
        break;
      }
    }
    return flag;
  },

  back(router) {
    if (window.frames.length !== parent.frames.length) {
      let myFrm = window.parent.document.getElementById('frameId');
      myFrm.src = 'auto:blank;';

      try {
        myFrm.contentWindow.document.write('');
        myFrm.contentWindow.document.clear();
        myFrm.contentWindow.close();
      } catch (e) {
        myFrm.parentNode.removeChild(myFrm);
      }

      window.parent.document.getElementById('closeFrame').click();
    } else {
      router.go(-1);
    }
  },
  dateFormat(value, type) {
    let start_time = new Date(value);
    let year = start_time.getFullYear();
    let month = start_time.getMonth() + 1 < 10 ? "0" + (start_time.getMonth() + 1) : start_time.getMonth() + 1;
    let date = start_time.getDate() < 10 ? "0" + start_time.getDate() : start_time.getDate();
    let Hours = start_time.getHours();
    let minutes = start_time.getMinutes();
    let seconds = start_time.getSeconds();
    if (type == "yyyy-MM-dd") {
      return year + "-" + month + "-" + date;
    }
    if (type == "yyyy-MM-dd hh:mm:ss") {
      return year + "-" + month + "-" + date + " " + Hours + ":" + minutes + ":" + seconds;
    }

  },
  formatPhone(str) {
    if (!str) return '';
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  },

  getValueByKey(list, key, attr, requireImg) {
    if (!list || !key || !attr) return;
    let value = '';
    for (let i = 0, v; v = list[i++];) {
      if (key === v.key) {
        value = v[attr];
        break;
      }
    }

    return requireImg ? require(requireImg + value + '.png') : value;
  },

  log(data) {
    if (!data) return '';
    return JSON.parse(JSON.stringify(data));
  },

  hexMd5(str) {
    if (!str) return '';

    let obj = require('./ciphertext');
    return obj.default.hex_md5(str);
  },

  formatTime(seconds, secondsTop, stopBet) {
    let _seconds = !stopBet ? seconds : secondsTop;
    let hour = Math.floor((_seconds / 3600));
    hour = hour < 10 ? '0' + hour : hour;
    hour = hour <= 0 ? '00' : hour;
    let minite = Math.floor((_seconds / 60) % 60);
    minite = minite < 10 ? '0' + minite : minite;
    let second = Math.floor(_seconds % 60);
    second = second < 10 ? '0' + second : second;
    return (hour + ':' + minite + ':' + second);
  },

  setLocalStorage(key, obj) {
    let v = obj;
    if (typeof obj === 'object') {
      v = 'obj-' + JSON.stringify(v);
    } else {
      v = 'str-' + v;
    }
    localStorage.setItem(key, v);
  },

  getLocalStorage(key) {
    let v = localStorage.getItem(key);
    if (!v) return '';

    if (v.indexOf('obj-') === 0) {
      return JSON.parse(v.slice(4))
    } else {
      return v.slice(4);
    }
  },

  setStorage(key, obj, storageType) {
    let v = obj;
    if (typeof obj === 'object') {
      v = 'obj-' + JSON.stringify(v);
    } else {
      v = 'str-' + v;
    }

    if (!storageType) {
      localStorage.setItem(key, v);
    } else {
      sessionStorage.setItem(key, v);
    }
  },

  getStorage(key, storageType) {
    let v = '';
    if (!storageType) {
      v = localStorage.getItem(key);
    } else {
      v = sessionStorage.getItem(key);
    }

    if (!v) return '';

    if (v.indexOf('obj-') === 0) {
      return JSON.parse(v.slice(4))
    } else {
      return v.slice(4);
    }
  },

  openLoading(self, options, callback) {
    self.$loading.open();
  },

  closeLoading(self, options, callback) {
    self.$loading.close();
  },

  showAlert(self, options, callback) {
    self.$alert({
      content: options.content
    }, callback);
  },

  showConfirm(self, options, callback) {
    self.$confirm({
      title: options.title,
      content: options.content,
      cancelButton: options.cancelButton,
      showText: options.showText,
      placeholder: options.placeholder
    }, callback);

  },

  audioPlay(self, options, callback) {
    if (options.play) {
      self.$myAudio.play();
    } else {
      self.$myAudio.open({
        fileName: options.fileName,
        audioPlay: options.audioPlay
      });
    }
  },

  audioClose(self, options, callback) {
    self.$myAudio.close();
  },

  post(self, url, param, successCallback, errorCallback, isShowIndicator, noToLogin) {
    let that = this;
    if (!isShowIndicator) that.openLoading(self);

    let startTime = new Date();
    if (that.isLocalHost) {
      /*默认登陆用户锁定*/
      param.bind_account = 1;
    }

    /*self.$http.post(url, param).then((response) => {
     console.group(url);
     console.debug("%c参数", "font-weight:bold;color:black;");
     console.debug(JSON.stringify(param));
     console.debug("%c返回", "font-weight:bold;color:black;");
     console.debug(JSON.stringify(response.data).substring(0, 100));
     console.debug("%c耗时", "font-weight:bold;color:black;");
     console.debug((new Date().getTime() - startTime) + ' 毫秒');
     console.groupEnd();

     that.closeLoading(self);
     console.log(JSON.parse(JSON.stringify(response.data.data)));
     switch (response.data.code) {
     case 0:
     successCallback && successCallback(response.data.data, response.data);
     break;
     case 10001:
     that.showAlert(self, {
     content: response.data.msg
     }, () => {
     self.$router.replace({name: 'login'});
     });
     break;
     default:
     that.showAlert(self, {
     content: response.data.msg
     });
     errorCallback && errorCallback();
     break;
     }
     }).catch((error) => {
     console.log(JSON.parse(JSON.stringify(error)));
     that.closeLoading(self);
     that.ajaxError(error, that, self);
     });

     return;*/
    $.ajax({
      url: url,
      type: 'post',
      data: param,
      dataType: 'json',
      // timeout: 1000 * 30,
      success: function (data) {
        that.closeLoading(self);
        console.group(url);
        console.debug("%c参数", "font-weight:bold;color:black;");
        console.debug(JSON.stringify(param));
        console.debug("%c返回", "font-weight:bold;color:black;");
        console.debug(JSON.stringify(data).substring(0, 100));
        console.debug("%c耗时", "font-weight:bold;color:black;");
        console.debug((new Date().getTime() - startTime) + ' 毫秒');
        console.groupEnd();

        console.log(JSON.parse(JSON.stringify(data)));
        console.log(JSON.parse(JSON.stringify(data.data)));
        // data.code = 10002

        if (parseInt(data.code) === 0) {
          successCallback && successCallback(data.data, data);
          sessionStorage.setItem('beforeLoginRouteName', '' + self.$route.name);
        } else {
          switch (parseInt(data.code)) {
            case 10001:
              localStorage.setItem('sectionLogin', '');
              if (errorCallback) {
                errorCallback(data);
              } else {
                that.setStorage('isLogin', false, true);
                if (self.$route.name === 'home' && noToLogin) {

                  successCallback && successCallback();
                } else {
                  if (url.indexOf('index.php/api/Member/profile') === -1 ||
                    ((url.indexOf('index.php/api/Member/profile') !== -1 ||
                      url.indexOf('index.php/api/Member/appProfile') !== -1) && (self.$route.name === 'index' || self.$route.name === 'theLottery' ||
                      self.$route.name === 'betting' || self.$route.name === 'personal' || self.$route.name === 'home'))) {
                    that.showAlert(self, {
                      content: data.msg
                    }, () => {

                      sessionStorage.setItem('beforeLoginRouteName', self.$route.name);
                      self.$router.replace({
                        name: 'login',
                        query: {
                          fullPath: self.$route.fullPath
                        }
                      });
                    });
                  }
                }
              }
              break;
            case 10002:
              errorCallback && errorCallback(data);

              break;
            default:
              that.showAlert(self, {
                content: data.msg
              });
              break;
          }
          errorCallback && errorCallback(data);
        }
      },
      error: function (XMLHttpRequest) {
        console.log(XMLHttpRequest);
        that.closeLoading(self);
        that.ajaxError(XMLHttpRequest, that, self);
      }
    });
  },

  ajaxError(response, _this, self) {
    switch (response.status) {
      case 0: // 网络不通
        _this.showAlert(self, {
          content: '网络暂时未能连通'
        });
        break;
      case 401: // 未登录
      case 521: // 超时
        _this.showAlert(self, {
          content: '网络超时'
        });
        break;
      case 522: // 错误
        break;
      case 523:
        _this.showAlert(self, {
          content: '当前时间存在较大偏差'
        });
        break;
      case 524:
        _this.showAlert(self, {
          content: '未找到相关数据'
        });
        break;
      default:
        _this.showAlert(self, {
          content: '服务器异常'
        });
        break
    }
  },

  remScript() {
    let browser = {
      versions: function () {
        let u = navigator.userAgent,
          app = navigator.appVersion;
        return { //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
      browser.versions.iPhone || browser.versions.iPad || !!1) {
      let myHTML = document.querySelector("html"),
        myWidth = window.innerWidth > 414 ? 414 : window.innerWidth;

      let size = 100 * myWidth / 414;

      myHTML.style.fontSize = size + 'px';
      window.onresize = function () {
        let myHTML = document.querySelector("html"),
          myWidth = window.innerWidth;
        myHTML.style.fontSize = size + 'px';
      }
    }
  },

  setTitle(title) {
    document.title = title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      let iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', require('../images/small01.png'));
      let iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  },

  clearPageTimer(noClear) {
    for (let t in window.pageTimers) {
      console.log(window.pageTimers[t]);
      if (t.indexOf(noClear || '') === -1) {
        console.log(t);
        window.clearInterval(window.pageTimers[t]);
      }
    }
  },

  setScopeInterval(func, millis, scope) {
    return setInterval(function () {
      func();
    }, millis);
  },

  /**
   *
   * @param self vue
   * @param clickEvent click $event
   * @param currentTarget click element
   * @param imgClassName chip class name
   */
  chip(self, clickEvent, currentTarget, imgClassName, scrollDistance, currentId) {
    let that = this;
    let worker = new Worker('../../../static/worker/worker.js');
    worker.postMessage('');
    worker.onmessage = function (evt) {
      currentId = 1;
      var playMarryImg = currentTarget.find(imgClassName || '.playMarryImg');
      var imgOffset = playMarryImg.find('img').offset();
      var chipImg = $('.westernSectionNum p.on').find('img');
      var chipImgOffset = chipImg.offset();
      var flyer = chipImg.clone();

      flyer.attr({
        "class": "cloneImg"
      }).offset({
        top: chipImgOffset.top,
        left: chipImgOffset.left
      }).css({
        "position": "absolute",
        "width": "1.2rem",
        "height": "1.2rem",
        "margin-left": "0.5rem",
        "z-index": "1000"
      });
      flyer.fly({
        speed: 3.3,
        start: {
          left: chipImgOffset.left,
          top: chipImgOffset.top
        },
        end: {
          left: imgOffset.left,
          top: imgOffset.top - (scrollDistance || 0),
          width: 40,
          height: 40
        },
        onEnd: function () {
          playMarryImg.find('img').attr('src', flyer.attr('src'));
          var flyThat = this;
          setTimeout(function () {
            flyThat.destroy();
            $(imgClassName || '.playMarryImg').addClass("playMarryImgVisible");
          }, 40);
        }
      });

      var u = navigator.userAgent;
      var audio = null;
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        audio = new Audio(require('../lotteryAudio/chip.wav'));
        audio.play();
      } else {
        
        audio = new Audio(require('../lotteryAudio/chip.wav'));
        document.addEventListener("touchstart",function(){

          
          audio.play();
          console.log(22222)
        })

        document.removeEventListener("touchstart",function(){
        
          audio.play();
          console.log(33333)
        });
        // audio.load();
        
      //   audio.addEventListener('canplay', function() {
      //   // audio.play();
      // }, false);
        
        // that.audioPlay(self, {fileName: 'chip.wav', audioPlay: true});

        // //创建audio对象
        // var Xut = {};
        // var isAudio = false;
        // var audioOnce = null;
        // var chatid = '';
        // var fixaudio = function () {
        //   if (!isAudio) {
        //     isAudio = true;
        //     Xut.newaudio = new Audio();
        //     document.removeEventListener('touchstart', fixaudio, false);
        //   }
        // };
        // document.addEventListener('touchstart', fixaudio, false);
        // //判断页面中是否已经存在audio标签
        // if (Xut.newaudio) {
        //   audio = Xut.newaudio;
        //   audio.src = '../lotteryAudio/chip.wav';
        //   audio.play();
        // } else {
        //   Xut.newaudio = new Audio();
        //   audio = Xut.newaudio;
        //   audio.src = '../lotteryAudio/chip.wav';
        //   audio.play();
        // }

      }
      worker.terminate();
    };
  },

  visibilityChange(self, id) {
    let func = () => {
      self._Util.post(self, self._Api.POST_LOTTERY_RECTOR_DETAIL, {
        id: id
      }, (data) => {
        self.stopBetCountDownSecond = data.stop_count_down;
        self.countDownSecond = data.count_down;
        // self.stopBetCountDownSecond = -1;
        // self.countDownSecond = 3;
        window.clearInterval(self.interValObj);
        self.startCountDown();
      }, '', true);
    };
    document.removeEventListener('visibilitychange', func);

    document.addEventListener('visibilitychange', function (event) {
      if (!document.hidden) func();
    });
  },

  browser() {
    //判断访问终端

    let browser = {
      versions: function () {
        let u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) == "qq" //是否QQ
        };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browser;
  },
  /**
   *js控制元素高度间距等样式
   * @param selecter 元素选择器
   * @param option 属性对象 如{height:0.6}==>设置元素0.6倍的屏幕高度
   * @param operator 运算字符 + - * /
   * @param brotherSelecterValue 上面元素需要加上或减去高度
   * @param bro_operator  运算字符
   */

  setCss(selecter, option, operator, brotherSelecterValue, bro_operator) {
    let brother_height = brotherSelecterValue || 0;
    let win_height = $(window).height() || 0;
    for (var key in option) {
      option[key] = this.operation(option[key], win_height, operator);
      if (brother_height) option[key] = this.operation(option[key], brother_height, bro_operator);
    }
    console.log("option:", option);
    $(selecter).css(option);
  },
  operation(result, num, operator) {
    switch (operator) {
      case '+':
        result += num;
        break;
      case '-':
        result -= num;
        break;
      case '*':
        result *= num;
        break;
      case '/':
        result = num / result;
        break;
      default:
    }
    return result;
  },
}