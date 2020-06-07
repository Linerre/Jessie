#! /bin/env python

# A web scrapper for CPA drills

from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
from bs4 import SoupStrainer as strainer
import pprint

# open and retrieve the whole page
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/kj/129121.html'
url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/kj/129401.html'
with urlopen(url) as response:
    html = response.read()

# may consider using strainer to parse only the needed part
page = soup(html, 'html.parser')


# filter out annoying <p>s, and the rest would be the darling we love
def drills_para(tag):
    return tag.name == 'p' and len(tag.contents) <= 1 and isinstance(tag.contents[0], str)

drills = page.find_all(drills_para)

# remove unwanted elements
del drills[0]
del drills[-1]


# figure out how to clean the data

# ---------- cleaning -----------

pp = pprint.PrettyPrinter(indent=2)
pp.pprint(drills)

