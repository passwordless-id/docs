import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.passwordless.id',
  integrations: [starlight({
    title: 'Passwordless.ID Docs',
    customCss: ['./src/styles/theme.css'],
    logo: {
      src: './src/assets/logo/logo-text.svg',
      replacesTitle: true
    },
    social: {
      github: 'https://github.com/passwordless-id'
    },
    sidebar: [
      {
        label: 'Basics',
        autogenerate: {
          directory: 'basics'
        }
      },{
        label: 'Getting started',
        autogenerate: {
          directory: 'getting_started'
        }
      }, {
        label: 'Reference',
        autogenerate: {
          directory: 'reference'
        }
    }]
  }), vue()]
});