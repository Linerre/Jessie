# 确认作业总文件夹的名称
## 先做一项设置
每次打开 iTerm，默认当前所在的文件夹是用户的家目录，也就是 `~`。

但实际上，我们频繁需要访问的工作目录 (working directory) 确实家目录下的桌面，也就是 `~/Desktop`。所以，把桌面设置成打开 iTerm 后的默认目录，显然更方便。设置只需简单几步：
1. 打开 iTerm，然后按下 `cmd+,`，也就是 command 键和逗号键（如下图）。macOS 上的绝大多数软件都默认 `cmd+,` 为打开设置选项的快捷键。

![cmd+,](https://github.com/Linerre/Jessie/blob/dev/bash/images/settings.jpg)

2. 找到设置里面的 **profile**，单击：

![profile](https://github.com/Linerre/Jessie/blob/dev/bash/images/profile.jpg)

3. 在 **General** 选项下就可以看到 **Working Directory** 的设置。默认是 *Home Directory*, 这里手动更改为 *Directory* , 然后在给定的路径后面补充 `Desktop` 即可：

![wd](https://github.com/Linerre/Jessie/blob/dev/bash/images/wd.jpg)

设置好之后，重启 iTerm 就可以看到默认的登陆目录已经改为桌面啦！

## 确认存放放作业的总文件
比如我的是下图中的 Homework-original。当然**建议把文件名改短一些**，比如改成 hw 或者 assign 等。

![folder](https://github.com/Linerre/Jessie/blob/master/bash/images/folder.jpg)

**注意**：这里默认这个文件夹是存放在桌面上的，如果你存放到了其他地方，可以拷贝一份到桌面上，有两个好处：
- 可以把桌面上的当作一个备份
- 可以用桌面上的这个备份来做测试，失败了也不影响你的源文件
