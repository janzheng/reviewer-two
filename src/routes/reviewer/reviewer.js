
// // branched from https://github.com/baobabKoodaa/future/blob/master/server.js 
// // https://hwchase17.github.io/langchainjs/docs/modules/prompts/example_selectors
// // https://github.com/Conner1115/LangChain.js-LLM-Template/tree/main/lib

// // add pdf-parse?

// import { OpenAI, ChatOpenAI } from "langchain/llms";
// import { PromptTemplate } from "langchain/prompts";
// import { LLMChain } from "langchain/chains";
// import { Document } from "langchain/document";
// import { CharacterTextSplitter } from "langchain/text_splitter";



// // TODO
// // add pdf-parse?
// // add recursivetext

// export async function getReview(input) {
//   try {
//     // let {
//     //   system, promptInstructions, inputPrefix, exampleHistory, input,
//     //   model, max_tokens = 256, temperature = 0.7
//     // } = await request.json()

//     const system = "You're a decorated professor at the top of the field, reviewing research papers.";
//     const template = "{instructions} {persona} {textInput}";

//     // variables
//     const instructions = "If you don't know, admit you don't know. Do not break out of character and don't explain yourself. Answer as the following character: {persona}"

//     let persona = input?.persona

//     // testing only
//     // input.persona = 'SCOR'
//     // const persona = "Reviewer 2: Harsh critic who always finds something wrong with your paper"
//     if(input?.persona.includes('SCOR')) {
//       persona = `Review the manuscript by filling in the following template, in JSON format. Score from 1 (lowest) to 5 (highest):
//       Please format the output in JSON proper JSON formatting. Make sure to end with a "}": 
//       {
//         "scor": {
//           "significance": {
//             "score":"(score)",
//             "explanation":(text)"
//           },
//           "clarity": {
//             "score":"(score)",
//             "explanation":(text)"
//           },
//           "originality": {
//             "score":"(score)",
//             "explanation":(text)"
//           },
//           "rigor": {
//             "score":"(score)",
//             "explanation":(text)"
//           },
//         },
//         "nextlevel": "(Explain areas to improve of the manuscript, and ways to take it to the next level)"
//       }`;

//       // too slow
//       // persona = `Senior PI: Your job is to improve the manuscript's chances to get accepted at the best journal possible. Review the manuscript by filling in the following template, in JSON format:

//       // Break first person responses. Please format the output in JSON format, as follows: 
//       // {
//       //   "scor": {
//       //     "significance": {
//       //       "score":"(score from 1 (lowest) to 5)",
//       //       "explanation":(200 character reasoning)"
//       //     },
//       //     "clarity": {
//       //       "score":"(score from 1 (lowest) to 5)",
//       //       "explanation":(200 character reasoning)"
//       //     },
//       //     "originality": {
//       //       "score":"(score from 1 (lowest) to 5)",
//       //       "explanation":(200 character reasoning)"
//       //     },
//       //     "rigor": {
//       //       "score":"(score from 1 (lowest) to 5)",
//       //       "explanation":(200 character reasoning)"
//       //     },
//       //   },
//       //   "strengths": "(Explain strengths of the manuscript)",
//       //   "weaknesses": "(Explain areas to improve of the manuscript)",
//       //   "future": "(Steps to take to get the paper to the next level of journal; 1200 character reason)"
//       // }
//       // `;

//     }
//     const text = input?.text;

//     // const model = new OpenAIChat({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

//     const model = new OpenAI({
//       modelName: "gpt-3.5-turbo",
//       // modelName: "gpt-4",
//       openAIApiKey: process.env.OPENAI_API_KEY,
//       temperature: 0.7
//     });

//     const prompt = new PromptTemplate({
//       system: system,
//       template: template,
//       inputVariables: ["instructions", "persona", "journal", "textInput"],
//     });



//     // const splitter = new CharacterTextSplitter({
//     //   separator: " ",
//     //   chunkSize: 100,
//     //   chunkOverlap: 50,
//     // });
//     // const documents = await splitter.splitDocuments([new Document({ pageContent: text })]);

//     // console.log('documents:', documents)
//     // need to process each document separately with chain.call, which gets expensive!
//     // then you can use LLMChain to stitch them together
//     // then summarize the final
//     /*
    
//       const chunks = splitter.createDocuments([text]);

//       let output = "";

//       for (const chunk of chunks) {
//         const res = await chain.call({ inputText: chunk.pageContent });
//         output += res.text.trim();
//       }
//     */



//     let res = { text: 'LLM Bypassed for testing'}
//     const chain = new LLMChain({ llm: model, prompt: prompt });

//     // console.log('Calling reviewer:', persona)
//     console.log('>>>> Getting answer from OpenAI...')
//     console.time();
//     res = await chain.call({
//       instructions,
//       persona,
//       textInput: text
//     });
//     console.timeEnd();
//     console.log('---------->>>>>\n\nOutput:', res?.text,'\n\n<<<------------');

//     // only true for json responses
//     try {
//       return JSON.parse(res?.text);
//     } catch(e) {
//       // return the text if not json
//       console.log('!!!! failed JSON parsing ------<<<<')
//       return res?.text || 'Not available'
//     }
//   } catch (err) {
//     // _err(err)
//     console.error('[llm/reviewer]', err.message || err?.response?.data)
//     // throw error(500, err.message)
//   }
// }
