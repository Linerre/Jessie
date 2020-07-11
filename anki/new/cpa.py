#! *-* coding: uft-8 *-*

import sys
sys.path.append('../../../office/anki/new/bad_to_good/')
# sys.path.append('../Jessie/anki/new/bad_to_good/')

from datetime import date

import data_io
import html_tools
import para_scanner
import pprint

# -------------------------- urls -------------------------- #
# normal pages (q_list length = 25 and a_list length = 5 or = 10)
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/130097.html'

# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/119377.html'

# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/135026.html'

# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/127474.html'

# 7-10
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/136629.html'
# 7-9
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/136356.html'
# 7-8
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/135991.html'
# 7-7
# url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/135748.html'
# 7-6
url = 'http://www.zgcjpx.com/cpa/tiku/lianxi/jjf/135325.html'



# -------------------------- body -------------------------- #
  
# get the question page and anwser lists
q_html = html_tools.get_html(url)
a_html = html_tools.get_answer_html(url)

# two subjects to learn
SUB_1 = '经济法'
SUB_2 = '审计'
ext = '.csv'
current = str(date.today()) + '-'

# card_index = a tag with url inside it, telling where the question is from
# tuple unpacking
filename, card_ind = html_tools.filename_getter(q_html, url)

q_list = html_tools.target_tags(html_tools.filter_tags, q_html) # question list
a_list = html_tools.target_tags(html_tools.filter_tags, a_html) # answer list


if len(q_list) == 25:
    print(f'q_list length is should be {len(q_list)} (==25)')
    print()
    q_list, que_types = para_scanner.question25(q_list, q_html.h2)
    print(f'Now the q_list length becomes {len(q_list)}')
    print()
    print('Now the Q list looks like:', q_list, sep='\n')
    print('Question types contatin: ', que_types, sep='\n')
        

# len(q_list) != 25:
else:
    print(f'The original q_list is {len(q_list)} (!=25)')
    q_list, que_types = para_scanner.question_ab(q_list)
    print(f'Now the q_list length becomes {len(q_list)}')
    print()
    print('Now the Q list looks like:', q_list, sep='\n')
    print()
    print('Question types contatin: ', que_types, sep='\n')
        

if len(a_list) == 5:
    print(f'a_list length is {len(a_list)} (==5)')
    a_list = para_scanner.answer5(a_list)
    print(f'Now the a_list length becomes {len(a_list)}')
    print()
    print('Now the Q list looks like:', a_list, sep='\n')
    

elif len(a_list) == 10:
    print(f'a_list length is {len(a_list)} (==10)') #10
    a_list = para_scanner.answer10(a_list)
    print(f'Now the a_list length becomes {len(a_list)}') #5
    print(a_list)
    
#     if filename == SUB_1 and que_types != []: 
#         data_io.write_answer(current, SUB_1, ext, a_list, card_ind, que_types)
#     elif filename == SUB_2 and que_types != []:
#         data_io.write_answer(current, SUB_2, ext, a_list, card_ind, que_types)
#     else:
#         print(f'Sth wrong with filename: {current + filename} or Q types {que_types}')

# a_list length != 10 and != 5
else:
    print(f'a_list length is {len(a_list)} (!=10 and !=5)') 
    a_list = para_scanner.answer_ab(a_list)
    print(f'Now the a_list length becomes {len(a_list)} (expected: 5)') # 5
    print('And it looks like:')
    print(a_list)
    
    
# -------------------------- data io -------------------------- #
    
q_and_a = data_io.merger(q_list, a_list)

if filename == SUB_1 and que_types != []: 
    data_io.write_answer(current, SUB_1, ext, q_and_a, card_ind, que_types)
elif filename == SUB_2 and que_types != []:
    data_io.write_answer(current, SUB_2, ext, q_and_a, card_ind, que_types)
else:
    print(f'Sth wrong with filename: {filename} or Q types {que_types}')


