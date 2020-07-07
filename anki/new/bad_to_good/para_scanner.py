#! /usr/bin/python
# -*- coding: utf-8 -*-

# A analyzer for various Q&A pages: re-organize the <p>/<p> tags
# that surround questions, options, and anwsers.
import re

# patterns
answer = r'[1-5\.【参考答案难度系数中等简单很难】:：]+(?P<opt>[A-D]+)[。【题目详解析:：】]+(?P<aly>.*)'
question  = r'[1-5\.\(【]+(?P<type1>[单多])项?(?P<type2>选)[择题\)】]+(?P<que>.*?)\((?P<chp>第.+?章.*?)\)'
question_h2 = r'[1-5\.]+(?P<que>.*)\((?P<chp>第.+?章.*?)\)'
h2_tag = r'<h2>(?P<type1>[单多])项?(?P<type2>选)[择题\)】]+</h2>'
item_style = r'[A-D\. ]+'

# ------------------------------------------------------
# handle len(q_list) == 25
def question25(list_q, h2):
    '''
    raw input --> re-organized q_list with each item being:
    Q,A,B,C,D,chp
    question types list: [type1, type2, ...]
    '''
    # store que types
    que_types = []

    for i in (0,5,10,15,20):
        if h2 == None:
            # may need unit testing for the below block
            # get a match
            q_match = re.search(question, list_q[i])
            if q_match:
                # combine into one line
                list_q[i] = q_match.group('que')
                que_types.append(q_match.group('type1')+q_match.group('type2'))

                # remove option's item style A, B, C, D
                # Anki card will provide it once imported
                list_q[i+1] = re.sub(item_style, '', list_q[i+1], count=1)
                list_q[i+2] = re.sub(item_style, '', list_q[i+2], count=1)
                list_q[i+3] = re.sub(item_style, '', list_q[i+3], count=1)
                list_q[i+4] = re.sub(item_style, '', list_q[i+4], count=1) + \
                    ',' + q_match.group('chp')
            else:
                print(f'Match failed at index {i}.')
                print(f'Match failed at string {list_q[i]}.')
                break
        else:
            q_match = re.search(question_h2, list_q[i])
            # use try-except simply for learning purposes
            # it should work exactly the same as if-else
            try:
                list_q[i] = q_match.group('que')
                que_types.append(re.sub(h2_tag, '\g<type1>'+'\g<type2>', str(h2)))

                list_q[i+1] = re.sub(item_style, '', list_q[i+1], count=1)
                list_q[i+2] = re.sub(item_style, '', list_q[i+2], count=1)
                list_q[i+3] = re.sub(item_style, '', list_q[i+3], count=1)
                list_q[i+4] = re.sub(item_style, '', list_q[i+4], count=1) + \
                    ',' + q_match.group('chp')
            except Exception as e:
                print(e)
                print(f'Match failed at index {i}.')
                print(f'Match failed at string {list_q[i]}.')
                break

    # if failed to match, list_q remains untouched, que_types == []
    return list_q, que_types


# handle len(q_list) != 25
def question_ab(list_q):
    '''
    Output 2 types of info:
    1. Abnormal items position
    2. A dict with Q-4ops structure
    The abnormal item is Q-'' structure however.
    '''
    # first find the abnormal Q
    for i in (0,5,10,15):
        if not list_q[i].startswith(('1', '2', '3', '4', '5')):
            print(f'Abnormal Q at {i//5}.')
            break
            # no need to loop over each abnormal Q 
            # because if the 1st is ab, then all the reast will be too

    que_op = abq_cleaner(list_q)

    que_types = []
    new_qlist = []

    for q in que_op.keys():
        q_match = re.search(question, q)
        try:
            new_qlist.append(q_match.group('que') + ',' + \
                re.sub(item_style, '', que_op[q][0], count=1) + ',' + \
                re.sub(item_style, '', que_op[q][1], count=1) + ',' + \
                re.sub(item_style, '', que_op[q][2], count=1) + ',' + \
                re.sub(item_style, '', que_op[q][3], count=1) + ',' + \
                q_match.group('chp'))

            que_types.append(q_match.group('type1') + q_match.group('type2'))
        except Exception as e:
            print(e)
            print(f'Match failed at question {str(q)}.')

    return new_qlist, que_types


# handle len(a_list) == 10
def answer10(list_b):
    # combine answer with analysis
    for i in (1,3,5,7,9):
        list_b[i] = list_b[i-1] + list_b[i]
        a_match = re.search(answer, list_b[i])
        if a_match:
            list_b[i] = a_match.group('opt') + ',' + \
            a_match.group('aly')
        else:
            print(f'Match failed at index {i}.')
            print(f'Match failed at string: {list_b[i]}')
            break
    
    return [i for i in list_b if list_b.index(i) % 2 != 0]

# handle len(a_list) == 5
def answer5(list_b):
    '''
    Process normal answer type
    Output: correct_op, aly
    '''

    for i in range(len(list_b)):
        # match the needed parts
        a_match = re.search(answer, list_b[i])
        if a_match:
            # combine them into a csv and assign to the ith element
            list_b[i] = a_match.group('opt') + ',' + a_match.group('aly')
        else:
            print(f'Match failed at index {i}.')
            print(f'Match failed at string: {list_b[i]}')
            break
    return list_b



# handle len(a_list) != 5 and != 10
def answer_ab(a_list):
    ex_num = ('1','2','3','4','5')

    # ans_aly = {}

    for i in a_list:
        if i.startswith(ex_num): # loop over only Qs
            # add correct answer as a key
            # ans_aly[i] = []
            # record its position
            n = a_list.index(i)
            # add aly as the value for answer key
            while not a_list[n+1].startswith(ex_num):
                a_list[n] = a_list[n] + a_list[n+1]
                # ans_aly[i].append(a_list[n+1])
                n += 1
                # if n reaches the end
                if n == len(a_list) - 1:
                    break
        else:
            continue # skip over ops

    new_alist = []
    for a in a_list:
        # if len(ans_aly[a]) > 1:
        #     # combine multi lines into one
        #     ans_aly[a] = ' '.join(ans_aly[a])
        # elif len(ans_aly[a]) < 1:
        #     # replace the empty list with empty str
        #     ans_aly[a] = ' '
        a_match = re.search(answer, a)
        try:
            new_alist.append(a_match.group('opt') + ',' + \
                a_match.group('aly'))
        except Exception as e:
            print(e)
            continue

    return new_alist

# ------------------------------------------------------
# handle len(q_list) == 25 and len(a_list) = 5
def question25_and_answer5(list_a, list_b, h2, a_file):
    '''
    Append question type (in a <h2> tag) to each Q;
    Output organized lines suitable for csv files
    '''


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
        except Exception as e:
            raise e
            print(q_match)


# ------------- not very useful ---------------
def abq_cleaner(a_list):
    '''
    turn a list into a dict where 
    key = Q and value = a list of Opts
    '''
    ex_num = ('1','2','3','4','5')

    que_op = {}

    for i in a_list:
        if i.startswith(ex_num): # loop over only Qs
            # add Q as a key
            que_op[i] = []

            # record its position
            n = a_list.index(i)
            # add ops as the value for Q key
            while not a_list[n+1].startswith(ex_num):
                que_op[i].append(a_list[n+1])
                n += 1
                # if n reaches the end
                if n == len(a_list) - 1:
                    break
        else:
            continue # skip over ops

    # mark the abnormal 
    for q in que_op.keys():
        if len(que_op[q]) != 4:
            # take up the positon
            que_op[q] = ['\t','\t','\t','\t']
    
    return que_op


def standard_25(a_dict):
    for q in a_dict.keys():
        if len(a_dict[q]) < 4:
            n = len(a_dict[q])
            while n < 4:
                a_dict[q].append('|')
                n += 1
        elif len(a_dict[q]) > 4:
            prefix = ('A', 'B', 'C', 'D')
            unwanted = []
            # opt is of string type
            # a_dict[q] is of list type
            for opt in a_dict[q]:
                if not opt.startswith(prefix):
                    m = a_dict[q].index(opt)
                    # combine it into previous option
                    a_dict[q][m] = a_dict[q][m-1] + '\n' + a_dict[q][m]
                    unwanted.append(a_dict[q][m-1])
            for i in unwanted:
                a_dict[q].remove(i)
        else:
            continue

    return a_dict
