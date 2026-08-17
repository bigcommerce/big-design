import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // pnpm can otherwise resolve big-design source against a second copy of
    // these packages, breaking React context and the styled-components theme.
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
});
