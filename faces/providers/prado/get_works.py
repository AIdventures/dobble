import os
import wget
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0;Win64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'}

# Create pages path if doesn't exists
WORKS_PATH = "works"
if not os.path.exists(WORKS_PATH):
    os.makedirs(WORKS_PATH)
else:
    print("Skip folder.")

def download_page(url, i):
    print("Downloading page... #{}: {}".format(i, url))
    #wget.download(url, WORKS_PATH, headers=headers)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        with open(os.path.join(WORKS_PATH, url.split('/')[-1]), 'wb') as f:
            f.write(response.content)
    #  sleep 2  # Wait n seconds

FILE_URLS = 'works_urls.txt' #input("Enter the path of file containing URLs: ")
DONE_URLS_FILE = 'done_urls.txt'
N = 16
i = 0

# read done urls
done_urls = set()
if os.path.exists(DONE_URLS_FILE):
    with open(DONE_URLS_FILE, 'rt') as f:
        done_urls = set(f.read().splitlines())

with ThreadPoolExecutor(max_workers=N) as executor, open(FILE_URLS) as file:
    future_to_url = {executor.submit(download_page, URL.strip(), i): URL.strip() for i, URL in enumerate(file) if URL.strip() not in done_urls}
    for future in as_completed(future_to_url):
        url = future_to_url[future]
        try:
            future.result()
            print('Success:', url)
            done_urls.add(url)
            # Append url to done urls
            with open(DONE_URLS_FILE, 'at') as f:
                f.write(url + '\n')
        except Exception as exc:
            print('%r generated an exception: %s' % (url, exc))

print("Done!")