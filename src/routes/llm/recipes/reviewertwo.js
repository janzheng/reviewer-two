
import { getOutput } from '../api/+server.js'




// add options to switch Reviewer 1, 2, 3, and other characters

// create function for characters that's injectable into the chatSettings


let defaultChatSettings = {
  system: "You're a decorated professor at the top of the field, reviewing research papers.",
  promptInstructions: "You are reviewing research papers and abstracts. If you don't know, say you don't know. Do not break out of character. Do not explain yourself. Answer as the following character: ",
  inputPrefix: "",
  exampleHistory: "",
  input: "",
  // model: "gpt-4",
}

export const output = async (persona, input) => {
  let chatSettings = { ...defaultChatSettings }

  // chatSettings.promptInstructions = `${defaultChatSettings.promptInstructions} ${persona}`
  chatSettings.promptInstructions = defaultChatSettings.promptInstructions + persona;

  if (persona.includes('Evaluator')) {
    // add some custom stuff here
    chatSettings.promptInstructions = `You're a consultant hired to improve the manuscript's chances to get accepted at the best journal. Review the manuscript based "SCOR" and give a rating between 1 (lowest) and 5 (highest) on the following metrics: Significance, Clarity, Originality, Rigor. Give an evaluation of what work needs to be done for the manuscript to be elevated to the next level of journal. Output format: 
    
    Significance: {score} - {200 character reason}
    Clarity: {score} - {200 character reason}
    Originality: {score} - {200 character reason}
    Rigor: {score} - {200 character reason}
    Journal Most Likely to accept: {journal name} - {600 character reason}
    Steps to take to get the paper to the next level of journal: {1200 character reason}`
  }


  // limit input to 4000 characters
  input = input.slice(0, 4000)
  
  chatSettings.input = input
  // console.log('wtf', chatSettings)
  let { output } = await getOutput({chatSettings, useHistory: false})
  return output
}