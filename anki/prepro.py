#!/Users/leon/anaconda3/bin/python
# -*- coding:utf-8 -*-

import random

with open('questions.txt', 'r', encoding='utf-8') as f:
    # content = f.readlines() 
    order_list = ['A. ', 'B. ', 'C. ', 'D. ']
    tmp = []
    style = 'style="background-color:'
    bg_color = '#ebcb8b'
    left_mark = '<span {}>'.format(style+bg_color)
    right_mark = '</span>'

    # remove empty lines
    lines = [i for i in f if i != '\n']

    # get the number of questions
    number_of_q = len(lines)
    number_of_e = 0
    tags_of_e = []

    for line in lines:
        QA_raw = line.split('／')
        
        # catch any separator error before the processing
        try:
            if len(QA_raw) == 8:
                pass
            else:
                raise IndexError
        except IndexError:
            number_of_e += 1
            tags_of_e.append(line) # get the line that raises error 
            continue


        QA = {
            'Question': QA_raw[0],
            'Options' : QA_raw[1:5],
            'Answer'  : QA_raw[5],
            'Pages'   : QA_raw[6],
            'Analysis': QA_raw[7].replace('\n', '')  # replace \n if any so that line 48 will work well
        }

        random.shuffle(QA['Options'])

        # front side
        options_front = QA['Options'].copy()


        # add A B C D to options
        for opt in options_front: 
            options_front[options_front.index(opt)] = order_list[options_front.index(opt)] + opt
    
        anki_notes_front = QA['Question'] + ',' + '<br>'.join(options_front) + ',' + QA['Pages'] + ',' + QA['Analysis']
        
        # back side
        options_back = QA['Options'].copy()

        # add A B C D to options and mark up the anwser at the same time
        for opt in options_back: 
            # if the answer, add option enumeration and mark it up 
            if QA['Answer'] == opt:
                options_back[options_back.index(opt)] = left_mark + order_list[options_back.index(opt)] + opt + right_mark
            # if not, just add enumeration
            else:
                options_back[options_back.index(opt)] =  order_list[options_back.index(opt)] + opt
        

        anki_notes_back = QA['Question'] + ',' + '<br>'.join(options_back) + ',' + QA['Pages'] + ',' + QA['Analysis']

        # use ',' to separate front and back
        anki_notes = anki_notes_front + ',' + anki_notes_back 
        
        # add each notes to a temporary container
        tmp.append(anki_notes)

    
    # Done with all the notes; glue them into one piece
    anki_cards = '\n\n'.join(tmp)



with open('notes.txt', 'w', encoding='utf-8') as new_f:
    new_f.write(anki_cards)

print('-' * 40)
print('Anki notes batch processing done!')
print(f'😎  Processed {number_of_q} card notes in total.')
print(f'😊  {number_of_q - number_of_e} succeeded.')

if number_of_e != 0:
    print(f'😱  {number_of_e} failed:')
    for e in tags_of_e:
        print(f'Error occurred in {e}') 


