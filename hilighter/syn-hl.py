#!/Users/leon/anaconda3/bin/python
# -*- coding:utf-8 -*-
from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

with open('code.py', 'r', encoding='utf-8') as c:
    code = c.read()

with open('output.txt', 'w', encoding='utf-8') as o:
    o.write(highlight(code, PythonLexer(), HtmlFormatter()) + '∫-7')
