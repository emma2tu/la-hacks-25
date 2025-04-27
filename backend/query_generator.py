from gemini_api_client import ask_gemini

def identify_research_topic(user_prompt):
    """
    Identifies the research topic from the user prompt.
    """
    prompt = f"""
        From this prompt, identify the user's research topic:
        "{user_prompt}"
        """
    
    research_topic = ask_gemini(prompt)
    if not research_topic:
        raise ValueError("No research topic identified.")
    research_topic = research_topic.replace("\n", " ").strip()

    return research_topic

def generate_query(research_topic):
    """
    Generates research questions based on the research topic.
    """
    prompt = f"""
        Generate an advanced PubMed query from this research topic: "{research_topic}". 
        Include both MeSH terms and quoted terms. Every MeSH term should also be have its equivalent included in quotes. For example, ("term"[MeSH Terms] OR "term").
        Filter for humans only if applicable.
        Filter for recent studies if there are more than 20 results
        (start with the last 5 years, if there's less than 20 results, 
        expand it 5 years at a time until there are more than 20 results). 

        Output the query in a single line, no extra explanation, no additional text.
        Example format (no quotes, no bullets):
        (term1 OR term2) AND (term3 OR term4) AND (term5[MeSH Terms] OR term5) AND humans[Filter] AND ("2020"[Date - Publication] : "3000"[Date - Publication]) 
        """
    
    query = ask_gemini(prompt)
    if not query:
        raise ValueError("No query generated.")
    query = query.replace("\n", " ").strip()

    return query

def test_query_generator():
    topic1 = identify_research_topic("Help me find papers on TMJ and orthognathic surgery")
    # topic2 = identify_research_topic("Do microplastics cause cancer?")
    # topic3 = identify_research_topic("Help me find articles supporting my research on physical health and mental health correlation.")

    query1 = generate_query(topic1)
    # query2 = _generate_query(topic2)
    # query3 = _generate_query(topic3)

    print("Topic 1: ", topic1)
    print("Query 1: ", query1)
    # print("Topic 2: ", topic2)
    # print("Query 2: ", query2)
    # print("Topic 3: ", topic3)
    # print("Query 3: ", query3)

def main():
    test_query_generator()

if __name__ == "__main__":
    main()
