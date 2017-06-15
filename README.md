## 表单验证插件

### 引入bootstrap-validator插件

利用CDN服务

```html
<script src="http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script type="text/javascript" src="./bootstrap-validator.js"></script>
```

### 使用的例子

下面的表单的内容，借助的就是Bootstrap的样式，然后也有使用“data-in-*”来设置此处验证的是什么

```html
	<div class="container info-div validator">
		<div class="form-group">
			<label class="control-label" for="email">邮箱</label>
			<input type="text" name="" class="form-control" id="email" data-in-required="true" data-in-email="true" placeholder="请输入邮箱">
			<!-- <span class="help-block">输入的内容正确</span> -->
		</div>
		<div class="form-group">
			<label class="control-label" for="phone">手机号码</label>
			<input type="text" name="" class="form-control" id="phone" data-in-mobile="true" placeholder="请输入密码">			
		</div>
		<div class="form-group">
			<label class="control-label" for="password">密码</label>
			<input type="text" name="" class="form-control" id="password" data-in-password="true" placeholder="6-21字母和数字组成">			
		</div>
		<div class="form-group">
			<label class="control-label" for="username">用户名</label>
			<input type="text" name="" id="username" class="form-control" id="password" data-in-name="true" placeholder="6-21字母和数字组成">		
		</div>		
		<div class="form-group">
			<label class="control-label" for="age">年龄</label>
			<input type="text" name="" id="username" class="form-control" id="age" data-in-required="true" data-in-min="20" data-in-integer="true" data-in-max="45" placeholder="输入年龄">		
		</div>				
	</div>
```

调用插件里的方法：首先这里的DOM元素是一个含有类选择器的validator的元素，这个可以也就是所有表单元素的父元素，然后调用插件的bootstrapValidator，可以传入一个对象，这个对象，这个对象可以认为是一种定制，在下面会详细进行说明

```javascript
$('.validator').eq(0).bootstrapValidator({
    showMessage : function($f, msg) {
      alert(msg);
    }
});
```

### 使用的说明

data-in-required="true" ： 代表这个input的内容不可为空，是必须的

data-in-email="true" ：这里是需要验证的是邮箱的正确性

data-in-mobile="true"：验证手机号码的正确性

data-in-password="true"：验证密码的正确性（默认情况下，密码由6-21字母和数字组成，不能是纯数字或纯英文）

data-in-name="true"：验证用户名的合法性（默认情况下，不允许有符号 最少6位 最多16位 用户名允许有字母、中文、数字）

data-in-integer="true"：验证输入的内容是纯数字

data-in-min="20" ：输入的内容转换之后要大于等于20

data-in-max="45"：输入的内容转换之后要小于等于45

当然目前所提供的判断在实际中的应用也不尽相同，所以就需要一定的扩展，如下面的示例，在插件中有默认的展示错误信息的函数showMessage，当然也可以根据自己的需要，来进行“定制”，如下面

```javascript
$('.info-div').eq(0).bootstrapValidator({
  showMessage : function($f, msg) {
    alert(msg);
  }
});
```

插件中默认的事件是`raise : "blur"`也就是失去焦点时触发，比如可以修改为change，改变后触发

```javascript
$('.info-div').eq(0).bootstrapValidator({
	raise : "change"
});
```

当然一些默认的`data-in-*`属性也存在着需要添加和修改的部分，这个需要向下面这样做：

```javascript
$('.info-div').eq(0).bootstrapValidator({....}, {
    "name" : function() {
    	return  /(^[A-Za-z0-9]{6,12}$)|(^[\u4E00-\u9FA5]{2,8}$)/.test(this.val());
    },  
});
```

