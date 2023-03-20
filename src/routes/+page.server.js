
import { output } from './llm/recipes/reviewertwo.js'
import { getReview } from './llm/recipes/reviewer.js'
import { error } from '@sveltejs/kit';

// export async function load({ params, url }) {
//   let { link, pageId } = Object.fromEntries(url.searchParams)
//   return { link, pageId };
//   throw error(404, 'Not found');
// }


export const actions = {
  default: async ({ request }) => {
    try {
      // TODO: collapse into JSON.parse(data.get) etc.
      const data = await request.formData();
      const text = data?.get('text');
      const persona = data?.get('persona');
      // const orgs = JSON.parse(data?.get('orgs')).orgs;
      // const collection = JSON.parse(data?.get('collection'));

      // const { success, error } = await validateToken(data.get('cf-turnstile-response'), env.TURNSTILE_API);

      // if (!success) {
      //   console.log('unsuccessful?', error)
      //   return {
      //     error: error || 'Invalid CAPTCHA',
      //   };
      // }

      // let _output = await output(persona, text);
      let _output = await getReview({persona, text});


      return {
        output: _output,
        persona, 
        text,
      }
    } catch (err) {
      // throw errorjson(500, err)
      console.log('[reviewertwo] error:', err?.message || err)
      return {
        error: err?.message || err,
      };
    }

  }
}

