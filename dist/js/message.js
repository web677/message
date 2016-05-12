/* 
* throwError为一般错误提示框，
* throwError参数分别为错误信息，成功提示框/错误提示框（true/false），回调函数
* throwError第二个参数为true则为成功提示框（文字颜色不一样）
******************************
* showConfirm为确认提示框，第一个参数为文字标题，第二个参数为确认按钮回调函数
******************************
* showDialog为确认对话框，参数分别为：文字标题，按钮文字，按钮回调函数，是否双按钮
* 后两个参数可以缺省
* 单按钮默认操作为移除对话框，文字可自定义（第二个参数）
* 双按钮默认两个按钮均为取消按钮，右边按钮可自定义文字（第二个参数）及回调函数（第三个参数）
******************************
* bindTap是为辅助功能，给按钮绑定点击效果
* 如有问题请与677沟通
*/
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {//amd
		define(factory);
	}else if (typeof define === 'function' && define.cmd) {// cmd
		define(function(require, exports, module) {
			return factory();
		});
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	}else {
		root.msg = factory();
	}
})(this,function(){
	return {
		bindTap:function(ele){
			ele.addEventListener("touchstart",tap,false);
			ele.addEventListener("touchend",tap,false);
			ele.addEventListener("touchcancel",tap,false);
			function tap(e){
				switch(e.type){
					case "touchstart":
						this.className += " btn-tap-on";
						break;
					case "touchend":
						this.className = this.className.replace(/btn-tap-on/,"");
						break;
					default:
						this.className = this.className.replace(/btn-tap-on/,"");
						break;
				}
			}
		},
		throwError:function(msg,callback,flag){
			if(!document.getElementById('error-box')){
	            var errorMsg = document.createElement("div");
	            errorMsg.className = "error-box";
	            if(flag === true){
	            	errorMsg.className += " success-box";
	            }
	            errorMsg.id = "error-box";
	            errorMsg.innerHTML = "<span>"+msg+"</span>";
	            document.body.appendChild(errorMsg);
	            errorMsg.style.top = "45%";
	            var errCbk = setTimeout(function(){
								document.body.removeChild(errorMsg);
								if(typeof callback === "function"){
									callback();
								}
								clearTimeout(errCbk);
							},2000);
	        }
	        stop();
		},
		showConfirm : function(msg,callback){
			if(!document.getElementById('confirm')){
				var poPup  = document.createElement("div"),
					mask   = document.createElement("div");

				poPup.className = "confirm";
				poPup.id = "confirm";
				poPup.innerHTML = '<p class="confirm-title">' + msg + '</p><button class="confirm-sure" id="confirm-sure">确认</button><button class="confirm-cancel" id="confirm-cancel">取消</button>';
	            mask.className = "mask";
	            document.body.appendChild(mask);
	            document.body.appendChild(poPup);
	            mask.className += " mask-on";
	            poPup.className += " confirm-on";

	            var removeConfirm = function(){
		            mask.className += " mask-off";
	            	poPup.className += " confirm-off";
	            	var remCfm = setTimeout(function(){
										document.body.removeChild(mask);
										document.body.removeChild(poPup);
										clearTimeout(remCfm);
									},300);
	            };

	            document.getElementById("confirm-sure").onclick = function(){
	            	removeConfirm();
					if(typeof callback === "function"){
						callback();
					}
	            };
				document.getElementById("confirm-cancel").onclick = function(){
	            	removeConfirm();
	            };

				this.bindTap(document.getElementById('confirm-sure'));
				this.bindTap(document.getElementById('confirm-cancel'));
			}
		},
		showDialog:function(title,text,callback,flag){
			var poPup = document.createElement("div"),
				dialogBox = document.createElement("div"),
				hasPop = 1;
			poPup.className = "mask";
			dialogBox.className = "com-modal";
			dialogBox.innerHTML =
				flag === true ? '<p class="com-dialog-title" id="com-dialog-title">' + title + '</p><div class="dialog-btn-box"><button class="com-dialog-btn" id="com-btn-cancel">取消</button><button class="com-dialog-btn" id="com-btn-sure">' + text + '</button></div>'
					 : '<p class="com-dialog-title" id="com-dialog-title">' + title + '</p><div class="dialog-btn-box"><button class="com-dialog-btn" id="com-btn-sure"> ' + text + ' </button></div>';
			document.body.appendChild(poPup);
			document.body.appendChild(dialogBox);
			poPup.className += " mask-on";
			dialogBox.className += " com-modal-on";
			var remDialog = function(){
					poPup.className += " mask-off";
					dialogBox.className += " com-modal-off";
					if(hasPop === 1) {
						hasPop = 0 ;
						var remDlg = setTimeout(function () {
							document.body.removeChild(poPup);
							document.body.removeChild(dialogBox);
							clearTimeout(remDlg);
						}, 300);
					}
			};//弹窗移除
			this.bindTap(document.getElementById('com-btn-sure'));
			document.getElementById('com-btn-sure').onclick = function(){
				remDialog();
				if(typeof callback === "function"){
					callback();
				}
			};


			if(flag === true){
				document.getElementById('com-btn-cancel').onclick = function(){
					remDialog();
				};
				this.bindTap(document.getElementById('com-btn-cancel'));
			}
		}
	};
});