import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {ptPTLocale} from '@sanity/locale-pt-pt'

export default defineConfig({
  name: 'default',
  title: 'ubuntu-analytica',

  projectId: 'dh053gvl',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), ptPTLocale({
      title: 'Portuguese',
    })],

  schema: {
    types: schemaTypes,
  },
})
