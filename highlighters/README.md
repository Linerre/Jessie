# The Syntax Hilighter
**This is a work still in progress.** It is suppoed to support syntax highlighting for programming languages such as JavaScript, Python, Bash, Awk, and more. In one word, it will support whichever language I am and will be learning.

# Motivation
The hilighter will be used in Anki only. It may serve as a prototype for other future projects, though.

Given the popular `highligh.js` and `pygments` projects, why do I need to re-invent the wheel?

Well, it is simply because the two above tools are too big to meet my small need. I just need a flexible, lightweight, self-contatined syntax highlighter that works well with Anki.

First I was thinking about using Python, in which the whole software has been written and developed. Yet later I changed my mind because such work remains too complicated for me at the moment. So I turned to JavaScript instead.

# First Step
Considering my current JavaScript skills, it is difficult, if not impossible, for me to build a fully-functional syntax highlither from scratch, let alone such a script might not work at all due to [Anki's passive support for JavaScript](https://apps.ankiweb.net/docs/manual.html#javascript).

On the other hand, there is no need to highlight a big chunck of code in Anki, for two reasons:
1. Anki encourages users to memorize small piece of infomation at one time on each card;
2. The syntax highlighter is static, rather than dynamic like a parser is.

So for now I only need to handle a few lines of code and as I learn more and understand better, of course with help from Anki, I'll in the end get the job of creating a better syntax highlighter done!

# Usage
The `highlight.js` is the main JavaScript file that highlights the code. It is independent on three other `.js` modules stored in `langs`:
1. `clhj.js`, highlighting **c**ommand **l**ines generally used in *nix systems;
2. `jshl.js`, highlighting **J**ava**S**cript
3. `styles.js`, defining the styles relevant to highlighting.

In the future, there will be other `lang-hl.js` which highlights the specific language. 

## The `#` sign
The very idea behind the syntax highlighter is 1) use regular expressions to get the tokens and 2) mark up the tokens with css and replace the old ones. This process is static, meaning the highlighter does not parse the language in the way a parse does. So it will not report any syntax errors. 

Among all the tokens, some are difficult to catch. And the lack of support for the lookbehind feature in JavaScript only makes it more diffuclt to catch some patterns such as function/class names, strings, and digits. Therefore, there are two major artifacial aid in creating patterns:
1. `#` at the end of digits and operators;
2. `<br>` tag at the end of comments;
Take comment for example, instead of `// this is a comment`, it should be like this: `// this is a comment<br>`; A number will be `36#` rather than `36` alone. These special marks will be quitely dropped out after highlighting though.

## The `language` class
In the `anki-notes.html` file, there is a `<div>` with the class `language`, the `textContent` of it should be one of the following:
- js
- py
- Linux
- r

...
(support for more languages will be added)

## The console
Open the `.html` file in a browser, say Firefox, and open the console. The marked content will be there. Copy it to Anki with the HTML tags.
Below are two screenshots with highlighted syntax in both JavaScript and Linux command line:
![js](https://github.com/Linerre/Jessie/blob/dev/highlighters/images/js.jpg)
![cm](https://github.com/Linerre/Jessie/blob/dev/highlighters/images/Linux.jpg)