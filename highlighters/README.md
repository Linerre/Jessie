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