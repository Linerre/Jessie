# 新 Anki 模板使用说明

## 新版
`git pull` 会更新很多文件，包括之前的 `copy` 和 `comp` 脚本文件。

如果喜欢一直在用的旧版脚本，可以先把旧版拷贝到某处。

如果拷贝到 Jessie 文件夹下的任意地方， `git pull` 之后可能会提醒：检测到有新的文件。请不用理会，它不会影响日后的 `git pull`，也不会影响旧版脚本。

如果拷贝到 Jessie 文件夹以外的地方，则以后运行那个脚本时，就需要 `. ~/path to the script`。比如，拷贝到桌面上一个叫做 `old` 的文件夹下，则：

`. ~/Desktop/old/copy`  就会运行那个脚本了。

## 更新 Anki 模版
首先用 `git pull` 把模板文件拖到电脑上。 

## 文件说明
### `HTML` 文件
`.html` 文件存放的是卡片的正反面:
- `single-front.html` 单选题卡片正面
- `single-back.html`  单选题卡片反面
- `multi-front.html`  多选题卡片正面
- `multi-back.html`   多选题卡片反面

`style.css`文件则是卡片样式，也就是高亮啊，字体啊等等。

## 使用说明
### 创建空白笔记类型
首先需要创建好空白的笔记类型：
1. 点击 **Add**

![add](https://github.com/Linerre/Jessie/blob/master/anki/images/add.png)

2. 从左上角的 **Type** 进入卡面类型选择界面

![Type](https://github.com/Linerre/Jessie/blob/master/anki/images/type.png)

3. 点击 **Manage**
 
![manage](https://github.com/Linerre/Jessie/blob/master/anki/images/manage.png)

4. 点击右侧的 **Add**

![Add new](https://github.com/Linerre/Jessie/blob/master/anki/images/add-new.png)

5. 选中 **Clone:Basic**, 然后点击 OK
   
![Clone Basic](https://github.com/Linerre/Jessie/blob/master/anki/images/clone-basice.png)

6. 卡片模板名称可以自定义，建议采用**卡片类型-卡片用途**的格式，比如 **Basic-单选** 代表基础卡片（只有正反面），用于单选题。
 
![single](https://github.com/Linerre/Jessie/blob/master/anki/images/single.png)

7. 此时可以关闭 **Note Types**，回到 **Choose Note Type** 的界面，找到刚才添加的模板，并选中

![Select single](https://github.com/Linerre/Jessie/blob/master/anki/images/select%20single.png)

8. 此时左上角的卡片类型已经是刚才新添加的类型了，在界面的左上角点击 **Fields**

![fields](https://github.com/Linerre/Jessie/blob/master/anki/images/Fields.png)

9.  在弹出的界面里，利用右侧的 **Add** 按钮，不断添加新的 Field，直到和下图完全一致。**注意**，Field 的名字请和图片中保持一致（包括大小写）。添加完成后可以点击 Close
  
![add fields](https://github.com/Linerre/Jessie/blob/master/anki/images/add%20field.png)

10. 现在卡片会变成下图所示:

![card current](https://github.com/Linerre/Jessie/blob/master/anki/images/card-cur.png)

11.  点击左上角 **Fields** 旁的 Card 按钮
 
![card button](https://github.com/Linerre/Jessie/blob/master/anki/images/card%20button.png)

12.  弹出如下图所示的卡片样式设计界面，删除所有初始的代码，把对应文件的代码拷贝到对应的区域，就可以了。
    
![card style](https://github.com/Linerre/Jessie/blob/master/anki/images/cardstyle.png)

13.  现在就可以试着添加一道题目啦。多选题的卡片制作思路是一样的。

## 其他
因为代码还有改进的空间，日后如果有新的推送更新，会有进一步说明。
    
