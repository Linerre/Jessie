#!/usr/bin/env python3
# -*- coding:utf-8 -*-

import random

with open('test.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines() # [1, 2, 3, ... , n]
    order_list = ['A. ', 'B. ', 'C. ', 'D. ']
    tmp = []

    for line in lines:
        QA_raw = line.split(',')
        QA = {
            'Question': QA_raw[0],
            'Options' : QA_raw[1:5],
            'Answer'  : QA_raw[5]
        }

        random.shuffle(QA['Options'])

        # front side
        options_front = QA['Options'].copy()

        for opt in options_front: 
            options_front[options_front.index(opt)] = order_list[options_front.index(opt)] + opt
    
        anki_notes_front = QA['Question'] + ',' + '<br>'.join(options_front)

         # back side
        options_back = QA['Options'].copy()

        for opt in options_back: 
            options_back[options_back.index(opt)] = order_list[options_back.index(opt)] + opt


        for opt in options_back: 
            if QA['Answer'] in opt:
                options_back[options_back.index(opt)] = '<span style="background-color: #ebcb8b">' + opt + '</span>'
            else:
                pass

        anki_notes_back = QA['Question'] + ',' + '<br>'.join(options_back)

        anki_notes = anki_notes_front + ',' + anki_notes_back # ',' to separate front and back
        
        tmp.append(anki_notes)
        anki_cards = '\n'.join(tmp)



with open('test.txt', 'w', encoding='utf-8') as new_f:
    new_f.write(anki_cards)

print('Anki notes batch processing done! ^_^')
