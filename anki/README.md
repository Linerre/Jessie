# To Jessie

_If not comfortable with reading the black-background version of this README in VS Code on your laptop, please read it on [GitHub](https://github.com/Linerre/Jessie/tree/master/anki)._

In this directory **three** files are used together to make Anki notes.

## The `prepro.py` file
This is the Python script that carries out the tasks. It works in this way:
1. read the content of `questions.txt` file
2. process the content
3. put the formatted content into the `notes.txt` file.

The two `.txt` files will be explained later. This section focuses on the script itself.

The script should always be placed in the same directory as its targeted two `.txt` files.

To use the script, first move to the directory. Open the terminal and type in:
```
cd Desktop/Jessie/anki
```
Then use `ls` command to see if you can see the three files. 

Before running the script, the respective status of the three files should be:
- `prepro.py` as it is
- `questions.txt` contains questions, options, and answer, separated by `／`
- `notes.txt` file is empty. Ready to hold formatted notes created by `prepro.py`

## The `questions.txt` file
The `questions` file is for collecting multiple-choice(MC) questions ONLY. 

### Format
When adding a single question, please follow this format:

```
问题／选项一／选项二／选项三／选项四／正确答案
```

In the above formula, the **正确答案** *must* be identical to one of the four options. Here is a real example:
```
图书馆允许用户借阅的书籍数目上限是（ ）？／10本／20本／30本／没有限制／没有限制
```

### Line indicator
One question should take one line, even though it might be so long that the editor automatically wraps it:
```
快要下班时已经又饿又困了，下列哪种情况算是雪上加霜（ ）？／去了趟洗手间，回来后发现显示器不见了！／刷新闻时看到回家的地铁线要停运半小时／外面突然开始下大雨／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了
```

The above loooooooong `question + options + answer` line is in fact **one single** line.

The only character that defines a line is the newline string: `\n`. That is, every time when the `Enter` key or `Return` key  gets hit, a newline will be created right below:

```
图书馆允许用户借阅的书籍数目上限是（ ）？／10本／20本／30本／没有限制／没有限制

快要下班时已经又饿又困了，下列哪种情况算是雪上加霜（ ）？／去了趟洗手间，回来后发现显示器不见了！／刷新闻时看到回家的地铁线要停运半小时／外面突然开始下大雨／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了
```
Above are three lines: 
1. a `question + options + answer` line 
2. an empty line
3. another `question + options + answer` line

### The `／` symbol

The previous half-width comma `,` (i.e. the English comma) is a bad choice, for two reasons:

#### 1. a potential source of bugs
Suppose we have the following `question + options + answer` line:

```
Three brothes-Bob, Tom, Peter-are in dispute with each other. Why?,reason1,reason2,reason3,reason4,reason3
```

The anki notes (take front side as example) are expected to be:
```
Three brothes-Bob, Tom, Peter-are in dispute with each other. Why?
reason1
reason2
reason3
reason4
```

Yet since the `,` has been set to be the separator and the question itself contains `,`, we will indeed get this:
```
Three brothes-
Bob
Tom
Peter
-are in dispute with each other. Why?

...

```
In fact, Python will just complain when processing such lines. 

#### 2. Not as convenient as expected
When using the half-width comma `,` while all the questions are in full-width Chinese characters and punctuation marks, it is such a pain that we have to use `caps lock` key or `Ctrl/Option + Space` keys (on macOS) to _frequently_ switch between En input and Zh input. Can't we just stick to one single input all the time? Yes, we can:

1. switch to pinyin input
2. type as uaual
3. use `／` as the separator (the key is next to `>` or `shift` at the lower right on the keyboard)

![the `／` key](https://github.com/Linerre/Jessie/blob/master/anki/mac_kb.jpg)

**NOTE**

Type in every Chinese character, punctuation mark, separator in the pinyin mode. No need to switch to English input at all~!

## The `notes.txt` file
Before the processing, this file will either be _empty_ or _contain_ the notes which was imported to Anki last time.

Safely ignore it when working on collecting `question + options + answer`. The `prepro.py` will automatically seek for it when the processing starts. 

Only when it is time to import notes to Anki will this file be needed. 