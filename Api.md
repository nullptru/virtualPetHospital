#API文档

###Login
1. GET ／captcha ：请求验证码；   
>返回：{  
>img_data: xxx  
>}

2. POST /validate :登陆认证；
>发送：{  
>name:xxx,  
>password:xxx,  
>captcha:xxx  
>}  
>返回：{  
>isValidated: true/false,   
>user:object,   
>err: state  
>}

3. 