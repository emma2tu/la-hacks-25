from groq_api_client import speech_to_text
from query_generator import identify_research_topic, generate_query
from web_scraper import scrape_titles_abstracts_urls
from gemini_api_client import identify_relevant_papers, generate_relevant_findings, assemble_widget_contents

def fill_info_cards(audio_input=None, text_input=None):

    # using groq_api_client
    input = ""
    if not audio_input and not text_input:
        raise ValueError("Either audio_input or text_input must be provided.")
    # if both are provided, raise an error
    elif audio_input and text_input:
        raise ValueError("Both audio_input and text_input cannot be provided at the same time.")
    elif audio_input:
        input = speech_to_text(audio_input)
    else:
        input = text_input
    print(f"Input: {input}")

    # using query_generator
    research_topic = identify_research_topic(input)
    query = generate_query(research_topic)
    print(f"Research Topic: {research_topic}")
    print(f"Query: {query}")

    # using web_scraper
    titles, title_abstract_pairs, title_to_abstract_dict, title_to_url_dict = scrape_titles_abstracts_urls(query)

    # using gemini_api_client
    relevant_titles = identify_relevant_papers(titles, title_abstract_pairs, title_to_url_dict, research_topic)
    title_to_summary_dict = generate_relevant_findings(relevant_titles, title_to_url_dict, title_to_abstract_dict, research_topic)
    title_summary_abstract_tuples = assemble_widget_contents(relevant_titles, title_to_summary_dict, title_to_abstract_dict)
    
    cards = []
    for tuple in title_summary_abstract_tuples:
        cards.append({ "title": tuple[0], "findings": tuple[1], "readMore": tuple[2] })
    
    print("\n")
    print("\n")
    print(f"Cards: \n{cards}")
    return cards

if __name__ == "__main__":
    import sys

    audio_input = None
    text_input = None

    for arg in sys.argv[1:]:
        if arg.startswith("audio_input="):
            audio_input = arg.split("=", 1)[1]
        elif arg.startswith("text_input="):
            text_input = arg.split("=", 1)[1]

    fill_info_cards(audio_input=audio_input, text_input=text_input)

