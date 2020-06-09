#! /bin/env python

# A web scrapper for CPA drills

from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
# from bs4 import SoupStrainer as strainer
import re
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


# ----------- cleaning ----------- #
# to catch strange options which do not start with any of the below prefix
prefix = ('A', 'B', 'C', 'D', '1', '2', '3', '4', '5')
unwanted = []

# remove <p></p> and replace \u3000 with whitespaces
# also locate all the strange options
for i in range(len(drills)):
    drills[i] = drills[i].get_text().replace('\u3000', ' ')
    if not drills[i].startswith(prefix):
        drills[i] = drills[i-1] + '\n' + drills[i]
        unwanted.append(drills[i-1])


# remove the strange options (already turned into empyt string by magic!)
for i in unwanted:
    drills.remove(i)

# patterns for use in regular expressions
# extract (单选题) or (多选题) and chapter info like (第六章.风险与风险管理)
# this is necessary since later they will get in the way of processing questiona-and-options
que_type_pattern = re.compile('[\(【][单多]选题?[\)】]')
chp_info_pattern = re.compile('\(第.?章.*?\)')
questions_index = (0, 5, 10, 15, 20)

for i in questions_index:
    drills[i] = re.sub(que_type_pattern, '', drills[i])
    drills[i] = re.sub(chp_info_pattern, '', drills[i])

# change print() to write()
n = 0
for element in drills:
    if n > 0 and n % 5 == 4:
        print(element)
        n += 1
    else:
        print(element, end=',')
        n += 1

# ----------- cleaning ----------- #

pp = pprint.PrettyPrinter(indent=2)
pp.pprint(drills)

