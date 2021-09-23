import Strategies from "./Strategies.js";
import errorMsg from "./errorMsg.js";
export default class Validators {
  constructor(data = this.isNotEmpty(), rules = this.isNotEmpty()) {
    //记录数值
    this.data = data;
    //记录指令
    this.rules = rules;
    this.errMsg = {};
    this.init();
  }
  init() {
    //初始化
    for (let key in this.rules) {
      //判断值是否对应data中的值
      if (this.data.hasOwnProperty(key)) {
        this.volid(key, this.data[key], this.rules[key]);
      } else {
        throw new Error("没有对应的数据");
      }
    }
  }
  //检验
  volid(key, value, rules) {
    //记录错误
    this.errMsg[key] = [];
    rules.forEach((item) => {
      //检测自定义检验
      if (item.validator) {
        //收集callback回调
        item.validator(value, this.callback.bind(this));
      } else {
        //收集错误信息
        let msg = item.msg;
        delete item.msg;
        //获取所有策略
        let arr = Object.keys(item);
        //获取所有指令
        let ag;
        arr.forEach((val) => {
          //默认错误信息插入
          msg = msg && msg !== ag ? msg : errorMsg[val];
          ag = msg;
          //策略模式分发指令记录错误信息
          this.errMsg[key].push(
            Strategies[val](value, item[val], msg, this.data)
          );
        });
      }
    });
  }
  //校验
  valid() {
    //检测错误信息
    for (let key in this.errMsg) {
      //筛选空值
      this.errMsg[key] = this.errMsg[key].filter(Boolean);
      let arr = this.errMsg[key];
      for (let k = 0; k < arr.length; k++) {
        //输出错误信息
        console.error(key + ":" + arr[k]);
        //校验失败
        return false;
      }
    }
    //校验成功
    return true;
  }
  //获取自定义校验回调
  callback(err) {
    err ? (this.errMsg["valider"] = [err]) : "";
  }
  //参数不能为空
  isNotEmpty() {
    throw new Error("缺少参数");
  }
  //用户可以定制自己的错误信息提示
  static replaceMessage(options) {
    for (let key in options) {
      errorMsg[key] = options[key];
    }
  }
}
