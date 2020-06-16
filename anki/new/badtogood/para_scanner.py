#! /usr/bin/python
# -*- coding: utf-8 -*-

# A analyzer for various Q&A pages: re-organize the <p>/<p> tags
# that surround questions, options, and anwsers.
import re

# patterns
correct = re.compile('【答案】([A-D]+)')
analysis= re.compile('解析：(.*)。')
chapter = re.compile('\(第.+?章.*?\)')
q_type  = re.compile('[1-5]\.[\(【]([单多项选择题]+)[\)】](.*?)\((第.+?章.*?)\)')

def normal(list_a, list_b, a_file):
    '''
    raw input --> organized outpt for csv files:
    type,Q,chapter_info,optionA,...,A,analysis
    '''
    # input raw --> [A-D]+,XXX
    for i in range(len(list_b)):
        list_b[i] = correct.search(list_b[i]).group(1) + ',' \
                    + analysis.search(list_b[i]).group(1)
        list_a.insert((i+1)*5+i, list_b[i])
    
    # input raw --> [单多选]+,题目,索引
    for i in (0,6,12,18,24):
        list_a[i] = q_type.search(list_a[i]).group(1) + ',' \
                + q_type.search(list_a[i]).group(2) + ',' \
                + q_type.search(list_a[i]).group(3)
        a_file.write(list_a[i] + ',' + \
                  list_a[i+1] + ',' + \
                  list_a[i+2] + ',' + \
                  list_a[i+3] + ',' + \
                  list_a[i+4] + ',' + \
                  list_a[i+5] + '\n')
    
    return 'Normal page rendering done!'




