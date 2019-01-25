from bs4 import BeautifulSoup as bs
from splinter import Browser
import urllib.request
import time



# fn to initialize browser object
def init_browser():
	# @NOTE: Replace the path with your actual path to the chromedriver
	executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
	return Browser("chrome", **executable_path, headless=True)

def scrape_page():
	# url to scrape
	url = 'https://www.onthesnow.com/united-states/skireport.html'

	# instantiate browser
	browser = init_browser()
	# go to page
	browser.visit(url)
	# wait for dynamic elements to load
	time.sleep(2)
	
	for i in range(10):
		# page uses lazy loading, so force a scroll action to load more resorts
		browser.execute_script("window.scrollTo(0, 5000);")
		# wait for page to load
		time.sleep(2)

	# instantiate soup object
	soup = bs(browser.html, 'html.parser')

	# we're done with our browser
	browser.quit()

	# extract relevant table
	table = soup.find('table', class_='resortList').find('tbody')
	# extract rows for each resort
	resort_rows = table.find_all('tr')
	resorts = {}
	for i in range(120):
		# added some print statements to help us extract useful info prior to building dictionaries
		# print('--------------------------------------------------------------------------------------------')
		# print('Row {}'.format(i))
		cells = resort_rows[i].find_all('td')
		for cell in cells:
			# resort name
			if 'resort' in cell['class']:
				resort_name = cell.find('a').text
			# open status
			if 'openstate' in cell['class']:
				div = cell.find('div')
				# the background color of the circle seems to be our best bet
				# for identifying open status
				if 'background-color: rgb(28, 148, 0);' in div['style']:
					open_status = True
				else:
					open_status = False
			# new snow
			if 'nsnow' in cell['class']:
				inches = cell.find_all('b')
				inches_24_hr = int(inches[0].text.replace('"', ''))
				inches_72_hr = int(inches[1].text.replace('"', ''))
			# open lifts
			if 'open_lifts' in cell['class']:
				open_lifts_str = cell.text.replace(' ', '')
				if open_lifts_str[0] == '/':
					open_lifts_str = f'0{open_lifts_str}'
				open_lifts_list = open_lifts_str.split('/')
				print(open_lifts_list)

				try:
					open_num = int(open_lifts_list[0])
					total_num = int(open_lifts_list[1])
					open_lifts = open_num / total_num
				
				except:
					open_lifts=0
					# if int(open_lifts_list[0])!=0:
					# 	open_num = 0
					# 	total_num = int(open_lifts_list[0])
					# 	open_lifts = open_num / total_num
					# else:
					# 	open_lifts=0

		resorts[resort_name] = {
								'open_status': open_status, 
								'inches_24_hr': inches_24_hr, 
								'inches_72_hr': inches_72_hr,
								'open_lifts': open_lifts
								}

	return resorts

