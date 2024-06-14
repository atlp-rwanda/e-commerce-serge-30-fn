import type { StorybookConfig, FrameworkOptions } from "@storybook/react-vite";

interface CustomOptions extends FrameworkOptions {
  fastRefresh?: boolean;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      fastRefresh: true,
    } as CustomOptions, 
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
