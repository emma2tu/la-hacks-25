from config import GEMINI_API_KEY
import google.generativeai as genai

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

def ask_gemini(prompt):
    """
    Ask Gemini a question and get a response.
    """
    response = model.generate_content(prompt)
    print("inside ask gemini")
    return response.text


def identify_relevant_papers(titles, title_abstract_pairs, title_to_url_dict, research_topic):
    """
    Based on the list of titles and abstracts (TO DO)
    have gemini return a list of 3-5 papers it finds most relevant to the research_topic.
    """ 
    input_string = ""
    for idx, (title, abstract) in enumerate(title_abstract_pairs, 1):
        input_string += f"Paper {idx}:\nTitle: {title}\nAbstract: {abstract}\n\n"

    titles_string = "; ".join(titles)
    relevant_titles_string = _ask_gemini_relevant_titles(titles_string, input_string, research_topic)
    print(f"Relevant titles string: {relevant_titles_string}")

    selected_papers = [title.strip() for title in relevant_titles_string.split('; ')]
    print("Selected papers: ", selected_papers)
    selected_papers = [title for title in selected_papers if title in title_to_url_dict.keys()]
    print("Selected papers after filtering: ", selected_papers)

    return selected_papers

def _ask_gemini_relevant_titles(titles_string, input_string, research_topic):
    prompt = f"""
        You are a scientific research assistant.
        You must select exactly 3 to 5 paper titles that are most relevant to the research topic: "{research_topic}".
        ONLY use titles from the provided list. DO NOT invent new titles. These titles are separated by semicolons and a space.
        Titles: {titles_string}

        Respond with only a single line, semicolon-separated titles, no extra explanation, no additional text. Place them in order of relevance.
        
        Example format (no quotes, no bullets):
        Title 1; Title 2; Title 3

        Here are the papers:
        {input_string}
        """
    response = model.generate_content(prompt)
    print("inside gemini title selection call")
    return response.text.strip()

def generate_relevant_findings(relevant_titles, title_to_url_dict, title_to_abstract_dict, research_topic):
    relevant_urls = [title_to_url_dict[title] for title in relevant_titles]
    abstracts = [title_to_abstract_dict[title] for title in relevant_titles]
    title_url_abstract_tuples = list(zip(relevant_titles, relevant_urls, abstracts))
    summaries = []
    
    for title, url, abstract in title_url_abstract_tuples:
        summary = _ask_gemini_summary(research_topic, title, url, abstract)
        if summary:
            summaries.append(summary)
    
    title_to_summary_dict = dict(zip(relevant_titles, summaries))

    return title_to_summary_dict

def _ask_gemini_summary(research_topic, paper_title, paper_url, paper_abstract):
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

def assemble_widget_contents(relevant_titles, title_to_summary_dict, title_to_abstract_dict):
    widget_contents = []
    for title in relevant_titles:
        summary = title_to_summary_dict[title]
        abstract = title_to_abstract_dict[title]
        widget_contents.append((title, summary, abstract))
    return widget_contents