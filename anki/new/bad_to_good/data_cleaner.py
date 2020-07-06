#! Abnormal options handling module
# -*- coding: utf-8 -*-

import pprint

def write_answer(fname, ext, list_a, card_ind, list_types):
    with open(fname+ext, 'r', encoding='utf-8') as file:
        content = file.readlines()
        for i in range(len(list_a)):
            content[i] = content[i].replace('\n', ',') + \
                list_a[i] + ',' + \
                card_ind  + ',' + \
                que_types[i] + ' ' + fname + \
                '\n'

    with open(fname+ext, 'w', encoding='utf-8') as file:
        for i in range(len(a_list)):
            file.write(content[i])

    return content



def abnormal_finder(a_list):
    '''
    return a list containing the indexes of
    abnormal options (exceptions)
    '''
    ex_num = ('1','2','3','4','5')
    # string ex index, human-readable
    ex_ind = []
    # abnormal docker
    abnormal = []

    for i in a_list:
        if i.startswith(ex_num):
            ex_ind.append(a_list.index(i))

    for i in ex_ind:
        if not (a_list[i+1].startswith('A') and \
                a_list[i+2].startswith('B') and \
                a_list[i+3].startswith('C') and \
                a_list[i+4].startswith('D')):
            # print('Exception found: ', a_list[i], sep='\n')
            abnormal.append(i)

    return abnormal 

def abnormal_handler(a_list_of_index, a_list, ex_num = ('1','2','3','4','5')):
    # capture the abnormal(s)
    abnormal_que = {}
    for i in a_list_of_index:
        abnormal_que[a_list[i]] = [] # put the ab que into a dict as key
        n = i
        # if a line is not a question, add it to the dict 
        # as the corresponding key's value: key(Q)-value(Opts)
        while not a_list[n+1].startswith(ex_num):
            abnormal_que[a_list[i]].append(a_list[n+1])
            n += 1
            # force to break when reaching the list end
            if n == len(a_list) - 1: 
                # abnormal_que[a_list[i]].append(a_list[n])
                # break out the while loop
                break
    
    # delete the abnormals from the original
    for q in abnormal_que.keys():
        for i in abnormal_que[q]:
            a_list.remove(i)
        a_list.remove(q)


    # output the abnormals; handle manually for now?
    print('Abnormal question(s) found: ')
    pp = pprint.PrettyPrinter(indent=2, width=70)
    pp.pprint(abnormal_que)
    
    return a_list








if __name__ == '__main__':
    import sys
    abnormal_to_normal(list(sys.argv[1]))
