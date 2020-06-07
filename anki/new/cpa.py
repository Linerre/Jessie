#! /bin/env python

# A web scrapper to get exercises questons for CPA

from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
from bs4 import SoupStrainer as strainer
import pprint

# open and retrieve the whole page
with urlopen('http://www.zgcjpx.com/cpa/tiku/lianxi/kj/129401.html') as response:
    html = response.read()

page = soup(html, 'html.parser')

# the <p> tag needed all have one thing in common:
# they all contain only one child: a textnode
# so if a <p>'s contents has a length larger than one
# filter out that annoying <p>, and the rest would be the darling we love
def drills_para(tag):
    return tag.name == 'p' and len(tag.contents) <= 1 and isinstance(tag.contents[0], str)

test = page.find_all(drills_para)

len(test)
pp = pprint.PrettyPrinter(indent=2)
pp.pprint(test)

