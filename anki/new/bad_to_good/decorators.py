#! /usr/bin/env python
# -*- coding: utf-8 -*-

def length_meter(func, a_list):
	def wrapper():
		print(f'ATM The {a_list} length is {len(a_list)}')
		func()
		print(f'Now the {a_list} length is {len(a_list)}')
	return wrapper