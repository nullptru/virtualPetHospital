#API文档
统一规定: 返回数据格式  
{  
  data : {/*数据主体*/},  
  err  : '', //错误信息  
  state : 200 //状态码  
}  
注：以下返回内容未注明data标签则只为data内容
###Login
1. GET ／captcha ：请求验证码；   
>返回：{  
>img_data: xxx  
>}

2. POST /validate :登陆认证；
>发送：{  
>username:xxx,  
>password:xxx,  
>captcha:xxx  
>}  
>返回：{  
>isValidated: true/false,  
>userType : 0/1  //0为普通用户  
>}

###用户管理
1. GET /admin/user/:page :	请求用户  

	> 返回：  
	{  
	data : {  
	id: id,  
	username: name,  
	userType : 0/1  //0为普通用户  
	},  
	page: 3  
	}
2. PUT/POST/DELETE /admin/user/
	>发送：PUT {  
	id: xx,   
	username:xxx,  
	password:xxx,  
	userType:xxx  
	}  
	POST   
	{    
	username:xxx,  
	password:xxx,  
	userType:xxx  
	}  
	DELETE  
	{  
	id : xx  
	} 
  	>  ------------
  	返回：  
  	{  
  	   result : true/false  
  	}

### 药品管理
1. GET /admin/medicine/:page :	请求用户  

	> 返回：  
	{  
	data : {  
	id: id,  
	medicineName: name,  
	medicineType : 0/1,  //0为普通用户  
    medicinePrice : 100,  
	description : ''  
	},  
	page: 3  
	}
2. PUT/POST/DELETE /admin/medicine/
	>发送：PUT {  
	id: xx,   
	medicineName: name,  
	medicineType : 0/1,  //0为普通用户  
    medicinePrice : 100,  
	description : ''  
		}  
	POST   
	{    
	medicineName: name,  
	medicineType : 0/1,  //0为普通用户  
    medicinePrice : 100,  
	description : ''   
	}  
	DELETE  
	{  
	id : xx  
	} 
  	>  ------------
  	返回：  
  	{  
  	   result : true/false  
  	}