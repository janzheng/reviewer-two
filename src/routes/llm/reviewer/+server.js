
// branched from https://github.com/baobabKoodaa/future/blob/master/server.js 
// https://hwchase17.github.io/langchainjs/docs/modules/prompts/example_selectors
// https://github.com/Conner1115/LangChain.js-LLM-Template/tree/main/lib




import { json } from '@sveltejs/kit';
import { getReview } from "../recipes/reviewer.js"


export async function POST({ request }) {
  try {
    let {
      persona,
      text
    } = await request.json()

    let res = await getReview({ persona, text })

    return json({
      result: res,
      persona,
      text
    })
  } catch (err) {
    // _err(err)
    console.error('[llm/chainapi]', err.message || err?.response?.data)
    // throw error(500, err.message)
  }
}
