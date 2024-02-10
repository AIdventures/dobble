import os
import pandas as pd
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

# Read in the CSV file
df = pd.read_csv('initial_dataset.csv')

# Drop the rows with missing image URLs and info
df = df.dropna(subset=[
    'author', 'work_title', 'work_description', 'work_image_url'
])

# Save the filtered CSV file
df = df.reset_index(drop=True)
df.to_csv('prado.csv', index=False)

# Create the images directory if it doesn't exist
IMAGES_PATH = "images"
if not os.path.exists(IMAGES_PATH):
    os.makedirs(IMAGES_PATH)


DONE_URLS_FILE = 'done_images.txt'
done_urls = set()
if os.path.exists(DONE_URLS_FILE):
    with open(DONE_URLS_FILE, 'rt') as f:
        done_urls = set(f.read().splitlines())


def download_image(url):
    if url in done_urls:
        print("Skipping: ", url)
        return

    response = requests.get(url)
    if response.status_code == 200:
        # Get the file name from the URL
        file_name = url.split("/")[-1]
        # Create the file path
        file_path = os.path.join(IMAGES_PATH, file_name)
        with open(file_path, "wb") as f:
            f.write(response.content)
    else:
        print("Error with url: ", url)

N = 16
with ThreadPoolExecutor(max_workers=N) as executor:
    future_to_url = {executor.submit(download_image, url): url for url in df['work_image_url']}
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
