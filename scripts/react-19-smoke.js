const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const tmpRoot = path.join(os.tmpdir(), 'big-design-react-19-smoke');
const tarballDir = path.join(tmpRoot, 'tarballs');
const packageNames = [
  '@bigcommerce/big-design-theme',
  '@bigcommerce/big-design-icons',
  '@bigcommerce/big-design',
  '@bigcommerce/big-design-patterns',
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    env: { ...process.env, ...options.env },
    stdio: options.stdio || 'inherit',
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with status ${result.status}`);
  }

  return result;
}

function writeFile(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

function buildWorkspacePackages() {
  for (const packageName of packageNames) {
    run('pnpm', ['--filter', packageName, 'run', 'build']);
  }
}

function packWorkspacePackages() {
  fs.rmSync(tarballDir, { recursive: true, force: true });
  fs.mkdirSync(tarballDir, { recursive: true });

  for (const packageName of packageNames) {
    run('pnpm', ['--filter', packageName, 'pack', '--pack-destination', tarballDir]);
  }

  const tarballs = fs.readdirSync(tarballDir).filter((file) => file.endsWith('.tgz'));

  return {
    '@bigcommerce/big-design-theme': findTarball(tarballs, 'bigcommerce-big-design-theme'),
    '@bigcommerce/big-design-icons': findTarball(tarballs, 'bigcommerce-big-design-icons'),
    '@bigcommerce/big-design': findTarball(
      tarballs,
      'bigcommerce-big-design',
      /^bigcommerce-big-design-\d/,
    ),
    '@bigcommerce/big-design-patterns': findTarball(
      tarballs,
      'bigcommerce-big-design-patterns',
    ),
  };
}

function findTarball(tarballs, prefix, pattern) {
  const tarball = tarballs.find((file) => (pattern ? pattern.test(file) : file.startsWith(prefix)));

  if (!tarball) {
    throw new Error(`Could not find packed tarball with prefix ${prefix}`);
  }

  return `file:${path.join(tarballDir, tarball)}`;
}

function install(appDir) {
  run('pnpm', ['install', '--strict-peer-dependencies=false'], { cwd: appDir });
}

function createPackageJson(appDir, name, tarballs, scripts) {
  writeFile(
    path.join(appDir, 'package.json'),
    `${JSON.stringify(
      {
        name,
        private: true,
        type: 'module',
        pnpm: {
          overrides: {
            '@bigcommerce/big-design': tarballs['@bigcommerce/big-design'],
            '@bigcommerce/big-design-icons': tarballs['@bigcommerce/big-design-icons'],
            '@bigcommerce/big-design-patterns': tarballs['@bigcommerce/big-design-patterns'],
            '@bigcommerce/big-design-theme': tarballs['@bigcommerce/big-design-theme'],
          },
        },
        scripts,
        dependencies: {
          '@types/node': '^20.17.6',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          '@types/styled-components': '^5.1.34',
          '@bigcommerce/big-design': tarballs['@bigcommerce/big-design'],
          '@bigcommerce/big-design-icons': tarballs['@bigcommerce/big-design-icons'],
          '@bigcommerce/big-design-patterns': tarballs['@bigcommerce/big-design-patterns'],
          '@bigcommerce/big-design-theme': tarballs['@bigcommerce/big-design-theme'],
          '@vitejs/plugin-react': '^5.1.1',
          next: '^15.5.0',
          playwright: '^1.57.0',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'styled-components': '^5.3.11',
          typescript: '^5.9.3',
          vite: '^7.2.0',
        },
        devDependencies: {},
      },
      null,
      2,
    )}\n`,
  );
}

function createViteApp(appDir, tarballs) {
  createPackageJson(appDir, 'big-design-react-19-vite-smoke', tarballs, {
    build: 'vite build',
    start: 'vite --host 127.0.0.1',
  });

  writeFile(
    path.join(appDir, 'index.html'),
    '<!doctype html><html><head><title>BigDesign React 19 Vite Smoke</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
  );

  writeFile(
    path.join(appDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          jsx: 'react-jsx',
          lib: ['DOM', 'ES2022'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          noEmit: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['src'],
      },
      null,
      2,
    ),
  );

  writeFile(
    path.join(appDir, 'src', 'main.tsx'),
    `import React from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, Badge, Button, GlobalStyles } from '@bigcommerce/big-design';
import { ActionBar, Header, Page as PatternPage } from '@bigcommerce/big-design-patterns';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={{ colors: { secondary60: 'rgb(1, 2, 3)' } } as any}>
      <GlobalStyles />
      <PatternPage
        actionBar={<ActionBar actions={[{ text: 'Commit changes', variant: 'primary' }]} />}
        header={<Header title="Orders" actions={[{ text: 'Create order', variant: 'primary' }]} />}
        message={{ messages: [{ text: 'Pattern message' }] }}
      >
        <Button>Primary action</Button>
        <Badge data-testid="badge" label="Ready" />
        <Alert messages={[{ text: 'Core alert' }]} />
      </PatternPage>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
`,
  );
}

function createNextApp(appDir, tarballs) {
  createPackageJson(appDir, 'big-design-react-19-next-smoke', tarballs, {
    build: 'next build',
    start: 'next start -H 127.0.0.1',
  });

  writeFile(
    path.join(appDir, 'next.config.js'),
    `const nextConfig = { compiler: { styledComponents: true } };
export default nextConfig;
`,
  );

  writeFile(
    path.join(appDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          allowJs: true,
          esModuleInterop: true,
          incremental: true,
          isolatedModules: true,
          jsx: 'preserve',
          lib: ['DOM', 'ES2022'],
          module: 'ESNext',
          moduleResolution: 'Bundler',
          noEmit: true,
          plugins: [{ name: 'next' }],
          resolveJsonModule: true,
          strict: true,
          target: 'ES2022',
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ),
  );

  writeFile(
    path.join(appDir, 'app', 'layout.tsx'),
    `import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  );

  writeFile(
    path.join(appDir, 'app', 'SmokeClient.tsx'),
    `'use client';

import React from 'react';
import { Alert, Badge, Button, GlobalStyles } from '@bigcommerce/big-design';
import { ActionBar, Header, Page as PatternPage } from '@bigcommerce/big-design-patterns';
import { ThemeProvider } from 'styled-components';

export function SmokeClient() {
  return (
    <ThemeProvider theme={{ colors: { secondary60: 'rgb(1, 2, 3)' } } as any}>
      <GlobalStyles />
      <PatternPage
        actionBar={<ActionBar actions={[{ text: 'Commit changes', variant: 'primary' }]} />}
        header={<Header title="Orders" actions={[{ text: 'Create order', variant: 'primary' }]} />}
        message={{ messages: [{ text: 'Pattern message' }] }}
      >
        <Button>Primary action</Button>
        <Badge data-testid="badge" label="Ready" />
        <Alert messages={[{ text: 'Core alert' }]} />
      </PatternPage>
    </ThemeProvider>
  );
}
`,
  );

  writeFile(
    path.join(appDir, 'app', 'page.tsx'),
    `import { SmokeClient } from './SmokeClient';

export default function Page() {
  return <SmokeClient />;
}
`,
  );
}

function waitForUrl(url, timeoutMs = 30000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const poll = () => {
      const request = http.get(url, (response) => {
        response.resume();
        resolve();
      });

      request.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}`));
        } else {
          setTimeout(poll, 500);
        }
      });
    };

    poll();
  });
}

async function verifyBrowserPage(appDir, startArgs, url) {
  const server = spawn('pnpm', startArgs, {
    cwd: appDir,
    env: process.env,
    stdio: ['ignore', 'inherit', 'inherit'],
  });

  try {
    await waitForUrl(url);

    const verifyScript = path.join(appDir, 'verify.mjs');

    writeFile(
      verifyScript,
      `import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const messages = [];

page.on('console', (message) => {
  if (message.type() === 'warning' || message.type() === 'error') {
    messages.push(message.type() + ': ' + message.text());
  }
});

await page.goto(${JSON.stringify(url)}, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Primary action' }).waitFor();
await page.getByRole('button', { name: 'Create order' }).waitFor();
await page.getByRole('button', { name: 'Commit changes' }).waitFor();
await page.getByRole('heading', { name: 'Orders' }).waitFor();
await page.getByRole('alert').filter({ hasText: 'Core alert' }).waitFor();
await page.getByText('Pattern message').waitFor();
await page.getByTestId('badge').waitFor();

const badgeColor = await page.getByTestId('badge').evaluate((element) => getComputedStyle(element).backgroundColor);

if (badgeColor !== 'rgb(1, 2, 3)') {
  throw new Error('Expected partial theme badge color to be rgb(1, 2, 3), got ' + badgeColor);
}

if (messages.length > 0) {
  throw new Error('Unexpected browser console messages:\\n' + messages.join('\\n'));
}

await browser.close();
`,
    );

    run('pnpm', ['exec', 'node', verifyScript], { cwd: appDir });
  } finally {
    server.kill('SIGTERM');
  }
}

async function main() {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  fs.mkdirSync(tmpRoot, { recursive: true });

  buildWorkspacePackages();

  const tarballs = packWorkspacePackages();
  const viteDir = path.join(tmpRoot, 'vite');
  const nextDir = path.join(tmpRoot, 'next');

  createViteApp(viteDir, tarballs);
  createNextApp(nextDir, tarballs);

  install(viteDir);
  install(nextDir);

  run('pnpm', ['exec', 'playwright', 'install', 'chromium'], { cwd: viteDir });

  run('pnpm', ['run', 'build'], { cwd: viteDir });
  await verifyBrowserPage(viteDir, ['exec', 'vite', '--host', '127.0.0.1', '--port', '4173'], 'http://127.0.0.1:4173');

  run('pnpm', ['run', 'build'], { cwd: nextDir });
  await verifyBrowserPage(nextDir, ['exec', 'next', 'start', '-H', '127.0.0.1', '-p', '4174'], 'http://127.0.0.1:4174');

  console.log('React 19 smoke harness passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
