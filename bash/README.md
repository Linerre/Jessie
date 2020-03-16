# 用法说明
## 文件说明
在 `bash` 这个文件里：
1. README 就是此份说明文档
2. `images` 是存放截图的文件夹，不必理会
3. **copy 就是拷贝文档的脚本，是最重要的脚本**
4. comp 用来在批阅完成之后，删除每一个学生 Submission 文件里的内容，并将作业总文件夹压缩成**同名文件夹.zip**文件。比如，如果作业总文件夹叫做 `Assignment-1`，那么运行 comp 后，会在桌面上生成一个 `Assignment-1.zip` 的压缩文件。
5. remove 这个脚本执行的是 copy 的反向操作，也就是把学生文件夹整体恢复到使用 copy 之前的样子。⚠️：**千万不要在批改作业之后使用 remove，否则所有批改的文件将会丢失**。

下面讲述的操作办法，稍微繁琐一些，但是相对好理解。日后会讲解更简单的办法，需要学习一点超纲知识。

## 准备工作
准备工主要有四点
1. [下载安装 unrar](https://github.com/Linerre/Jessie/blob/dev/bash/docs/README-rar.md)
2. [下载安装 The Unarchiver (备选)](https://github.com/Linerre/Jessie/blob/dev/bash/docs/README-unarchiever.md)
3. [查看脚本文件 `copy` 的权限](https://github.com/Linerre/Jessie/blob/dev/bash/docs/README-mode.md)
4. [确认作业总文件夹的名称](https://github.com/Linerre/Jessie/blob/dev/bash/docs/README-pathname.md)

⚠️：请一定阅读**第4条准备工作中的第一小节**。

## copy
1. 打开 iTerm （确保当前所在路径为 `~/Desktop`）
2. 接着输入 `. Jessie/bash/copy`

即先输入一个点（英文的句号），然后空一格，然后输入后面这个路径，一摸一样地输入就好。

3. 此时需要你输入第一步中的变量 folder：就是存放作业的总文件夹名，比如 hw
4. 回车

不出意外，终端会返回一些提示：
1. Progress Indicator
2. Summary:
	- 学生总数
	- 交作业的学生总数
	- 未交作业的学生总数（若大于零，即有学生未交作业，则将其单独列出）

## comp
comp 是 compress 的缩写。在批改完作业后，就可以用同样的方法运行这个脚本：

```. Jessie/bash/comp```

这个脚本运行时会提示也会要求你输入需要操作的文件夹，当然还是存放学生作业的总文件夹，比如 hw。然后脚本开始运行：
1. 删除学生 Submission 文件夹内容
2. 开始压缩
3. 压缩结束

压缩后，桌面上会多一个 `.zip` 文件夹，文件夹的名字就是你输入的文件夹名，比如 `Assignment-1.zip`。


