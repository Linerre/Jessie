#! /bin/env python
#! *-* coding: uft-8 *-*

# A web scrapper for CPA drills
import sys
sys.path.append('../../../office/anki/new/bad_to_good/')

import data_cleaner
import html_tools
import para_scanner
import pprint

# -------------------------- urls -------------------------- #
# normal pages (q_list length = 25 and a_list length = 5 or = 10)
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/130097.html'

# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/119377.html'


# q_list.length == 25 and a_list.length == 10
url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/135026.html'

# h2 page
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/119625.html'

# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/118642.html'

# abnormal page 1: q_list length < 25
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/129721.html'

# abnormal page 2: q_list length > 25
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/kj/129401.html'

# q_list = 25 but a_list = 9
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/118903.html'


# -------------------------- body -------------------------- #
  
# get the question page and anwser lists
q_html = html_tools.get_html(url)
a_html = html_tools.get_answer_html(url)

# two subjects to learn
SUB_1 = '经济法'
SUB_2 = '审计'
ext = '.csv'

# card_index = a tag with url inside it, telling where the question is from
# tuple unpacking
filename, card_ind = html_tools.filename_getter(q_html, url)

q_list = html_tools.target_tags(html_tools.filter_tags, q_html) # question list
a_list = html_tools.target_tags(html_tools.filter_tags, a_html) # answer list


if len(q_list) == 25 and len(a_list) == 5:
    with open(filename, 'a', encoding='utf-8') as file:
        para_scanner.question25_and_answer5(q_list, a_list, q_html.h2, file)

elif len(q_list) == 25 and len(a_list) == 10:
    q_list, que_types = para_scanner.question25(q_list, q_html.h2)
    para_scanner.answer10(q_list, a_list)


    
    if filename == SUB_1:
    # 'a' means to update weekly with content of each day appended to that of the previous day
    # 'w' means to update daily with content of each day replacing that of the previous day
    # also possible: a separate file for each day/week, independent of the previous ones
        with open(SUB_1+ext, 'w', encoding='utf-8') as file:
            for i in (0,6,12,18,24):
                file.write(q_list[i] + ',' + \
                          q_list[i+1] + ',' + \
                          q_list[i+2] + ',' + \
                          q_list[i+3] + ',' + \
                          q_list[i+4] + ',' + \
                          q_list[i+5] + ',' + \
                          card_ind    + ',' + \
                          que_types[i//6] + '\n')
                
        # above order:  que, opA, opB, opC, opD, chp, answer, analysis, index(=url), tag1 tag2
        #               1     2    3    4    5    6    7         8        9           10
    
    elif filename == SUB_2:
        pass
    
    else:
        print(f'Subject {filename} NOT defined.')
    
elif len(q_list) != 25:
    
    # find the abnormal option(s) and remove it(them)
    abnormal = data_cleaner.abnormal_finder(q_list)
    try:
        data_cleaner.abnormal_handler(abnormal, q_list)
    except Exception:
        print(abnormal)
    
    # write normal qustions to the file
    para_scanner.question20(q_list, q_html.h2)
    try:
        with open(filename, 'a', encoding='utf-8') as file:
            for i in (0,5,10,15):
                file.write(q_list[i] + ',' + \
                      q_list[i+1] + ',' + \
                      q_list[i+2] + ',' + \
                      q_list[i+3] + ',' + \
                      q_list[i+4] + '\n')
    except Exception:
        print(q_list)

# -------------------------- body -------------------------- #

# pp = pprint.PrettyPrinter(indent=2)
# pp.pprint(q_list)
print(len(q_list))