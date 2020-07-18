#! Abnormal options handling module
# -*- coding: utf-8 -*-

def merger(q_list, a_list):
    if len(q_list) == len(a_list):
        q_and_a = [q_list[i] + ',' + a_list[i] for i in range(len(q_list))]
        return q_and_a 
    else:
        print('Q and A do not match.')
        print(f'Q length: {len(q_list)}; A length {len(a_list)}')





def write_answer(time, fname, ext, alist, card_ind, types_list):
    with open(time+fname+ext, 'a', encoding='utf-8') as file:
        try:
            for i in range(len(alist)):
                file.write(alist[i] + ',' + \
                    card_ind  + ',' + \
                    types_list[i] + ' ' + fname + \
                    '\n')
        except Exception as e:
            return e
    return alist



if __name__ == '__main__':
    import sys
    abnormal_to_normal(list(sys.argv[1]))
