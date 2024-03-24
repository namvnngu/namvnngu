# Description: The setup of pulling the content of webpage with BeautifulSoup
# Source: https://youtu.be/4sWfYxrKIfI?t=1671
# Date: 21/01/2021

import sys
if sys.version_info[0] == 3:
    from urllib.request import urlopen, Request
else:
    from urllib import urlopen, Request
from bs4 import BeautifulSoup

url = 'https://example.com'
req = Request(url, headers = {'User-Agent': 'Mozilla/5.0'})

web_byte = urlopen(req).read()
web_page = web_byte.decode('utf-8') # latin-1

soup = BeautifulSoup(web_page, 'html.parser')