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
准备工主要有三点
### 下载 unrar
请先确保 AnyConnect 已链接，不然即便是很小的软件下载速度也很慢。
1. 去 WinRAR 的[官网](https://www.rarlab.com/download.htm)
2. 下载图中圈出的软件：

![unrar](https://github.com/Linerre/Jessie/blob/dev/bash/images/unrar.jpg)

注意，此处为 5.80 版本的，**不要下载 5.90 beta**， 5.90这个版本有问题。

3. 找到下载后的文件（默认是下载到 Downloads 那个文件夹里），双击即可解压。解压后会有一个文件夹，双击进入文件夹，**确认下面三个文件**存在：

![3-files](https://github.com/Linerre/Jessie/blob/dev/bash/images/3-files.jpg)

其中 `unrar` 便是解压文件，免费，正是需要的软件。按住 `Command` 健并依次用鼠标选中图中的三个文件，然后再按 `Command+c` 复制这三个文件。

*注意*： `rar` 是用来压缩文件的，它提供40天试用，过后就会收费。由于实际只需要解压，而不需要压缩，故可以忽略它。而且在 macOS 系统上有好用且免费的其他软件来制作压缩文件，所以**完全不必理会**此处的 `rar`。

4. 在选中当前文件夹的情况下（屏幕右上角可以看到 Finder），用组合键 `Shift+Command+G`(⇧⌘G) ，此时会弹出一个输入框：

![type](https://github.com/Linerre/Jessie/blob/dev/bash/images/usr-local-bin.jpg)

在该框内输入`/usr/local/bin`，然后点击 Go

5. 现在就来到了 `/usr/local/bin` 这个文件夹下，直接按 `Command+v` 将刚才那三个文件拷贝到该文件下即可，安装完成。

6. 验证安装。打开 iTerm 然后直接输入 `unrar -?`，如果看到下面一大串信息，则安装成功：

![unrar-installed](https://github.com/Linerre/Jessie/blob/dev/bash/images/unrar-installed.jpg)



#### 下载 The Unarchiver (备选)
这个软件没办法自动解压文件，需要手动操作，只是作为备选，毕竟自动失败了，只能手动了…（leon🌝厚着脸皮说道

软件（如图）需要去 App Store 下载，也可以去[官网](https://theunarchiver.com/)点击链接跳转至苹果商店。

![The Unarchiver](https://github.com/Linerre/Jessie/blob/master/bash/images/The-Unarchiver.jpg)

软件是免费的，又是从苹果商店下载的，也就是说：绿色免费软件。它专门用来对付 `.rar`格式的文件。



### 查看脚本文件 `copy` 的权限
确认脚本文件 `copy` 的使用权限：
1. 用命令 `pwd` 查看当前是否在 `~/Desktop/Jessie/bash` 这个路径下，如果不在，用 `cd` 命令移动到该路径下。如果之前刚执行过 `git pull`, 则只需 `cd bash` 即可。
2. 用 `ls -lh` 这个命令查看文件的信息，如下图所示：

![mode](https://github.com/Linerre/Jessie/blob/dev/bash/images/mode.jpg) 

注意图中圈出的部分，只需要**从左向右看前四位**，是否为 `-rwx`。

3. 如果不是，则使用命令 `chmod 755 copy` 来更改文件的权限，更改后重新用 `ls -lh`查看，应该前四位就是 `-rwx` 了。

### 确认作业总文件夹的名称
确认存放放作业的总文件夹名字，比如我的是下图中的 Homework-original。当然建议把文件名改短一些，比如改成 hw 或者 assign 等。

![folder](https://github.com/Linerre/Jessie/blob/master/bash/images/folder.jpg)

**注意**：这里默认这个文件夹是存放在桌面上的，如果你存放到了其他地方，可以拷贝一份到桌面上，有两个好处：
- 可以把桌面上的当作一个备份
- 可以用桌面上的这个备份来做测试，失败了也不影响你的源文件

## 输入变量
1. 输入 `cd Desktop` 移动到桌面
2. 接着输入 `. Jessie/bash/copy`

即先输入一个点（英文的句号），然后空一格，然后输入后面这个路径，一摸一样地输入就好。

3. 此时需要你输入第一步中的变量 folder：就是存放作业的总文件夹名，比如 hw
4. 回车

不出意外，终端会返回一些提示：
1. 提示拷贝了哪些同学的作业：一大串信息，学生的名字被标记为蓝色
2. 提示
	- 学生总数
	- 交作业的学生总数
	- 未交作业的学生总数（若大于零，即有学生未交作业，则将其单独列出）
3. 提示拷贝结束

## comp
comp 是 compress 的缩写。在批改完作业后，就可以用同样的方法运行这个脚本：
1. `cd Desktop`
2. `. Jessie/bash/comp`

这个脚本运行时会提示也会要求你输入需要操作的文件夹，当然还是存放学生作业的总文件夹，比如 hw。然后脚本开始运行：
1. 删除学生 Submission 文件夹内容
2. 开始压缩
3. 压缩结束

压缩后，桌面上会多一个 `.zip` 文件夹，文件夹的名字就是你输入的文件夹名，比如 `Assignment-1.zip`。


