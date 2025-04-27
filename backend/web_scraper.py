from prompt_generator import prompt_to_query, identify_research_topic
from bs4 import BeautifulSoup
import requests
from config import GEMINI_API_KEY
import time

import google.generativeai as genai
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

research_topic = identify_research_topic("Patient-Reported Outcomes in TMD Patients Undergoing Orthognathic Surgery")


def scrape_titles_abstracts_urls():
    query = prompt_to_query("Patient-Reported Outcomes in TMD Patients Undergoing Orthognathic Surgery")
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

        # Wait for 1 second to avoid overwhelming the server
        time.sleep(1)
        # Extract the abstract
        paragraphs = pubmed_soup.find_all('p')
        if paragraphs:
            abstracts.append(paragraphs[0].get_text(strip=True))
        else:
            abstracts.append("No abstract available.")

        elements = pubmed_soup.find_all(class_='id-link')
        
        if not elements or not elements[0].has_attr('href'):
            print("No external paper link, summarizing from abstract.")
            paper_urls.append(pubmed_url)
        else:
            paper_urls.append(elements[0]['href'])

    title_abstract_pairs = list(zip(titles, abstracts))
    title_to_abstract_dict = dict(zip(titles, abstracts))
    title_to_url_dict = dict(zip(titles, paper_urls))

    return titles, title_abstract_pairs, title_to_abstract_dict, title_to_url_dict


def identify_relevant_papers(titles, title_abstract_pairs, title_to_url_dict):
    """
    Based on the list of titles and abstracts (TO DO)
    have gemini return a list of 3-5 papers it finds most relevant to the research_topic.
    """ 
    input_string = ""
    for idx, (title, abstract) in enumerate(title_abstract_pairs, 1):
        input_string += f"Paper {idx}:\nTitle: {title}\nAbstract: {abstract}\n\n"

    titles_string = "; ".join(titles)
    relevant_titles_string = _ask_gemini_relevant_titles(titles_string, input_string, research_topic)

    selected_papers = [title for title in relevant_titles_string.split(';')]
    selected_papers = [title for title in selected_papers if title in title_to_url_dict]

    return selected_papers

def _ask_gemini_relevant_titles(titles_string, input_string, research_topic):
    prompt = f"""
        You are a scientific research assistant.
        You must select exactly 3 to 5 paper titles that are most relevant to the research topic: "{research_topic}".
        ONLY use titles from the provided list. DO NOT invent new titles.
        Title list: {titles_string}

        Respond with only a single line, semicolon-separated titles, no extra explanation, no additional text. Place them in order of relevance.
        
        Example format (no quotes, no bullets):
        Title 1; Title 2; Title 3

        Here are the papers:
        {input_string}
        """
    response = model.generate_content(prompt)
    print("inside gemini title selection call")
    return response.text.strip()
    

def generate_relevant_findings(relevant_titles, title_to_url_dict, title_to_abstract_dict):
    
    relevant_urls = [title_to_url_dict[title] for title in relevant_titles]
    abstracts = [title_to_abstract_dict[title] for title in relevant_titles]
    title_url_abstract_tuples = list(zip(relevant_titles, relevant_urls, abstracts))
    summaries = []
    
    for tuple in title_url_abstract_tuples:
        summary = _ask_gemini_summary(research_topic, tuple[0], tuple[1], tuple[2])
        if summary:
            summaries.append(summary)

    title_summary_abstract_tuples = list(zip(relevant_titles, summaries, abstracts))

    return title_summary_abstract_tuples

def _ask_gemini_summary(research_topic, paper_title, paper_url, paper_abstract):
    """Send a paper to Gemini and get summarized results."""
    prompt = f"""
        You are a scientific research assistant.
        For the research paper below, summarize the most relevant findings for the research topic: "{research_topic}".
        Respond with only one short sentence.

        Title: {paper_title}
        URL: {paper_url}
        Abstract: {paper_abstract}
        """
    response = model.generate_content(prompt)
    print("inside gemini summary call")
    return response.text.strip()

def get_title_summary_abstract_tuples():
    titles, title_abstract_pairs, title_to_abstract_dict, title_to_url_dict, = scrape_titles_abstracts_urls()
    relevant_titles = identify_relevant_papers(titles, title_abstract_pairs, title_to_url_dict)
    title_summary_abstract_tuples = generate_relevant_findings(relevant_titles, title_to_url_dict, title_to_abstract_dict)
    
    return title_summary_abstract_tuples

def main():
    titles, title_abstract_pairs, title_to_abstract_dict, title_to_url_dict = scrape_titles_abstracts_urls()
    relevant_titles = identify_relevant_papers(titles, title_abstract_pairs, title_to_url_dict)
    title_summary_abstract_tuples = generate_relevant_findings(relevant_titles, title_to_url_dict, title_to_abstract_dict)
    
    for i, tuple in enumerate(title_summary_abstract_tuples, 1):
        print(f"PAPER {i}")
        print(f"Title: {tuple[0]}")
        print(f"Summary: {tuple[1]}")

if __name__ == "__main__":
    main()
