
// branched from https://github.com/baobabKoodaa/future/blob/master/server.js 
// https://hwchase17.github.io/langchainjs/docs/modules/prompts/example_selectors
// https://github.com/Conner1115/LangChain.js-LLM-Template/tree/main/lib

// add pdf-parse?

import { OpenAI, OpenAIChat } from "langchain/llms";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";



// TODO
// add pdf-parse?
// add recursivetext

export async function getReview(input) {
  try {
    // let {
    //   system, promptInstructions, inputPrefix, exampleHistory, input,
    //   model, max_tokens = 256, temperature = 0.7
    // } = await request.json()

    const system = "You're a decorated professor at the top of the field, reviewing research papers.";
    const template = "{instructions} {persona} {textInput}";

    // variables
    const instructions = "You are reviewing research papers and abstracts. If you don't know, say you don't know. Do not break out of character unless told. Do not explain yourself. Answer as the following character, in the first person using 'I' instead of 'As a (character)': {persona}"

    let persona = input?.persona

    // testing only
    // input.persona = 'SCOR'
    // const persona = "Reviewer 2: Harsh critic who always finds something wrong with your paper"
    if(input?.persona.includes('SCOR')) {
      persona = `Senior PI: Your job is to improve the manuscript's chances to get accepted at the best journal possible. Review the manuscript by filling in the following template, in JSON format:

      Break first person responses. Please format the output in JSON format, as follows: 
      {
        "scor": {
          "significance": {
            "score":"(score from 1 (lowest) to 5)",
            "explanation":(200 character reasoning)"
          },
          "clarity": {
            "score":"(score from 1 (lowest) to 5)",
            "explanation":(200 character reasoning)"
          },
          "originality": {
            "score":"(score from 1 (lowest) to 5)",
            "explanation":(200 character reasoning)"
          },
          "rigor": {
            "score":"(score from 1 (lowest) to 5)",
            "explanation":(200 character reasoning)"
          },
        },
        "strengths": "(Explain strengths of the manuscript)",
        "weaknesses": "(Explain areas to improve of the manuscript)",
        "future": "(Steps to take to get the paper to the next level of journal; 1200 character reason)"
      }
      `;

    }
    const text = input?.text || `Determination of phage susceptibility as a clinical diagnostic tool: A routine perspective Valéry Daubie1,2, Houssein Chalhoub1,3, Bob Blasdel4, Hafid Dahma2, Maya Merabishvili5, Tea Glonti5, Nathalie De Vos6, Johan Quintens4, Jean-Paul Pirnay5, Marie Hallin3† and Olivier Vandenberg1,3,7*† 1Innovation and Business Development Unit, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 2Department of Microbiology, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 3Centre for Environmental Health and Occupational Health, School of Public Health, Université Libre de Bruxelles (ULB), Brussels, Belgium 4R&D department, Vesale Bioscience, Noville-sur-Mehaigne, Belgium 5Laboratory for Molecular and Cellular Technology, Queen Astrid Military Hospital, Brussels, Belgium 6Department of Clinical Chemistry, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 7Division of Infection and Immunity, Faculty of Medical Sciences, University College London, London, United Kingdom As the global burden of disease caused by multidrug resistant bacteria is a major source of concern, credible clinical alternatives to antibiotic therapy, such as personalized phage therapy, are actively explored. Although phage therapy has been used for more than a century, the issue of an easy to implement diagnostic tool for determining phage susceptibility that meets current routine clinical needs is still open. In this Review, we summarize the existing methods used for determining phage activity on bacteria, including the three reference methods: the spot test, the double agar overlay plaque assay, and the Appelmans method. The first two methods rely on the principle of challenging the overnight growth of a lawn of bacteria in an agar matrix to a known relative phage to bacteria concentration and represent good screening tools to determine if the tested phage can be used for a “passive” and or “active” treatment. Beside these methods, several techniques, based on “real-time” growth kinetics assays (GKA) have been developed or are under development. They all monitor the growth of clinical isolates in the presence of phages, but use various detection methods, from classical optical density to more sophisticated techniques such as computer-assisted imagery, flow-cytometry, quantitative real-time polymerase chain reaction (qPCR) or metabolic indicators. Practical considerations as well as information provided about phage activity are reviewed for each technique. Finally, we also discuss the analytical and interpretative requirements for the implementation of a phage susceptibility testing tool in routine clinical microbiology.`;

    // const model = new OpenAIChat({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      // modelName: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9
    });

    const prompt = new PromptTemplate({
      system: system,
      template: template,
      inputVariables: ["instructions", "persona", "journal", "textInput"],
    });



    // const splitter = new CharacterTextSplitter({
    //   separator: " ",
    //   chunkSize: 100,
    //   chunkOverlap: 50,
    // });
    // const documents = await splitter.splitDocuments([new Document({ pageContent: text })]);

    // console.log('documents:', documents)
    // need to process each document separately with chain.call, which gets expensive!
    // then you can use LLMChain to stitch them together
    // then summarize the final
    /*
    
      const chunks = splitter.createDocuments([text]);

      let output = "";

      for (const chunk of chunks) {
        const res = await chain.call({ inputText: chunk.pageContent });
        output += res.text.trim();
      }
    */



    let res
    const chain = new LLMChain({ llm: model, prompt: prompt });

    // console.log('Calling reviewer:', persona)
    res = await chain.call({
      instructions,
      persona,
      journal: input?.journal || "Nature",
      textInput: text
    });
    console.log('Output:', res?.text);

    // only true for json responses
    try {
      return JSON.parse(res?.text);
    } catch(e) {
      // return the text if not json
      return res?.text || 'Not available'
    }
  } catch (err) {
    // _err(err)
    console.error('[llm/reviewer]', err.message || err?.response?.data)
    // throw error(500, err.message)
  }
}
