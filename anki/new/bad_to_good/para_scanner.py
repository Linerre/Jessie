#! /usr/bin/python
# -*- coding: utf-8 -*-

# A analyzer for various Q&A pages: re-organize the <p>/<p> tags
# that surround questions, options, and anwsers.
import re

# patterns
answer = r'[1-5\.【参考答案】:：]+(?P<opt>[A-D]+)[。【题目详解析:：】]+(?P<aly>.*)'
question  = r'[1-5\.\(【]+(?P<type>[单多项选择题]+)[\)】](?P<que>.*?)\((?P<chp>第.+?章.*?)\)'
question_h2 = r'[1-5\.]+(?P<que>.*)\((?P<chp>第.+?章.*?)\)'
h2_tag = r'<h2>(?P<type>.*?)</h2>'

# handle len(q_list) == 25
def normal_question(list_q, h2):
    '''
    raw input --> organized outpt for csv files:
    type,Q,chapter_info,optionA,...,A,analysis
    '''
    for i in (0,5,10,15,20):
        if h2 == None:
            # get a match
            q_match = re.search(question, list_q[i])
            # combine into one line
            list_q[i] = q_match.group('type') + ',' + \
            q_match.group('que') + ',' + \
            q_match.group('chp')
        else:
            q_match = re.search(question_h2, list_q[i])
            list_q[i] = re.sub(h2_tag, '\g<type>', str(h2)) + ',' + \
            q_match.group('que') + ',' + \
            q_match.group('chp')

    return list_q

# handle len(a_list) == 10
def answer_10(list_a, list_b):
    # combine answer with analysis
    for i in (1,3,5,7,9):
        list_b[i] = list_b[i-1] + list_b[i]
        a_match = re.search(answer, list_b[i])
        list_b[i] = a_match.group('opt') + ',' + \
        a_match.group('aly')

        # insert combined line to list_q
        list_a.insert(3*i+2, list_b[i])

    return list_a


# handle len(q_list) == 25 and len(a_list) = 5
def normal(list_a, list_b, h2, a_file):
    '''
    Append question type (in a <h2> tag) to each Q;
    Output organized lines suitable for csv files
    '''

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
                list_a[i] = str(h2) + ',' + \
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


# handle len(q_list) != 25
def abnormal_question(list_q, h2):
    pass

def terminator(a_list, q_op):
    '''
    turn a list into a dict where 
    key = Q and value = a list of Opts
    '''
    ex_num = ('1','2','3','4','5')
    # string ex index, human-readable
    ex_ind = []
    # abnormal docker


    for i in a_list:
        if i.startswith(ex_num):
            q_op[i] = []
            n = a_list.index(i)
            while not a_list[n+1].startswith(ex_num):
                q_op[i].append(a_list[n+1])
                n += 1
                if n == len(a_list) - 1:
                     q_op[i].append(a_list[n])
                     break
        else:
            continue

    # for i in ex_ind:
    #     if not (a_list[i+1].startswith('A') and \
    #             a_list[i+2].startswith('B') and \
    #             a_list[i+3].startswith('C') and \
    #             a_list[i+4].startswith('D')):
    #         # print('Exception found: ', a_list[i], sep='\n')
    #         abnormal.append(i)

    return q_op
