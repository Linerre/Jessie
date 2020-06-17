#! /usr/bin/python
# -*- coding: utf-8 -*-

# A analyzer for various Q&A pages: re-organize the <p>/<p> tags
# that surround questions, options, and anwsers.
import re


def normal_old(list_a, list_b, a_file):
    '''
    raw input --> organized outpt for csv files:
    type,Q,chapter_info,optionA,...,A,analysis
    '''
    answer = r'[1-5\.【参考答案】]+(?P<opt>[A-D]+)[。题目详解析:：]+(?P<aly>.*)'
    question  = r'[1-5\.\(【]+(?P<type>[单多项选择题]+)[\)】](?P<que>.*?)\((?P<chp>第.+?章.*?)\)'
    
    # input raw --> [A-D]+,XXX
    for i in range(len(list_b)):
        # get a match
        a_match = re.search(answer, list_b[i])
        # combine into one line
        list_b[i] = a_match.group('opt') + ',' + a_match.group('aly')
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

def normal(list_a, list_b, h2, a_file):
    '''
    Append question type (in a <h2> tag) to each Q;
    Output organized lines suitable for csv files
    '''

    answer = r'[1-5\.【参考答案】:：]+(?P<opt>[A-D]+)[。【题目详解析:：】]+(?P<aly>.*)'

    question  = r'[1-5\.\(【]+(?P<type>[单多项选择题]+)[\)】](?P<que>.*?)\((?P<chp>第.+?章.*?)\)'
    question_h2 = r'[1-5\.]+(?P<que>.*)\((?P<chp>第.+?章.*?)\)'

    for i in range(len(list_b)):
        # match the needed parts
        a_match = re.search(answer, list_b[i])
        # combine them into a csv and assign to the ith element
        list_b[i] = a_match.group('opt') + ',' + a_match.group('aly')
        # insert it to q_list
        list_a.insert((i+1)*5+i, list_b[i])

    for i in (0,6,12,18,24):
        # split the questions by matching the needed parts
        try:
            # no h2
            if h2 == None:
                q_match = re.search(question, list_a[i])

            # combine into a csv and assign to ith question
                list_a[i] = q_match.group('type') + ',' + \
                q_match.group('que') + ',' + \
                q_match.group('chp')
            
            # h2 type 
            else:
                q_match = re.search(question_h2, list_a[i])
                list_a[i] = h2 + ',' + \
                q_match.group('que') + ',' + \
                q_match.group('chp')

        # write to a csv file
            a_file.write(list_a[i] + ',' + \
                    list_a[i+1] + ',' + \
                    list_a[i+2] + ',' + \
                    list_a[i+3] + ',' + \
                    list_a[i+4] + ',' + \
                    list_a[i+5] + '\n')
        except:
            print(q_match)


