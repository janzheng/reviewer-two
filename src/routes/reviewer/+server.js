
// branched from https://github.com/baobabKoodaa/future/blob/master/server.js 
// https://hwchase17.github.io/langchainjs/docs/modules/prompts/example_selectors
// https://github.com/Conner1115/LangChain.js-LLM-Template/tree/main/lib




import { json } from '@sveltejs/kit';
import { _POST } from "$plasmid/modules/llm/recipes/reviewer.js"
// import { getReview } from "./reviewer.js"


export const POST = _POST