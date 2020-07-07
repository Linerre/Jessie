#! Abnormal options handling module
# -*- coding: utf-8 -*-

def merger(q_list, a_list):
    q_and_a = [q + ',' + a for q in q_list for a in a_list]
    return q_and_a 




def write_answer(fname, ext, alist, card_ind, types_list):
    with open(fname+ext, 'w', encoding='utf-8') as file:
        try:
            for i in range(len(alist)):
                file.write(alist[i] + \
                    card_ind  + ',' + \
                    types_list[i] + ' ' + fname + \
                    '\n')
        except Exception as e:
            return e
    return alist



if __name__ == '__main__':
    import sys
    abnormal_to_normal(list(sys.argv[1]))
