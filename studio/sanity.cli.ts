import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2ousxa3t',
    dataset: 'production'
  },
  deployment: {
    /** Studio publicado em https://tondato.sanity.studio */
    appId: 'wiaomohydvorwx1yq9tu24vy',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  },
})
