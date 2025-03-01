import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  strictTokens: true,
  globalCss: {
    html: {
      background: "{colors.page}",
      colorPalette: "pink",
    }
  },
  theme: {
    tokens: {
      colors: {},
    },
    semanticTokens: {
      colors: {
        page: {
          value: {
            _light: '{colors.gray.50}',
            _dark: '{colors.gray.900}',
          }
        }
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);