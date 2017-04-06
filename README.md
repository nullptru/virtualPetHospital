###项目部署
前台部分：  
1. 运行环境：node v7.5.0  
2. 配置：   

* 前提：node环境已经成功安装  
* 转换node数据源为淘宝源 
  ```
  npm config set registry http://registry.npm.taobao.org/
  ```
* 命令行定位到项目主路径，运行**npm i**命令进行相关模块的安装  

3. 运行

* 前提：后端环境已经配置运行成功
* 命令行中运行**npm start**命令，运行成功后将自动打开浏览器并进入[http://localhost:3000](http://localhost:3000)，显示登陆界面