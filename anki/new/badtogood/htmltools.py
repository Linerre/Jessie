#! /bin/env python

# functions/methods for getting html pages by string url
from urllib.request import urlopen
from bs4 import BeautifulSoup as soup

# return a parsed Q html obj via the question page url
def get_html(a_url):
    '''
    Q url --> Q page html
    '''
    with urlopen(a_url) as request:
        meta_page = request.read()
    
    html = soup(meta_page, 'html.parser')
    return html

# return a parsed A html obj via the question page url
def get_answer_html(a_url):
    '''
    Q url (--> Q page html) --> A page html
    '''
    q_page = get_html(a_url)
    
    # get the string url for the anwser page
    answer_button = q_page.find_all('a', attrs={'class': 'anniu'})
    try:
        if len(answer_button) != 1 and answer_button[0].get_text() != '查看答案':
            raise ValueError
        else:
            anwser_url = (q_page.find_all('a', attrs={'class': 'anniu'})[0]['href'])
    except ValueError as e:
        return e
    
    a_html = get_html(anwser_url)
    return a_html
