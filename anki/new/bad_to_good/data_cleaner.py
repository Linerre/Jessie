#! Abnormal options handling module

ex_num = ('1','2','3','4','5')

def abnormal_to_normal(a_list):
    '''
    dealing with abnormal options
    combined type 'A. xxx B. yyy' (occasionally) --> 'A. xxx', 'B. yyy'
    divided type 'A xxxx\nyyyy\nzzz' (sometimes) --> 'A. xxx yyy zzz'
    '''
    
    prefix = ('A', 'B', 'C', 'D', '1', '2', '3', '4', '5')
    unwanted = []
    temps = []
    points = []

    # remove <p></p> and replace \u3000 with whitespaces
    for i in range(len(a_list)):
        a_list[i] = a_list[i].get_text().replace('\u3000', ' ')
    
        # locate all such strange options as divided into multiple lines
        if not a_list[i].startswith(prefix):
            a_list[i] = a_list[i-1] + '\n' + a_list[i]
            unwanted.append(a_list[i-1])
        
        # or handle such options as combined into one line  
        elif ('A' in a_list[i] and 'B' in a_list[i]) or ('C' in a_list[i] and 'D' in a_list[i]):   
            broken = a_list[i].split()  # divide the option
            temps += broken             # store in a temp list
            points.append(i)            # record thier positions
            unwanted.append(a_list[i])  # record them too

    # 'A. xxx B. yyy' --> 'A. xx', 'B. yy' 
    a_list.insert(points[0]+1, temps[0])
    a_list.insert(points[0]+2, temps[1])
    a_list.insert(points[1]+3, temps[2])
    a_list.insert(points[1]+4, temps[3])

    # remove the strange options
    for i in unwanted:
        a_list.remove(i)

    return a_list

def abnormal_finder(a_list):
    '''
    return a list containing the indexes of
    abnormal ex
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
                abnormal_que[a_list[i]].append(a_list[n])
                break


    print('Abnormal question(s) found: ', abnormal_que, sep='\n')






if __name__ == '__main__':
    import sys
    abnormal_to_normal(list(sys.argv[1]))
