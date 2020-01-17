#!/usr/bin/env python3
# -*- coding:utf-8 -*-

import random

with open('questions.txt', 'r', encoding='utf-8') as f:
    content = f.readlines() 
    order_list = ['A. ', 'B. ', 'C. ', 'D. ']
    tmp = []

    # remove empty lines
    lines = [i for i in content if i != '\n']

    for line in lines:
        QA_raw = line.split('／')
        QA = {
            'Question': QA_raw[0],
            'Options' : QA_raw[1:5],
            'Answer'  : QA_raw[5].replace('\n', '') # replace \n if any so that line41 will work well
        }

        random.shuffle(QA['Options'])

        # front side
        options_front = QA['Options'].copy()


        # add A B C D to options
        for opt in options_front: 
            options_front[options_front.index(opt)] = order_list[options_front.index(opt)] + opt
    
        anki_notes_front = QA['Question'] + ',' + '<br>'.join(options_front)
        
        # back side
        options_back = QA['Options'].copy()

        # add A B C D to options and mark up the anwser at the same time
        for opt in options_back: 
            # if the answer, add option enumeration and mark it up 
            if QA['Answer'] == opt:
                options_back[options_back.index(opt)] = '<span style="background-color: #ebcb8b">' + order_list[options_back.index(opt)] + opt + '</span>'
            # if not, just add enumeration
            else:
                options_back[options_back.index(opt)] =  order_list[options_back.index(opt)] + opt
        

        anki_notes_back = QA['Question'] + ',' + '<br>'.join(options_back)

        # use ',' to separate front and back
        anki_notes = anki_notes_front + ',' + anki_notes_back 
        
        # add each notes to a temporary container
        tmp.append(anki_notes)

    
    # Done with all the notes; glue them into one piece
    anki_cards = '\n\n'.join(tmp)



with open('test_notes.txt', 'w', encoding='utf-8') as new_f:
    new_f.write(anki_cards)

print('Anki notes batch processing done! ^_^')
