import { error } from '@sveltejs/kit'
import { cachedjson, errorjson } from '$plasmid/utils/sveltekit-helpers'

export const load = async ({locals}) => {
  try {
    // console.log('[+layout.server.js] event locals', locals?.user)

    return {
      user: locals?.user
    }
  }
  catch (err) {
    throw errorjson(500, err)
  }
}
