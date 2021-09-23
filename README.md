# validattoy--数据校验玩具

## 1、下载

```
	npm i validattoy
```

## 2、引入

```
	import Validators from "validattoy"
```

## 3、使用

推荐使用以下方法使用

```js
const data={
	name:'1',
	age:18
}
const v=new Validators(data,{
	name:[{
		type:'string',
		msg:'必须为string类型'
	}],
	age:[
		{
			type:'number',
			msg:'必须为number类型'
		}
	]
})  
//开启校验
if(v.valid()){
    console.log('pass');
};
```

## 4、API

### require非空校验(Boolean)

​	当前数值不能为“ ”,数组不能为空数组

```
使用:
	const rules={
		name:[
			{
				require:true
			}
		]
	}
```



### type类型校验(number/string/array/object/email/phone)

支持对以下类型的校验

1. number
2. string
3. array
4. object
5. email
6. phone

```
使用:
	const rules={
		name:[
			{
				type:'email'
			}
		]
	}
const data={
	name:'1',
}
const v=new Validators(data,rules);  
//开启校验
if(v.valid()){
    console.log('pass');
};	
```

### min和max(number)

​	针对string、number、array类型,当数据类型为string、array时会比较长度。为number时会比较大小

```
使用:
	const rules={
		name:[
			{
				type:'string'
			},{
				max:20,
				min:10,
			}
		]
	}
```

###  pattern(reg)

​	对数据进行正则校验

```
使用:
	const rules={
		name:[
			{
				pattern:/reg/
			}
		]
	}
```

### key(data-keyname)

​	判断是否与存在的值相同,类型也要求一致

```
使用:
	const data={
		name:'1',
		age:1
	}
	const rules={
		name:[
			{
				key:'age'
			}
		]
	}
```

###  validator自定义校验(Func)

​	如果以上功能不能满您的需求,您可以试试validator自定义校验

- **value(string)**

  读取到对应属性的值

- **callback(func)**

  作为错误回调,当参数为空时表示通过校验

  ```
  使用:
  	const rules={
  		name:[
  			{
  				validator:(value,callback){
  					if(value){
  						callback()
  					}else{
  						callback("错误");
  					}
  				}
  				
  			}
  		]
  	}
  ```

### replaceMessage

​	replaceMessage可以替换默认的错误消息提示

​	默认的信息提示:

```
  require: "该数值不能为空",
  type: "该数值类型不符合要求",
  min: "长度过短或数值过小",
  max: "长度过长或数值过大",
  pattern: "正则校验失败",
  validator: "自定义校验失败",
  key: "该值不等于指向的值",
```

替换默认的错误信息提示

```
 Validators.replaceMessage({
   require: "错误",
   key: "错误",
   min: "长度过短或数值过小",
  max: "长度过长或数值过大",
  pattern: "正则校验失败",
  validator: "自定义校验失败",
  key: "该值不等于指向的值",
 });
```

注:

​	(1)、replaceMessage是静态方法

​	(2)、必须在Validators实例化前调用