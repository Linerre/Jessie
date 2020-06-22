#! /bin/env python

# functions/methods for getting html pages by string url
from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
import re

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


# filter out unwanted tags
def filter_tags(tag):
    '''
    return the needed p tags; used with target_tags function
    '''
    return tag.name == 'p' and len(tag.contents) == 1 and isinstance(tag.contents[0], str)

def target_tags(filters, html):
    '''use filters function to filter out unwanted tags from the parsed html
       return the filtered result as a list.
    '''
    tags = html.find_all(filters) # get a list of tags; 
    del tags[0]
    del tags[-1]
    for i in range(len(tags)):
       tags[i] = tags[i].get_text().replace('\u3000', ' ') # turn the tags to texts 

    return tags

def filename_getter(html_obj):
    subject_pat = re.compile('《(?P<sub>.*?)》')
    time_stamp = re.compile('(?P<date>\d-\d)')
    try:
        subject_tag = str(html_obj.find('div', attrs={'class': 'biaoti'}))
        subject = re.search(subject_pat, subject_tag).group('sub')
        date = re.search(time_stamp, subject_tag).group('date')
        filename = subject.ljust(4,'-') + date.rjust(6,'-')
    except Exception as e:
        raise e
    else:
        pass
    finally:
        return filename
     

