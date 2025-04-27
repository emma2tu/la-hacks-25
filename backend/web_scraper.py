from bs4 import BeautifulSoup
import requests
import time

def scrape_titles_abstracts_urls(query):
    url_query = '+'.join(query.split())
    url = f"https://pubmed.ncbi.nlm.nih.gov/?term={url_query}&sort="
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    titles = []
    hrefs = []
    abstracts = []
    paper_urls = []

    elements = soup.find_all(class_='docsum-title')
    
    for e in elements:
        titles.append(e.text.strip())
        if e.has_attr('href'):
            hrefs.append(e['href'])
        else:
            hrefs.append('')  # placeholder
    
    for href in hrefs:
        pubmed_url = f"https://pubmed.ncbi.nlm.nih.gov/{href}"
        pubmed_response = requests.get(pubmed_url)
        pubmed_soup = BeautifulSoup(pubmed_response.text, 'html.parser')

        time.sleep(1)  # polite delay

        paragraphs = pubmed_soup.find_all(class_="abstract-content selected")
        if paragraphs:
            abstracts.append(paragraphs[0].get_text(strip=True))
        else:
            abstracts.append("No abstract available.")

        elements = pubmed_soup.find_all(class_='id-link')
        
        if not elements or not elements[0].has_attr('href'):
            paper_urls.append(pubmed_url)
        else:
            paper_urls.append(elements[0]['href'])

    title_abstract_pairs = list(zip(titles, abstracts))
    title_to_abstract_dict = dict(zip(titles, abstracts))
    title_to_url_dict = dict(zip(titles, paper_urls))

    return titles, title_abstract_pairs, title_to_abstract_dict, title_to_url_dict
