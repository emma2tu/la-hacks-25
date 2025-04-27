def prompt_to_query(user_prompt):
    """
    Generates a list of queries based on the user prompt.
    """
    research_topic = identify_research_topic(user_prompt)
    research_pico = _generate_pico(research_topic)
    research_query = _generate_queries(research_pico)

    return research_query

def identify_research_topic(user_prompt):
    """
    Identifies the research topic from the user prompt.
    """
    
    research_topic = "Dummy Research Topic"
    # call chat gpt API

    return research_topic

def _generate_pico(research_topic):
    """
    Generates a PICO question based on the research topic.
    """
    
    return ["TMJ", "orthognathic surgery", "patient reported outcomes"]

def _generate_queries(research_pico):
    """
    Generates research questions based on the research topic.
    """
    
    # generate synonyms form chatgpt or whatever
    # generate variations: [MESH] "" normal

    query = ' AND '.join(research_pico)
    # print("Query: ", query)
    return query

# prompt_to_query("Patient-Reported Outcomes in TMD Patients Undergoing Orthognathic Surgery")



