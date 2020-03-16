# 下载安裝 unrar
## 下载
请先确保 AnyConnect 已链接，不然即便是很小的软件下载速度也很慢。
1. 去 WinRAR 的[官网](https://www.rarlab.com/download.htm)
2. 下载图中圈出的软件：

![unrar](https://github.com/Linerre/Jessie/blob/dev/bash/images/unrar.jpg)

注意，此处为5.80版本的，**不要下载5.90 beta**， 5.90这个版本有问题。

3. 找到下载后的文件（默认是下载到 Downloads 那个文件夹里），双击即可解压。解压后会有一个文件夹，双击进入文件夹，**确认下面三个文件**存在：

![3-files](https://github.com/Linerre/Jessie/blob/dev/bash/images/3-files.jpg)

其中 `unrar` 便是解压文件，免费，正是需要的软件。按住 `Command` 健并依次用鼠标选中图中的三个文件，然后再按 `Command+c` 复制这三个文件。

*注意*： `rar` 是用来压缩文件的，它提供40天试用，过后就会收费。由于实际只需要解压，而不需要压缩，故可以忽略它。而且在 macOS 系统上有好用且免费的其他软件来制作压缩文件，所以**完全不必理会**此处的 `rar`。

## 安装
4. 在选中当前文件夹的情况下（屏幕右上角可以看到 Finder），用组合键 `Shift+Command+G`(⇧⌘G) ，此时会弹出一个输入框：

![type](https://github.com/Linerre/Jessie/blob/dev/bash/images/usr-local-bin.jpg)

在该框内输入`/usr/local/bin`，然后点击 Go

5. 现在就来到了 `/usr/local/bin` 这个文件夹下，直接按 `Command+v` 将刚才那三个文件拷贝到该文件下即可，安装完成。

6. 验证安装。打开 iTerm 然后直接输入 `unrar -?`，如果看到下面一大串信息，则安装成功：

![unrar-installed](https://github.com/Linerre/Jessie/blob/dev/bash/images/unrar-installed.jpg)