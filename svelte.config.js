import adapter from '@sveltejs/adapter-auto'
// import adapter_static from '@sveltejs/adapter-static'
import adapter_vercel from '@sveltejs/adapter-vercel'
import adapter_node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

// import { mdsvex } from 'mdsvex'
// import remarkAttr from 'remark-attr'
// import rehypeSlug from 'rehype-slug'
// import autoprefixer from 'autoprefixer'

// import { plugin as markdown, Mode } from "vite-plugin-markdown";
// import preprocessMarkdoc from 'svelte-markdoc'
// import markdocConfig from './markdoc.config.js'


import { config as dotenvconf } from "dotenv"
dotenvconf() 

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md', '.mdoc', '.markdoc'], // adding .md here screws up vite meta glob import
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],


  // vercel; regular deployment
  kit: {
    // adapter: adapter_auto(),
    // adapter: adapter_vercel(),
    adapter: adapter_node(),

    // used for static, to generate a bunch of pages
    // adapter: adapter_static(),
    // prerender: {
    //   crawl: false,
    //   enabled: false,
    //   // pages: // generate an array of pages
    //   // entries: [
    //   //   // "/blog/slug/one-one",
    //   //   // "/blog/slug/two-two",
    //   //   "*"
    //   // ]
    // },

    // deprecated
    // methodOverride: {
    //   parameter: '_method',
    //   allowed: ['POST', 'DELETE', 'PATCH']
    // },

  },


  // ipfs, fleek; from Jolly Roger
  // kit: {
  //   adapter: adapter_ipfs({
  //     assets: './build',
  //     pages: './build',
  //     removeBuiltInServiceWorkerRegistration: true,
  //     injectPagesInServiceWorker: true,
  //     injectDebugConsole: true,
  //   }),
  //   target: '#svelte',
  //   trailingSlash: 'ignore',
  //   vite: {
  //     resolve: {
  //       alias: {
  //         // these are the aliases and paths to them
  //         '@lib': path.resolve('./src/lib'),
  //         // '$plasmid': path.resolve('./src/plasmid'), // local linked
  //         '$plasmid': path.resolve('./node_modules/plasmid'), // git linked
  //         '$modules': path.resolve('./node_modules'),
  //       }
  //     }
  //   }
  // },
};

export default config;

