import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import { name } from './package.json';
import html from '@rollup/plugin-html';

export default {
  plugins: [
    createVuePlugin(), 
    html({
      template: ({ attributes, files, meta, publicPath, title }) => {
        const makeHtmlAttributes = (attributes) => {
          if (!attributes) {
            return '';
          }
          const keys = Object.keys(attributes);
          return keys.reduce(
            (result, key) => (result += ` ${key}="${attributes[key]}"`),
            ''
          );
        };
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join('\n');

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join('\n');

        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join('\n');
        return `<!doctype html>
        <html${makeHtmlAttributes(attributes.html)}>
          <head>
            ${metas}
            <title>${name}</title>
            ${links}
          </head>
          <body>
            <div id="app"></div>
            ${scripts}
          </body>
        </html>`;
      },
    }),
  ],
  base: '/demo2/',
  build: {
    target: "esnext",
    lib: {
      name: `${name}-[name]`,
      entry: path.resolve(__dirname, "src/main.js"),
      formats: ["umd"],
    },
  },
}