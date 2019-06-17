# Cloudflare workers blog

Cloudflare workers + Github 实现的动态博客系统，使用边缘计算，无需服务器

Workers 是 Cloudflare 提供的边缘计算服务，原本是收费的，现在免费了，每天有 10 万次请求的免费额度。

用户可以使用 JavaScript 编写自己的程序，然后可以直接通过域名访问运行。

演示博客地址：https://blog.natfrp.org/

## 如何部署

首先在 Cloudflare 控制面板创建一个新的 workers

![img](https://i.natfrp.org/a89af0dd723f5be7a9d779509f06657f.png)

将 workers.js（或者 workers-sakurafrp.js） 的内容根据自己情况修改，然后替换 Cloudflare 在线编辑器的默认代码。

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

## 自定义 Workers 绑定域名

请阅读此文章：https://blog.natfrp.org/?p=posts%2Fworkers-custom-domain.md

## JavaScript 资源

如果你仔细查看 workers.js，你会看到一些 https://cn.tql.ink:4443/ 的资源文件

我建议在实际使用时将这些资源下载下来放到其他地方，或者使用 CDN，因为这是我自己的演示环境域名，并不稳定。

## WBS 管理工具

这个工具使用 PHP 开发，需要安装 PHP 运行环境，文件就是 wbs.php，用于快捷管理文章。

将 wbs.php 复制到任意目录，例如 `/usr/local/tools/`，然后编辑 `~/.bashrc`，结尾新增一行

```bash
alias wbs='php /usr/local/tools/wbs.php'
```

接着输入 `source ~/.bashrc` 更新。

现在你就可以使用 `wbs` 命令来进行文章操作了，第一次运行会要求输入项目目录（就是你储存文章的项目）

- wbs n / wbs new 写一篇新文章
- wbs u / wbs upload 上传已经写好的文章
- wbs c / wbs config 重新配置 wbs

## 评论系统

workers-sakurafrp.js 默认使用了 Sakura Comments 评论系统，你可以在我的博客下方留言申请域名白名单，或者更换为其他的评论系统。

文章地址：https://blog.natfrp.org/2 （你还可以在 Issues 里提出，通过任意方式告诉我即可）

## 开源协议

本项目使用 MIT 协议开源，在遵守协议的前提下可任意修改，创作自己的主题等。
