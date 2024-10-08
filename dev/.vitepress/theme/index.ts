import { theme, useOpenapi, useTheme } from 'vitepress-openapi'
import DefaultTheme from 'vitepress/theme'
import spec from '../../../docs/public/openapi.json' assert {type: 'json'}

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Set the OpenAPI specification.
    const openapi = useOpenapi()
    openapi.setSpec(spec)

    // Configure the theme.
    const themeConfig = useTheme()
    themeConfig.setLocale('es')

    // Use the theme.
    theme.enhanceApp({ app })
  },
}
