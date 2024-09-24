# Git 常用命令

> git 执行两条命令可以用 `;` 分开 `&&` 是 bash 的语法，git 本身不支持
>
> bash 中：
> `command1 & command2` command2 可能在 command1 完成之前就执行
> `command1 && command2` command2 会在 command1 执行完成后再执行，command1 如果执行失败的话，command2 不会执行

## 配置

```bash
# 检查当前仓库配置
git config --list

# 检查全局配置
git config --global --list

# 配置仓库用户名和邮箱
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 配置全局用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 分支

```bash
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地和远程分支
git branch -a

# 创建一个新分支，但是不会切换到该分支
git branch <分支名>

# 切换到一个已经存在的分支
git checkout <分支名>

# 创建一个新分支并立即切换到这个新分支
git checkout -b <分支名>
# 相当于
git branch <分支名> && git checkout <分支名>

# 删除本地分支
# 如果被删除的分支有未合并的内容，git会阻止
git branch -d <分支名>
# 强制删除，如果有未合并的内容，git不会阻止，会直接删除
git branch -D <分支名>

# 删除远程分支
git push origin --delete <分支名>
# Git 2.11 以上版本
git push origin :<分支名>
```

## 获取

```bash
# fetch远程，没有remote默认为origin
git fetch <remote>

# fetch origin
git fetch
git fetch origin

# fetch upstream
git fetch upstream
```

## rebase

```bash
# rebase
git rebase origin/master

# 解决冲突

# 标记冲突为已经解决
git add <解决冲突后的文件>

# 继续解决冲突
git rebase --continue

# 推送更改到远程仓库
git push origin <您的分支名> --force-with-lease
```
