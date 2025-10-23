"use client";

import { MantineProvider } from '@mantine/core';

export default function MantineProviderWrapper({ children }) {
  return (
    <MantineProvider 
      withNormalizeCSS 
      withGlobalStyles
      theme={{
        // TODO: Verify these colors from Figma
        colors: {
          // Purple theme for "Create Jobs" button
          brand: [
            '#F3E8FF',
            '#E9D5FF',
            '#D8B4FE',
            '#C084FC',
            '#A855F7',
            '#9333EA',  // Main purple
            '#7C3AED',
            '#6D28D9',
            '#5B21B6',
            '#4C1D95',
          ],
          // Blue theme for "Apply Now" and other buttons
          cyan: [
            '#ECFEFF',
            '#CFFAFE',
            '#A5F3FC',
            '#67E8F9',
            '#22D3EE',
            '#06B6D4',
            '#0891B2',
            '#0E7490',
            '#155E75',
            '#164E63',
          ],
        },
        primaryColor: 'brand',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // Component default styles
        components: {
          Button: {
            defaultProps: {
              radius: 'md',
            },
          },
          Card: {
            defaultProps: {
              radius: 'md',
              shadow: 'sm',
            },
          },
          Modal: {
            defaultProps: {
              radius: 'md',
              overlayProps: {
                opacity: 0.55,
                blur: 3,
              },
            },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
}