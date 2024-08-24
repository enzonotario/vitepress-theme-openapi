import { defineConfigWithTheme } from 'vitepress'
import { useSidebar } from 'vitepress-theme-openapi'
import spec from '../public/openapi.json' assert { type: 'json' }

const sidebar = useSidebar({ spec })

export default defineConfigWithTheme({
  title: 'VitePress Theme OpenAPI',
  description: 'A VitePress theme for OpenAPI',
  themeConfig: {
    nav: [],

    sidebar: [
      {
        text: 'Getting Started',
        link: '/guide/getting-started',
      },
      {
        text: 'Example',
        items: [
          ...sidebar.generateSidebarGroups().map((group) => ({
            ...group,
            items: group.items.map((item) => ({
              ...item,
              link: `/example${item.link}`,
            })),
          })),
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzonotario/vitepress-theme-openapi' },
    ],

    outline: {
      level: [1, 3],
    },

    footer: {
      message: 'Released under the <a href="https://github.com/enzonotario/vitepress-theme-openapi/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://enzonotario.me">Enzo Notario</a>',
    },
  },
})
