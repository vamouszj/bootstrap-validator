(function(root, factory, plug) {
	factory.call(root, root.jQuery, plug);

})(this, function($, plug) {
	//实现插件开发
	var _DEFAULTS_ = {
		raise : "blur",      /*响应哪种事件*/
		message: "输入的内容不正确",
		showMessage: function($field, message) {
			$field.after('<span class="help-block">'+ message +'</span>');
		}
	};

	var _RULES_ = {
		"required" : function() {
			return this.val() != '';
		},
		"email" : function() {
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.val());
		},
		"mobile" : function() {
			return /^[1]([3|7][0-9]{1}|59|58|88|89)[0-9]{8}$/.test(this.val());
		},
		"password": function() {
			/*检测密码由6-21字母和数字组成，不能是纯数字或纯英文*/
			return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.val());
		},
		"name" : function() {
			/*用户名里不允许有符号 最少6位 最多16位 用户名允许有字母、中文、数字*/
			return  /(^[A-Za-z0-9]{6,16}$)|(^[\u4E00-\u9FA5]{2,8}$)/.test(this.val());
		},
		"integer" : function() {
			return /^(0 |[1-9][0-9]*)$/.test(this.val());
		},
		"min" : function() {
			return this.data('in-min') <= parseFloat(this.val());
		},
		"max" : function() {
			return this.data('in-max') >= parseFloat(this.val());
		}		
	};

	$.fn[plug] = function(options, rules) {
		if(!this.hasClass('validator')) {
			throw new Error('请给表单加上validator类');
		}

		var that = this;
		$.extend(this, _DEFAULTS_, options);  //扩展基本的属性
		$.extend(this, _RULES_, rules);       //扩展规则
		var $fields = this.find("input");   //找到所有的表单元素
		
		$fields.on(this.raise, function() {
			var $field = $(this);
			$field.next('.help-block').remove();  /*移除上一次的提示框*/
			var results = true;
			var $group = $field.parent('.form-group').removeClass('has-success has-error');

			$.each(_RULES_, function(rule, validator) {/*validator是_RULES_里的每一个函数*/
				if($field.data('in-'+ rule)) {   /*对应于data-in-required*/
					results = validator.call($field);
					$group.addClass(results ? "has-success" : "has-error");
					results == false ? $field.next('.help-block').remove() : ''; 
					(!results) && that.showMessage($field, that.message);
				}
			});
		});
	}
}, "bootstrapValidator");