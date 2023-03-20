// vite.config.js
import path from "path";
import { sveltekit } from "file:///Users/janzheng/Desktop/projects/reviewer-two/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { config as dotenvconf } from "file:///Users/janzheng/Desktop/projects/reviewer-two/node_modules/dotenv/lib/main.js";
dotenvconf();
console.log("Use Local?:", process.env.PUBLIC_LOCAL);
var config = {
  plugins: [
    // markdown(),
    // markdown({ mode: Mode.HTML }),
    sveltekit({
      extensions: [".svelte"]
    })
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: "@use \"src/app.scss\" as *;"
  //     }
  //   }
  // },
  resolve: {
    alias: {
      // these are the aliases and paths to them
      $routes: path.resolve("./src/routes"),
      $instill: path.resolve("./src/routes/instill"),
      "$plasmid": process.env.PUBLIC_LOCAL == "local" ? path.resolve("./src/plasmid") : path.resolve("./node_modules/plasmid"),
      // dynamic linked
      "$instill-helpers": process.env.PUBLIC_LOCAL == "local" ? path.resolve("./src/plasmid/modules/instill-helpers") : path.resolve("./node_modules/plasmid/modules/instill-helpers"),
      // dynamic linked
      // '$plasmid': path.resolve('./src/plasmid'), // local linked
      // $plasmid: path.resolve('./node_modules/plasmid'), // git linked
      $modules: path.resolve("./node_modules")
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFuemhlbmcvRGVza3RvcC9wcm9qZWN0cy9yZXZpZXdlci10d29cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYW56aGVuZy9EZXNrdG9wL3Byb2plY3RzL3Jldmlld2VyLXR3by92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamFuemhlbmcvRGVza3RvcC9wcm9qZWN0cy9yZXZpZXdlci10d28vdml0ZS5jb25maWcuanNcIjtcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tIFwiQHN2ZWx0ZWpzL2tpdC92aXRlXCI7XG4vLyBpbXBvcnQgeyBwbHVnaW4gYXMgbWFya2Rvd24sIE1vZGUgfSBmcm9tIFwidml0ZS1wbHVnaW4tbWFya2Rvd25cIjtcblxuaW1wb3J0IHsgY29uZmlnIGFzIGRvdGVudmNvbmYgfSBmcm9tIFwiZG90ZW52XCJcbmRvdGVudmNvbmYoKVxuXG5jb25zb2xlLmxvZygnVXNlIExvY2FsPzonLCBwcm9jZXNzLmVudi5QVUJMSUNfTE9DQUwpXG5cbi8qKiBAdHlwZSB7aW1wb3J0KFwidml0ZVwiKS5Vc2VyQ29uZmlnfSAqL1xuY29uc3QgY29uZmlnID0ge1xuICBwbHVnaW5zOiBbXG4gICAgLy8gbWFya2Rvd24oKSxcbiAgICAvLyBtYXJrZG93bih7IG1vZGU6IE1vZGUuSFRNTCB9KSxcbiAgICBzdmVsdGVraXQoe1xuICAgICAgZXh0ZW5zaW9uczogWycuc3ZlbHRlJ10sXG4gICAgfSksXG4gIF0sXG4gIC8vIGNzczoge1xuICAvLyAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgLy8gICAgIHNjc3M6IHtcbiAgLy8gICAgICAgYWRkaXRpb25hbERhdGE6IFwiQHVzZSBcXFwic3JjL2FwcC5zY3NzXFxcIiBhcyAqO1wiXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIHRoZXNlIGFyZSB0aGUgYWxpYXNlcyBhbmQgcGF0aHMgdG8gdGhlbVxuICAgICAgJHJvdXRlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9yb3V0ZXMnKSxcbiAgICAgICRpbnN0aWxsOiBwYXRoLnJlc29sdmUoJy4vc3JjL3JvdXRlcy9pbnN0aWxsJyksXG4gICAgICAnJHBsYXNtaWQnOiBwcm9jZXNzLmVudi5QVUJMSUNfTE9DQUwgPT0gJ2xvY2FsJyA/IHBhdGgucmVzb2x2ZSgnLi9zcmMvcGxhc21pZCcpIDogcGF0aC5yZXNvbHZlKCcuL25vZGVfbW9kdWxlcy9wbGFzbWlkJyksIC8vIGR5bmFtaWMgbGlua2VkXG4gICAgICAnJGluc3RpbGwtaGVscGVycyc6IHByb2Nlc3MuZW52LlBVQkxJQ19MT0NBTCA9PSAnbG9jYWwnID8gcGF0aC5yZXNvbHZlKCcuL3NyYy9wbGFzbWlkL21vZHVsZXMvaW5zdGlsbC1oZWxwZXJzJykgOiBwYXRoLnJlc29sdmUoJy4vbm9kZV9tb2R1bGVzL3BsYXNtaWQvbW9kdWxlcy9pbnN0aWxsLWhlbHBlcnMnKSwgLy8gZHluYW1pYyBsaW5rZWRcbiAgICAgIC8vICckcGxhc21pZCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMvcGxhc21pZCcpLCAvLyBsb2NhbCBsaW5rZWRcbiAgICAgIC8vICRwbGFzbWlkOiBwYXRoLnJlc29sdmUoJy4vbm9kZV9tb2R1bGVzL3BsYXNtaWQnKSwgLy8gZ2l0IGxpbmtlZFxuICAgICAgJG1vZHVsZXM6IHBhdGgucmVzb2x2ZSgnLi9ub2RlX21vZHVsZXMnKSxcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsaUJBQWlCO0FBRzFCLFNBQVMsVUFBVSxrQkFBa0I7QUFDckMsV0FBVztBQUVYLFFBQVEsSUFBSSxlQUFlLFFBQVEsSUFBSSxZQUFZO0FBR25ELElBQU0sU0FBUztBQUFBLEVBQ2IsU0FBUztBQUFBO0FBQUE7QUFBQSxJQUdQLFVBQVU7QUFBQSxNQUNSLFlBQVksQ0FBQyxTQUFTO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxTQUFTLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDcEMsVUFBVSxLQUFLLFFBQVEsc0JBQXNCO0FBQUEsTUFDN0MsWUFBWSxRQUFRLElBQUksZ0JBQWdCLFVBQVUsS0FBSyxRQUFRLGVBQWUsSUFBSSxLQUFLLFFBQVEsd0JBQXdCO0FBQUE7QUFBQSxNQUN2SCxvQkFBb0IsUUFBUSxJQUFJLGdCQUFnQixVQUFVLEtBQUssUUFBUSx1Q0FBdUMsSUFBSSxLQUFLLFFBQVEsZ0RBQWdEO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFHL0ssVUFBVSxLQUFLLFFBQVEsZ0JBQWdCO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
