//策略对象 --主要的校验算法返回错误信息
const Strategies = {
  //判断是否可为空
  require: function (value, flay, errorMsg) {
    if (flay) {
      if (value === "" || value.length > 0) {
        return errorMsg;
      }
    }
  },
  //判断类型
  type: function (value, flay, errorMsg) {
    let msg;
    switch (flay) {
      case "string":
        msg = typeof value != "string" ? errorMsg : undefined;
        break;
      case "number":
        msg = typeof value != "number" ? errorMsg : undefined;
        break;
      case "Array":
        msg = !Array.isArray(value) ? errorMsg : undefined;
        break;
      case "object":
        msg = value.constructor != Object ? errorMsg : undefined;
        break;
      case "email":
        msg = Strategies["pattern"](
          value,
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          errorMsg
        );
        break;
      case "phone":
        msg = Strategies["pattern"](
          value,
          /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          errorMsg
        );
        break;
      default:
        (msg = "暂无此类型"), console.error("没有该类型的参数");
        break;
    }

    return msg;
  },
  //判断长度
  min: function (value, flay, errorMsg) {
    if (typeof value === "number" || Array.isArray(value)) {
      if (value < flay) {
        return errorMsg;
      }
    } else if (typeof value === "string") {
      if (value.length < flay) {
        return errorMsg;
      }
    }
  },
  //判断长度
  max: function (value, flay, errorMsg) {
    if (typeof value === "number" || Array.isArray(value)) {
      if (value > flay) {
        return errorMsg;
      }
    } else if (typeof value === "string") {
      if (value.length > flay) {
        return errorMsg;
      }
    }
  },
  //判断正则
  pattern: function (value, reg, errorMsg) {
    if (!reg.test(value)) {
      return errorMsg;
    }
  },
  //值索引
  key: (value, key, errorMsg, data) => {
    if (value !== data[key]) {
      return errorMsg;
    }
  },
};
//
export default Strategies;
