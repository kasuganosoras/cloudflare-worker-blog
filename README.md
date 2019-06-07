# Cloudflare workers blog
利用 CloudFlare workers + Github Pages 实现的动态博客

演示地址：https://blue-sun-6fe4.zerodream.workers.dev

## 如何部署

首先在 Cloudflare 控制面板创建一个新的 workers

![img](https://i.natfrp.org/a89af0dd723f5be7a9d779509f06657f.png)

将 workers.js 的内容根据自己情况修改，然后替换 Cloudflare 在线编辑器的默认代码。

点击 Save and deploy 保存。

## 如何编写文章

首先创建一个 Github 项目，名字随意，然后将这个项目 clone 到本地。

```
# 示例
git clone https://github.com/kasuganosoras/cloudflare-worker-blog
cd cloudflare-worker-blog/
```

进入项目文件夹，新建一个 posts 文件夹

```
mkdir posts/
```

在里面编写文章，内容一般用 .md 后缀即可，例如 helloworld.md

写完之后回到项目根目录（就是上级目录），然后新建一个 list.json

```
touch list.json
```

编辑 list.json，在里面写入以下内容

```json
[
  {
    "title":"文章名称",
    "time":"发布时间",
    "file":"posts/helloworld.md（或者其他名字）"
  }
]
```

如果你有多篇文章就这样写：

```json
[
  {
    "title":"文章1",
    "time":"2019-06-01",
    "file":"posts/1.md"
  },
  {
    "title":"文章2",
    "time":"2019-06-03",
    "file":"posts/2.md"
  },
  {
    "title":"文章3",
    "time":"2019-06-07",
    "file":"posts/3.md"
  } <--注意json格式，最后一篇文章的这里不需要逗号
]
```

一切就绪后，使用 `git push` 命令将代码推送到仓库上。

然后修改你的 workers，设置 github_base 为你的仓库名称，例如 `kasuganosoras/cloudflare-worker-blog`

现在访问你的 Workers 即可看到文章。

## JavaScript 资源

如果你仔细查看 workers.js，你会看到一些 https://cn.tql.ink:4443/ 的资源文件

我建议在实际使用时将这些资源下载下来放到其他地方，或者使用 CDN，因为这是我自己的演示环境域名，并不稳定。

## 开源协议

本项目使用 MIT 协议开源。
