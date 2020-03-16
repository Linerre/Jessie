# 查看脚本文件的的权限
## 以 copy 脚本为例
确认脚本文件 `copy` 的使用权限：
1. 用命令 `pwd` 查看当前是否在 `~/Desktop/Jessie/bash` 这个路径下，如果不在，用 `cd` 命令移动到该路径下。如果之前刚执行过 `git pull`, 则只需 `cd bash` 即可。
2. 用 `ls -lh` 这个命令查看文件的信息，如下图所示：

![mode](https://github.com/Linerre/Jessie/blob/dev/bash/images/mode.jpg) 

注意图中圈出的部分，只需要**从左向右看前四位**，是否为 `-rwx`。

3. 如果不是，则使用命令 `chmod 755 copy` 来更改文件的权限，更改后重新用 `ls -lh`查看，应该前四位就是 `-rwx` 了。