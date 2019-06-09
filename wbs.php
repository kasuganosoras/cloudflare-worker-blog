<?php
/**
 *
 *    Workers Blog Manager Tools
 *
 *    https://github.com/kasuganosoras/cloudflare-worker-blog
 *
 */

echo <<<EOF
    __        __         _                 ____  _             
    \ \      / /__  _ __| | _____ _ __ ___| __ )| | ___   __ _ 
     \ \ /\ / / _ \| '__| |/ / _ \ '__/ __|  _ \| |/ _ \ / _` |
      \ V  V / (_) | |  |   <  __/ |  \__ \ |_) | | (_) | (_| |
       \_/\_/ \___/|_|  |_|\_\___|_|  |___/____/|_|\___/ \__, |
                                                         |___/ 
    Cloudflare Workers Blog System by Akkariin

    https://github.com/kasuganosoras/cloudflare-worker-blog


EOF;

$base_dir = @file_get_contents(__DIR__ . "/.wbs.env");

if(empty($base_dir)) {
	echo date("[Y-m-d H:i:s] ") . "\033[1;33m配置文件为空或不存在，进入设置。\033[0m\n";
	config();
	exit;
}

function isExist($list, $name) {
    foreach($list as $post) {
        if($post['file'] == $name) {
            return true;
        }
    }
    return false;
}
if(isset($argv[1])) {
	switch($argv[1]) {
		case "u":
			update();
			break;
		case "upload":
			update();
			break;
		case "n":
			newpost();
			break;
		case "new":
			newpost();
			break;
		case "c":
			config();
			break;
		case "config":
			config();
			break;
		default:
			exit("\033[1;31m[ERROR]\033[0m 未知命令 {$argv[1]}\n");
	}
	exit;
} else {
	echo <<<EOF
Usage:
	n, new      Create a new post
	u, upload   Upload the post to Github
	c, config   Change the program options


EOF;
	exit;
}
function update() {
	global $base_dir;
	$dir = @scandir("{$base_dir}/posts/");
	$list = json_decode(file_get_contents("{$base_dir}/list.json"), true);
	if(!$list) {
		exit("\033[1;31m[ERROR]\033[0m 读取列表失败！中断请求。\n");
	}
	$ai = 0;
	foreach($list as $post) {
		if(!file_exists("{$base_dir}/{$post['file']}")) {
			echo date("[Y-m-d H:i:s] ") . "\033[1;33m目录中找到文章 {$post['file']}，但是文件不存在，从列表移除。\033[0m\n";
			array_splice($list, $ai, 1);
			$ai++;
		} else {
			echo date("[Y-m-d H:i:s] ") . "\033[1;32m目录中找到文章 {$post['file']}，文件存在。\033[0m\n";
		}
	}
	$i = 0;
	foreach($dir as $file) {
		if($file !== "." && $file !== ".." && $file !== "") {
			if(!isExist($list, "posts/{$file}")) {
				echo date("[Y-m-d H:i:s] ") . "\033[1;34m文章\033[0m \033[1;32m{$file}\033[0m \033[1;34m未在列表中定义，请输入需要设置的名称，留空跳过此文件。\033[0m\n> ";
				$newname = trim(fgets(STDIN));
				if($newname !== "") {
					$list[] = Array(
						'title' => $newname,
						'time' => date("Y-m-d H:i:s"),
						'file' => "posts/{$file}"
					);
					$i++;
				}
			}
		}
	}
	if($i !== 0) {
		echo date("[Y-m-d H:i:s] ") . "正在更新文章并重建目录索引...";
		@file_put_contents("{$base_dir}/list.json", json_encode($list, JSON_UNESCAPED_UNICODE));
		echo "\033[1;32m完成！\033[0m\n";
		echo date("[Y-m-d H:i:s] ") . "是否立即推送代码？(Y/n)\n> ";
		$upload = trim(fgets(STDIN));
		if(strtolower($upload) == "y") {
			system("cd {$base_dir}/ && git pull && git add . && git commit -m 'update files' && git push");
			echo date("[Y-m-d H:i:s] ") . "\033[1;32m代码推送完成！\033[0m\n";
		}
		exit;
	} elseif($ai !== 0) {
		echo date("[Y-m-d H:i:s] ") . "正在重建目录索引...";
		file_put_contents("{$base_dir}/list.json", json_encode($list, JSON_UNESCAPED_UNICODE));
		echo "\033[1;32m完成！\033[0m\n";
		echo date("[Y-m-d H:i:s] ") . "是否立即推送代码？(Y/n)\n> ";
		$upload = trim(fgets(STDIN));
		if(strtolower($upload) == "y") {
			system("cd {$base_dir}/ && git pull && git add . && git commit -m 'update files' && git push");
			echo date("[Y-m-d H:i:s] ") . "\033[1;32m索引更新完成！\033[0m\n";
		}
		exit;
	} else {
		echo date("[Y-m-d H:i:s] ") . "没有搜索到新文章，索引无需更新，依然要尝试推送更新吗？(Y/n)\n> ";
		$upload = trim(fgets(STDIN));
		if(strtolower($upload) == "y") {
			system("cd {$base_dir}/ && git pull && git add . && git commit -m 'update files' && git push");
			echo date("[Y-m-d H:i:s] ") . "\033[1;32m文章更新、上传完成！\033[0m\n";
		}
	}
}
function newpost() {
	global $base_dir;
	$list = json_decode(file_get_contents("{$base_dir}/list.json"), true);
	if(!$list) {
		exit("\033[1;31m[ERROR]\033[0m 读取列表失败！中断请求。\n");
	}
	while(empty($newname)) {
		echo date("[Y-m-d H:i:s] ") . "请输入新文章的 ID（A-Za-z0-9 _ -）\n> ";
		$input = trim(fgets(STDIN));
		if(preg_match("/^[A-Za-z0-9\-\_]{1,32}$/", $input)) {
			if(file_exists("{$base_dir}/posts/{$input}.md")) {
				echo date("[Y-m-d H:i:s] ") . "\033[1;31m[ERROR]\033[0m 文件名 {$input}.md 已经存在，请尝试其他名字。\n";
			} else {
				$newname = $input;
			}
		} else {
			echo date("[Y-m-d H:i:s] ") . "\033[1;31m[ERROR]\033[0m 文件名 {$input}.md 不合法，请尝试其他名字。\n";
		}
	}
	while(empty($newtitle)) {
		echo date("[Y-m-d H:i:s] ") . "请输入新文章的标题\n> ";
		$input = trim(fgets(STDIN));
		if(empty($input)) {
			echo date("[Y-m-d H:i:s] ") . "\033[1;31m[ERROR]\033[0m 标题不能为空！\n";
		} elseif(mb_strlen($input) > 32) {
			echo date("[Y-m-d H:i:s] ") . "\033[1;31m[ERROR]\033[0m 标题不能超过 32 个字！\n";
		} else {
			$newtitle = $input;
		}
	}
	passthru("touch \"{$base_dir}/posts/{$newname}.md\" && vim \"{$base_dir}/posts/{$newname}.md\"");
	$list[] = Array(
		'title' => $newtitle,
		'time' => date("Y-m-d H:i:s"),
		'file' => "posts/{$newname}"
	);
	file_put_contents("{$base_dir}/list.json", json_encode($list, JSON_UNESCAPED_UNICODE));
	echo date("[Y-m-d H:i:s] ") . "\033[1;32m文章已储存，接下来您可以使用 wbs u 命令来上传到 Github\033[0m\n";
}
function config() {
	while(empty($basedir)) {
		echo date("[Y-m-d H:i:s] ") . "请输入项目根目录，结尾不需要 /\n> ";
		$input = trim(fgets(STDIN));
		if(!file_exists($input) || !is_dir($input)) {
			echo date("[Y-m-d H:i:s] ") . "\033[1;31m[ERROR]\033[0m 文件名 {$input} 不存在或不是一个目录。\n";
		} else {
			$basedir = $input;
		}
	}
	@file_put_contents(__DIR__ . "/.wbs.env", $basedir);
	echo date("[Y-m-d H:i:s] ") . "\033[1;32m配置储存完成。\033[0m\n";
}
