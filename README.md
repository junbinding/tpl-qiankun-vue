# 实践：qiankun 微前端本地环境搭建

## 背景

公司目前搭建统一的管理后台系统，将各个业务侧的管理页面通过微前端技术方案集成到一个后台中。对于前端同学而言，微前端涉及到服务端 nginx 相关配置，很难在本地去配置微前端调试环境。

本文会基于 Docker 搭建一个本地的微前端调试环境，方便前端同学进行本地调试。

## 项目实践

### 准备环境

- [Docker](https://www.docker.com/get-started)，只是个软件，装就完事儿了
- 三个项目
    - main 主项目，使用 vue2 基于 webpack 构建
    - demo1 子项目，使用 vue2 基于 webpack 构建
    - demo2 子项目，使用 vue2 基于 vite 构建

### 目录结构

```bash
.
├── conf                            // nginx 站点配置铺路
│   └── live.conf
├── docker-compose.yml              // docker 项目配置文件
├── html
│   ├── demo1                       // demo1 打包后静态资源存放目录
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── js
│   ├── demo2                       // demo2 打包后静态资源存放目录
│   │   ├── demo2.umd.js
│   │   └── index.html
│   └── main                        // main 打包后静态资源存放目录
│       ├── css
│       ├── favicon.ico
│       ├── fonts
│       ├── index.html
│       └── js
├── nginx.conf                      // nginx 主配置
└── source                          // 项目源码
    ├── demo1
    │   ├── README.md
    │   ├── babel.config.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   └── vue.config.js
    ├── demo2
    │   ├── favicon.svg
    │   ├── index.html
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── src
    │   └── vite.config.js
    └── main
        ├── README.md
        ├── babel.config.js
        ├── package-lock.json
        ├── package.json
        ├── pnpm-lock.yaml
        ├── src
        └── vue.config.js
```

### 项目启动

流程图

![流程图](https://n.frp.ik47.com/qiankun/Untitled.png)

修改本地 host 文件，使浏览器访问 [live.cc](http://live.cc) 指向本机，不走外网。

```bash
vi /etc/hosts

# 新增一行
127.0.0.1 live.cc
```

通过 git 拉取本项目

```bash
git clone https://github.com/junbinding/tpl-qiankun-vue.git
```

进入项目中，启动项目前确认本地环境 docker 已经启动，且本地 80 端口没有被占用。

```bash
docker-compose up -d
```

本地 nginx 服务已经启动，浏览器访问 [http://live.cc](http://live.cc) 看到如下页面

![主应用](https://n.frp.ik47.com/qiankun/Untitled%201.png)

点击「去 Demo1 的 About 页面」或者浏览器直接访问 [http://live.cc/sub1/about](http://live.cc/sub1/about) 页面，都能看到

![Untitled](https://n.frp.ik47.com/qiankun/Untitled%202.png)

这时候我们可以看到页面已经支持访问了。

### 新增项目

添加 nginx 配置文件 `conf/live.conf`，后面的 demo3 是新增的 nginx 子应用站点，只需要吧 demo3 打包后的文件放到 `html/demo3` 中即可。

```bash
server {
    listen       80;
    server_name  live.cc;

    location / {
      root /var/www/html/main;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    location /demo1 {
      root /var/www/html/demo1;
      index index.html;
      try_files $uri $uri/ /index.html;
    }

    location /demo2 {
      root /var/www/html/demo2;
      index index.html;
      try_files $uri $uri/ /index.html;
    }

    location /demo3 {
      root /var/www/html/demo3;
      index index.html;
      try_files $uri $uri/ /index.html;
    }
}
```

修改完 nginx 配置后，需要重启 nginx 对应的 docker 服务。

```bash
docker-compose restart
```

## 参考文档

1. [介绍 - qiankun (umijs.org)](https://qiankun.umijs.org/zh/guide)
2. [入门教程 - qiankun (umijs.org)](https://qiankun.umijs.org/zh/cookbook#%E5%9C%BA%E6%99%AF-1%E4%B8%BB%E5%BA%94%E7%94%A8%E5%92%8C%E5%BE%AE%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2%E5%88%B0%E5%90%8C%E4%B8%80%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%90%8C%E4%B8%80%E4%B8%AA-ip-%E5%92%8C%E7%AB%AF%E5%8F%A3)