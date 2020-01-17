# To Jessie

_If you are not comfortable with the black-background version of this README, please read it on [GitHub](https://github.com/Linerre/Jessie/tree/master/anki)._

In this directory **three** files are used together to make Anki notes.

## The `prepro.py` file
This is the Python script that carries out the tasks. It works in this way:
1. read the content of `questions.txt` file
2. process the content
3. put the formatted content into the `notes.txt` file.

The two `.txt` files will be explained later. This section focuses on the script itself.

The script should always be placed in the same directory as its targeted two `.txt` files. 

## The `questions.txt` file
The `questions` file is for collecting multiple-choice(MC) questions ONLY. 

### Format
When adding a single question, please follow this format:

```
问题／选项一／选项二／选项三／选项四／正确答案
```

In the above formula, the **正确答案** *must* be identical to one of the four options. Here is a real example:
```
图书馆允许用户借阅的书籍数目上限是（ ）？,10本,20本,30本,没有限制,没有限制
```

### Line indicator
One question should take one line, even though it might be so long that the editor automatically wraps it:
```
快要下班时已经又饿又困了，下列哪种情况算是雪上加霜（ ）？／去了趟洗手间，回来后发现显示器不见了！／刷新闻时看到回家的地铁线要停运半小时／外面突然开始下大雨／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了
```

The above loooooooong `question + options + answer` line is in fact **one single** line.

The only character that defines a line is the newline string: `\n`. That is, every time when the `Enter` key or `Return` key  gets hit, a newline will be created right below:

```
图书馆允许用户借阅的书籍数目上限是（ ）？,10本,20本,30本,没有限制,没有限制

快要下班时已经又饿又困了，下列哪种情况算是雪上加霜（ ）？／去了趟洗手间，回来后发现显示器不见了！／刷新闻时看到回家的地铁线要停运半小时／外面突然开始下大雨／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了／催命鬼一样的 Leon 又来用花言巧语骗我去学编程了
```
Above are three lines: 
1. a `question + options + answer` line 
2. an empty line
3. another `question + options + answer` line

### The `／` symbol

The previous half-width comma `,` (i.e. the English comma) is a bad choice, for two reasons:

#### 1. It can be a bug
It will result in an alarming issue which conflicts with the Python code. Suppose we have the following `question + options + answer` line:

```
Three brothes-Bob, Tom, Peter-are in dispute with each other. Why?,reason1,reason2,reason3,reason4,reason3
```

The anki notes (take front side as example) are expected to be:
```
Front:
Three brothes-Bob, Tom, Peter-are in dispute with each other. Why?
reason1
reason2
reason3
reason4
```

Yet since the comma has been set to be the separator and the question itself contains commas, we will indeed get this:
```
Three brothes-
Bob
Tom
Peter
-are in dispute with each other. Why?

...

```
In fact, Python will just detect _Error_ when processing such lines. 

#### 2. Not as convenient as expected

## The `notes.txt` file
