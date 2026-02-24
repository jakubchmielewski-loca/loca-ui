import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  // Bundle Mantine so the app only needs @grupa-loca/loca-ui (single React context, no peer install).
  noExternal: [
    '@mantine/core',
    '@mantine/hooks',
    '@mantine/modals',
    '@mantine/notifications',
  ],
})
