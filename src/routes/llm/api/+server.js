
// branched from https://github.com/baobabKoodaa/future/blob/master/server.js 


// TODO
/* 

  TODO

  - implement various prompt / message formats, with examples
    - Q&A from baobabKoodaa/future
    - ReAct (Observation / Thought / Action) loop

  - inject actions from API / scraper / database on Action stage


*/


// add pdf-parse

import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";

// import PROMPT_QA_EXAMPLES from "./prompt-qa-examples.js";
// const PROMPT_INSTRUCTIONS = fs.readFileSync('prompt-instructions.txt', 'utf8');

const configuration = new Configuration({
    // organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


// getPrompt() Constructs the chat GPT prompt
// for ChatCompletion, sets system, user + optional prompt instructions, prefixes and examples,, and assistant messages
// then backfills uers / assistant messages from session history
// systemContent: instructions for who the system is; e.g. what character it's playing
// promptInstructions: longer prompt instructions, examples, keywords + terms; all examples + terms should go in here, including new information or summaries of previous information
// inputPrefix: prefix for user input; used for every user input; e.g. "Do not repeat stuff from previous answers"
// exampleHistory: EXAMPLE array of objects with u (user) and a (assistant) properties
// sessionHistory: array of objects with u (user) and a (assistant) properties
export const getChatMessages = ({ system = "You are a helpful assistant", promptInstructions='', inputPrefix='', exampleHistory=[], sessionHistory=[], input}) => {
  let messages = []

  // system message
  messages.push({
    role: "system",
    content: system
  })


  if (promptInstructions) {
    messages.push({
      role: "user",
      content: promptInstructions
    })
  }
  
  let history = [...exampleHistory, ...sessionHistory]
  if (history && history.length > 0) {
    for (const [i, row] of history.entries()) {
      messages.push({
        role: "user",
        content: inputPrefix + row?.u
      })
      messages.push({
        role: "assistant",
        content: inputPrefix + row?.a
      })
    }
  }

  messages.push({
    role: "user",
    content: inputPrefix + input
  })

  return messages
}


export const llm = async ({messages, model = "gpt-3.5-turbo", max_tokens=256, temperature=0.4}) => {
    
  try {
    const response = await openai.createChatCompletion({
        model,
        messages: messages,
        max_tokens,
        temperature,
    });
    return response.data.choices[0].message.content.replaceAll("\n", " ").trim()
  } catch (error) {
      // const errorMessage = error.response ? (error.response.status + error.response.data) : error.message
      // const requestWasMalformed = error.response?.status == "400"

      // // // Set server status as red for some time
      // // const timeoutSeconds = 10*61000 // errorMessage.match(/.*(R|r)ate ?limit.*/) ? 61000 : 3600000
      // // if (serverStatusGreen && !requestWasMalformed) {
      // //     serverStatusGreen = false
      // //     setTimeout(() => {
      // //         serverStatusGreen = true
      // //     }, timeoutSeconds)
      // // }

      console.log('[error] llm:', error)
      // throw error
  }
}


// pushSessionHistory()
// export const pushSessionHistory = (sessionHistory, input, output) => {
//   sessionHistory.push({
//     u: input,
//     a: output
//   })
//   return sessionHistory
// }

// resetSessionHistory()
// export const resetSessionHistory = (sessionHistory) => {
//   sessionHistory = []
//   return sessionHistory
// }



let sessionHistory = []

export async function getOutput({chatSettings, sessionHistory, useHistory=true}) {
  try {
    let {
      system, promptInstructions, inputPrefix, exampleHistory, input,
      model, max_tokens = 256, temperature
    } = chatSettings

    let messages = getChatMessages({ system, promptInstructions, inputPrefix, exampleHistory, sessionHistory, input })

    if (useHistory && !sessionHistory) {
      sessionHistory = messages
    }

    console.log('[getOutput] messages', chatSettings)
    // let output = `fake output here for tesing;`
    let output = await llm({ messages, model, max_tokens, temperature })

    if (useHistory) {
      sessionHistory.push({
        u: input,
        a: output
      })
    }

    return {
      sessionHistory,
      output,
      // summary: {
      //   summaryMsg,
      //   summary
      // }
    }
  } catch (err) {
    // _err(err)
    console.error('[api/llm]', err.message || err?.response?.data)
    // throw error(500, err.message)
  }
}



export async function POST({ request }) {
  try {
    // let {
    //   system, promptInstructions, inputPrefix, exampleHistory, sessionHistory, input,
    //   model, max_tokens = 256, temperature
    // } = await request.json()
    let {
      system, promptInstructions, inputPrefix, exampleHistory, input,
      model, max_tokens = 256, temperature = 0.7
    } = await request.json()

    let messages = getChatMessages({ system, promptInstructions, inputPrefix, exampleHistory, sessionHistory, input })

    if (!sessionHistory) {
      sessionHistory = messages
    }

    // let output = 'woo'
    let output = await llm({ messages, model, max_tokens, temperature })

    sessionHistory.push({
      u: input,
      a: output
    })

    // let summaryMsg = getChatMessages({ system, sessionHistory, input: "get the summary of the conversation in one line" })
    // let summary = await llm({ messages: summaryMsg, model, max_tokens, temperature })

    // console.log('[POST] Received request: >> messages', messages, '>>> output >>>', output, ' >> history:len:', sessionHistory.length)

    return json({
      sessionHistory,
      output,
      // summary: {
      //   summaryMsg,
      //   summary
      // }
    })
  } catch (err) {
    // _err(err)
    console.error('[api/llm]', err.message || err?.response?.data)
    // throw error(500, err.message)
  }
}
