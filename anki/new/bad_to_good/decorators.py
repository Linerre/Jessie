#! /usr/bin/env python
# -*- coding: utf-8 -*-

def length_meter(func):
	def wrapper(*args, **kwargs):
		print('This block got executed')
		func(*args, **kwargs)
		return func(*args,**kwargs)
	return wrapper